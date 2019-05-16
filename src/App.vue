<template>
  <div id="wrapper">
    
      <nav class="navbar navbar-default">
        <div class="container">
          <a class="navbar-brand">
            <i class="glyphicon glyphicon-time"></i>
            Newsletter
          </a>
          <ul class="nav navbar-nav">
            <li>
              <router-link to="/home">Home</router-link>
            </li>
            <li>
              <router-link to="/template-list">Template List</router-link>
            </li>
          </ul>
        </div>
      </nav>
      <div class="container">
        <!-- <div class="col-sm-3">
        <sidebar></sidebar>
        </div>-->
        <div>
          <keep-alive>
          <router-view v-if="isRouterAlive"></router-view>
          </keep-alive>
        </div>
      </div>
  </div>
</template>

<script>
import Sidebar from "./components/Sidebar.vue";
export default {
  name: "app",
  data() {
    return {
      isRouterAlive: true
    };
  },
  methods: {
    reload() {
      this.isRouterAlive = false;
      this.$nextTick(function() {
        this.isRouterAlive = true;
      });
    }
  }
  // components: {
  //   Sidebar
  // }
};
</script>

