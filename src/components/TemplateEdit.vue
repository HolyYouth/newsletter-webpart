<template>
  <div>
    <div v-if="!this.template.header">
      <router-link
        v-if="$route.path !== '/template-edit/create-header'"
        :to="{path:'/template-edit/create-header',query:{templateId:this.templateId}}"
        class="btn btn-primary"
      >Create header</router-link>

      <div v-if="$route.path === '/template-edit/create-header'">
        <h3>Create header</h3>
        <router-view></router-view>
      </div>
      <hr>
    </div>
    <div v-else class="container">
      <router-link
        v-if="$route.path !== '/template-edit/create-header'"
        :to="{path:'/template-edit/create-header',query:{templateId:this.templateId}}"
      >
        <span v-bind:title="'click picture to edit header'">
          <img :src="this.template.header.imgSrc" width="80%">
        </span>
      </router-link>
      <div v-if="$route.path === '/template-edit/create-header'">
        <h3>Edit header</h3>
        <router-view></router-view>
      </div>
      <hr>
    </div>

    <div v-if="!this.template.topics">
      <router-link
        v-if="$route.path !== '/template-edit/add-topic'"
        :to="{path:'/template-edit/add-topic',query:{templateId:this.templateId}}"
        class="btn btn-primary"
      >Add Topic</router-link>

      <div v-if="$route.path === '/template-edit/add-topic'">
        <h3>Add Topic</h3>
        <router-view></router-view>
      </div>
      <hr>
    </div>
    <div v-else style="height:0.2">
      <div class="navbar-collapse collapse">
        <ul class="nav navbar-nav" v-for="(topic,index) in this.template.topics">
          <li style="12.5%">
            <a :href="'#'+topic.id+'.html'">
              <span>
              <img :src="topic.imgSrc" style="width:100px">
              </span>
              <p>{{topic.item}}</p>
            </a>
            
          </li>
        </ul>
        <router-link
          v-if="$route.path !== '/template-edit/add-topic'"
          :to="{path:'/template-edit/add-topic',query:{templateId:this.templateId}}"
          class="btn btn-primary"
        >Add Topic</router-link>
      </div>

      <div v-if="$route.path === '/template-edit/add-topic'">
        <h3>Add Topic</h3>
        <router-view></router-view>
      </div>
      <hr>
    </div>

    <div v-if="!this.template.headline">
      <router-link
        v-if="$route.path !== '/template-edit/edit-headline'"
        to="/template-edit/edit-headline"
        class="btn btn-primary"
      >Edit Headline</router-link>

      <div v-if="$route.path === '/template-edit/edit-headline'">
        <h3>Edit Headline</h3>
        <router-view></router-view>
      </div>
      <hr>
    </div>
    <div v-else></div>

    <!-- <div class="template-list">
      <p v-if="!templates.length">
        <strong>No Templates</strong>
      </p>

      <div class="list-group">
        <a class="list-group-item" v-for="(template,index) in templates">
          <div class="row">
            <router-link to="/template-edit">
              <div class="col-sm-2 user-details">
                <img :src="template.avatar" class="avatar img-circle img-responsive">
                <p class="text-center">
                  <strong>Editor:{{ template.name }}</strong>
                </p>
              </div>

              <div class="col-sm-2 text-center time-block">
                <h3 class="list-group-item-text total-time">
                  {{ template.templateName }}
                </h3>
                <p class="label label-primary text-center">
                  <i class="glyphicon glyphicon-calendar"></i>
                  Deadline {{ template.DDL }}
                </p>
              </div>

              <div class="col-sm-7 comment-section">
                <p></p>
              </div>
            </router-link>
            <div class="col-sm-1">
              <button class="btn btn-xs btn-danger delete-button" @click="deleteTemplate(index)">X</button>
            </div>
          </div>
        </a>
      </div>
    </div>-->
  </div>
</template>
<script>
import VueRouter from "vue-router";
import vm from "../event.js";
export default {
  // inject:["reload"],
  name: "TemplateEdit",
  // props:['templateId'],
  data() {
    // this.getTemplateById()

    return {
      templateId: this.$route.query.templateId,
      template: []
    };
  },
  // activated:function(){
  //   this.getTemplateById()
  //   // this.$root.reload()
  // },
  mounted() {
    // console.log($route.params.templateId)
    // this.templateId = this.$router.params.id;
    // this.receiveId();
    this.getTemplateById();
    // this.$root.reload()
  },
  watch: {
    templateId: "getTemplateById"
  },
  methods: {
    getTemplateById() {
      this.$http
        .post(
          "http://127.0.0.1:5000/getTemplateById/",
          { id: this.templateId },
          { emulateJSON: true }
        )
        .then(function(res) {
          this.template = res.body;
          // console.log(this.template);
        });
    }
    // receiveId() {
    //   vm.$on("templateId", id => {
    //     console.log(id);
    //     this.templateId = id;
    //     console.log(this.templateId);
    //   });
    // },
    // sendId(id){
    //   // console.log(this.templateId)
    //   vm.$emit("templateId", this.templateId);
    // }
  }
};
</script>
<style>
.avatar {
  height: 75px;
  margin: 0 auto;
  margin-top: 10px;
  margin-bottom: 10px;
}
.user-details {
  background-color: #f5f5f5;
  border-right: 1px solid #ddd;
  margin: -10px 0;
}
.time-block {
  padding: 10px;
}
.comment-section {
  padding: 20px;
}
.box ul {
list-style-type: none;
margin:0px;
padding:0px;
}
.box li {
margin:7px;
padding:5px;
float:left;
width:150px;
height:190px;
} 
</style>
