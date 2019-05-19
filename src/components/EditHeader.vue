<template>
  <div class="form-horizontal">
    <div class="form-group">
      <div>
        <label>Upload Header Image</label>
        <!-- <input
          type="text"
          class="form-control"
          v-model="templateName"
          placeholder="Template Name"
        />-->
        <input type="file" id="id" name="image" class="getImgUrl_file" @change="upload()">
        <div v-if="this.preview">
          <img :src="this.url" width="100%">
        </div>

        <!-- <input type="file" name="avatar" id="avatar" multiple="multiple" @change="upload"> -->
        <!-- <img :src=" "/> -->
      </div>
      <!-- <div class="col-sm-6">
        <label>Deadline</label>
        <input
          type="date"
          class="form-control"
          v-model="DDL"
          placeholder="Deadline"
        />
      </div>-->
      <!-- <div class="col-sm-6">
        <label>Time</label>
        <input
          type="number"
          class="form-control"
          v-model="totalTime"
          placeholder="Hours"
        />
      </div>-->
    </div>

    <button class="btn btn-primary" @click="save()">Save</button>
    <!-- <router-link :to="{path:'/template-edit',query:{templateId:this.templateId}}" class="btn btn-danger">Cancel</router-link> -->
    <button class="btn btn-danger" @click="back()">Cancel</button>
    <hr>
  </div>
</template>
<style>
</style>
<script>
import VueRouter from 'vue-router'
import vm from "../event.js";
export default {
  // inject:['reload'],
  name: "LogTime",
  data() {
      // console.log(this.$route.query.templateId)
      // this.templateId = this.$router.query.templateId
    return { preview: false, url: "", templateId: this.$route.query.templateId};
  },
  mounted(){
      // this.receiveId();
      // this.templateId=this.$router.query.templateId;
  },
  methods: {
    // receiveId() {
    //   vm.$on("templateId", id => {
    //     // console.log(id);
    //     this.templateId = id;
    //     // console.log(this.templateId);
    //   });
    // },
    // sendId(){
    //   // console.log(this.templateId)
    //   vm.$emit("templateId", this.templateId);
    // },
    upload(event) {
      this.preview = true;
      this.getObjectURL();
    },
    getObjectURL() {
      let file = document.getElementById("id").files[0];
      let url = null;
      if (window.createObjectURL != undefined) {
        // basic
        this.url = window.createObjectURL(file);
      } else if (window.webkitURL != undefined) {
        // webkit or chrome
        this.url = window.webkitURL.createObjectURL(file);
      } else if (window.URL != undefined) {
        // mozilla(firefox)
        this.url = window.URL.createObjectURL(file);
      }
    },
    save() {
      // console.log(JSON.stringify(document.getElementById("id").files[0]));
      let formData = new FormData();
      var getDate = new Date()
      formData.append("file", document.getElementById("id").files[0]);
      formData.append('templateId',this.templateId);
      formData.append('lastModifiedTime',getDate.toLocaleString());
      formData.append('createdTime',getDate.toLocaleString());
      formData.append('type','header');

      // console.log(formData);
      this.$http.post("http://127.0.0.1:5000/newHeader/", formData, {emulateJSON: true}).then(function(res) {
        // this.sendId();
        // vm.$emit("saved", this.templateId);
        // this.$router.go(0);
      });
      this.$router.go("/template-list");
      this.$router.push({path:'/template-edit',query:{templateId:this.templateId}})
      // this.reload()
    },
    back(){
      this.$router.go(-1)
    }
  }
};
</script>
