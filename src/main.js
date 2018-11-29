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
      let url = "http://127.0.0.1:8000/search/?query=" + query;
      fetch(url, {
        method: "GET"
        // body: JSON.stringify(query),
        // headers: {
        //   "Content-Type": "application/json; charset=utf-8"
        // }
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
      <img class="lincoLogo" src="https://lincocare.ams3.digitaloceanspaces.com/Linco%20logo%202018@4x.png" />
      <form class="searchForm" v-on:submit.prevent="queryLincoProduct(query)">
          <input type="text" placeholder="Search for the product name or brand" v-model="query" />
          <button type="submit">SEARCH</button>
          
      </form>
      <div v-if="results">
        <div v-for="item in results">
        
            <h3>{{ item.brand }} - {{ item.name }} </h3>
            
            <div class="productsContainer" v-for="product in item.products">
                <h4>{{ product.option_name }}:{{ product.option_value }} -  Product code: {{ product.product_code }}</h4>
              <div class="imageResult" v-for="image in product.product_images"> 
                  
                  <div v-if="image.image_type === 'PI'">

                    <div v-if="image.image_format === 'JPEG'">

                      <a class="imageLink" v-bind:href="image.image_url" target="_blank">
                        <img v-bind:src="image.image_url" />
                        <p>JPEG - {{ image.image_angle }}</p>
                      </a>
                      
                    </div>

                    <div v-else-if="image.image_format === 'PNG' ">

                      <a class="imageLink" v-bind:href="image.image_url" target="_blank">
                        <img v-bind:src="image.image_url" />
                        <p>PNG - {{ image.image_angle }}</p>
                      </a>

                    </div>

                  </div>

                    <div v-else-if="image.image_type === 'LS'">
                          <a class="imageLink" v-bind:href="image.image_url" target="_blank">
                            <img v-bind:src="image.image_url" />
                            <p>{{ image.image_format }}</p>
                          </a>
                    </div>
              
              
              </div>
          
          </div>
        </div>
      </div>
      <p v-else>There is no connection to the server</p>
</div>
`
});
