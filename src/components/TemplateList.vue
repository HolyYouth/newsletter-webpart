<template>
  <div>
    <router-link
      v-if="$route.path !== '/template-list/create-template'"
      to="/template-list/create-template"
      class="btn btn-primary"
    >Create</router-link>

    <div v-if="$route.path === '/template-list/create-template'">
      <h3>New Template</h3>
    </div>

    <hr>

    <router-view></router-view>

    <div class="template-list">
      <p v-if="this.templates.length<=0">
        <strong>No Templates</strong>
      </p>

      <div class="list-group" >
        <a class="list-group-item" v-for="(template,index) in this.templates">
          <div class="row">
            <router-link :to="{path:'/template-edit',query:{templateId:template.id}}" @click.native="sendId(template.id)">
              <div class="col-sm-2 user-details">
                <img :src="template.avatar" class="avatar img-circle img-responsive">
                <p class="text-center">
                  <strong>Editor:{{ template.createdBy }}</strong>
                </p>
              </div>

              <div class="col-sm-9 text-left time-block">
                <h3 class="list-group-item-text total-time">
                  <!-- <i class="glyphicon glyphicon-time"></i> -->
                  <!-- {{ template.totalTime }} -->
                  {{ template.templateName }}
                </h3>
                <p class="label label-primary text-left">
                  <i class="glyphicon glyphicon-calendar"></i>
                  Deadline {{ template.DDL }}
                </p>
              </div>

              <!-- <div class="col-sm-1 comment-section">
                <p></p>
              </div> -->
            </router-link>
            <div class="col-sm-1">
              <button class="btn btn-xs btn-danger delete-button" @click="deleteTemplate(template.id)">X</button>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
import vm from "../event.js"
export default {
  name: "TemplateList",
  data(){
    this.getTemplateList()
    return {templates:[]}
  },
  // watch:{
  //   templates:function(){
  //     this.getTemplateList()
  //   }
  // },
  // mounted: function(){
    
  // },
  // computed: {
  //   templates() {  
  //     this.$http.get('http://127.0.0.1:5000/getTemplateList/').then(function(res){
  //       this.template = res.body.reverse();
  //     })
  //     return this.template;
  //   }
  // },
  methods: {
    getTemplateList(){
      this.$http.get('http://127.0.0.1:5000/getTemplateList/').then(function(res){
          this.templates = res.body.reverse();
      })
    },
    deleteTemplate(idx) {
      this.$http.post('http://127.0.0.1:5000/deleteTemplate/',{id:idx},{emulateJSON:true}).then(function(res){
        this.$router.go(0)
      })
    },
    sendId(id){
      var test=document.getElementsByTagName('html')[0].innerHTML; 
      console.log(test); 
      // console.log('temlist.sendId'+id)
      // vm.$emit("templateId", id);
    }
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
</style>
