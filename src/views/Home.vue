<template>
  <div class="home">
    <h2>Hello</h2>
    <div v-if="urls.length > 0" class="row">
      <div v-for="(url,index) in urls" :key="index" class="col-md-4">
        <div class="thumbnail">
          <a :href="url">
            <img :src="url" alt="vue-trans-tag" style="width:100%" />
            <div class="caption">
              <p>Image from vue-trans</p>
            </div>
          </a>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import * as axios from "axios";

export default {
  name: "Home",
  data() {
    return {
      urls: []
    };
  },

  mounted() {
    const apiUrl = "http://localhost:5000/api/vue_trans_tag";

    axios
      .get(apiUrl)
      .then(response => {
        this.urls = response.data.collection.map(url => {
          let tokens = url.split("/");
          // insert 3rd from the last element
          tokens.splice(6,1, "w_350,h_350,c_scale,f_auto,q_auto");
          console.log(tokens.join('/'))
          return tokens.join("/");
        });
      })
      .catch(error => {
        // handle error
        console.log(error);
      });
  }
};
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
</style>
