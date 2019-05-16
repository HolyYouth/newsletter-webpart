import Vue from 'vue'
import VueRouter from 'vue-router'
import store from './store'
import App from './App'
import Home from './components/Home'
import TemplateList from './components/TemplateList.vue'
import CreateTemplate from './components/CreateTemplate.vue'
import NotFound from './components/404'
import TemplateEdit from './components/TemplateEdit'
import CreateHeader from './components/CreateHeader'
import AddTopic from './components/AddTopic'
import EditHeadline from './components/EditHeadline'
import VueResource from 'vue-resource'
import 'bootstrap/dist/css/bootstrap.css'

Vue.use(VueRouter)
Vue.use(VueResource)

const routes = [{
  path : '/',
  component : Home
},{
  path : '/home',
  component : Home
},{
  path : '/template-list',
  component : TemplateList,
  children : [{
    path : 'create-template',
    component : CreateTemplate,
  }]
},{
  path : '/template-edit',
  name : 'template-edit',
  component : TemplateEdit,
  children : [{
    path : 'create-header',
    name : 'create-header',
    component : CreateHeader
  },{
    path : 'add-topic',
    component : AddTopic
  },{
    path : 'edit-headline',
    component : EditHeadline
  }]
},{
  path : '*',
  component : NotFound
}];

const router = new VueRouter({
  routes
});

/* eslint-disable no-new */
// 这灵活得亮瞎了
/*new Vue({
  el: '#app',
  template: '<App/>',
  router,
  components: { App }
});

 new Vue(Vue.util.extend({
   router
 }, App)).$mount('#app');

new Vue({
  el:'#app',
  router,
  render:h => h(App)
});*/
var app = new Vue({
  el: '#app',
  router,
  store,
  ...App,
});
