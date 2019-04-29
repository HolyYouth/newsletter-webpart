<template>
  <div>
    <router-link
      v-if="$route.path !== '/template-list/log-time'"
      to="/template-list/log-time"
      class="btn btn-primary"
    >Create</router-link>

    <div v-if="$route.path === '/template-list/log-time'">
      <h3>New Template</h3>
    </div>

    <hr>

    <router-view></router-view>

    <div class="template-list">
      <p v-if="!this.templates.length">
        <strong>No Templates</strong>
      </p>

      <div class="list-group">
        <a class="list-group-item" v-for="(template,index) in this.templates">
          <div class="row">
            <router-link to="/template-edit">
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
              <button class="btn btn-xs btn-danger delete-button" @click="deleteTemplate(index)">X</button>
            </div>
          </div>
        </a>
      </div>
    </div>
  </div>
</template>
<script>
export default {
  name: "TemplateList",
  data(){return {templates:[]}},
  mounted: function(){
    this.$http.get('http://127.0.0.1:5000/getTemplateList/').then(function(res){
        this.templates = res.body;
      })
  },
  // computed: {
  //   templates() {    
  //     // return this.$http.get('http://127.0.0.1:5000/getTemplateList/').then(function(res){
  //     //   return res.body;
  //     // })
  //     return '';
  //   }
  // },
  methods: {
    deleteTemplate(idx) {
      // 减去总时间
      this.$store.dispatch("decTotalTime", this.templates[idx].totalTime);
      // 删除该计划
      this.$store.dispatch("deletePlan", idx);
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
