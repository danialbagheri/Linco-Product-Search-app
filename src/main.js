import Vue from "vue";
// const Vue = require("vue");

var app = new Vue({
  el: "#linco",
  data: {
    text: "",
    query: "",
    results: null
  },
  methods: {
    queryLincoProduct(query) {
      let self = this;
      fetch("http://127.0.0.1:8000/search/", {
        method: "POST",
        mode: "cors",
        body: JSON.stringify(query),
        headers: {
          "Content-Type": "application/json; charset=utf-8"
        }
      })
        .then(response => {
          return response.json();
        })
        .then(r => {
          self.results = r;
        });
    }
  },
  template: `
    <div>
    <h1>Linco Care</h1>
    <form v-on:submit.prevent="queryLincoProduct(query)">
        <input type="text" placeholder="Search for the product" v-model="query" />
        <button type="submit">SEARCH</button>
        
    </form>
    <div v-if="results">
    <ul v-for="item in results">
    <li >
        {{ item.brand }} - {{ item.name }} - 
        <span v-for="product in item.products">
         {{ product.option_name }}:{{ product.option_value }}-- {{ product.product_code }}
        </span>
    </li>
    </ul>
    </div>
    </div>
    `
});
