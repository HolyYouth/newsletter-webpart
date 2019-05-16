<template>
  <div class="form-horizontal">
    <div class="form-group">
      <div class="col-sm-6">
        <label>Upload Topic Icon</label>
        <!-- <input
          type="text"
          class="form-control"
          v-model="templateName"
          placeholder="Template Name"
        />-->
        <input type="file" id="id" name="image" class="getImgUrl_file">
      </div>
      <div class="col-sm-6">
        <label>Topic Item</label>
        <input type="text" id="item" class="form-control" placeholder="Topic Item">
      </div>
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
    <button class="btn btn-danger" @click="back()">Cancel</button>
    <hr>
  </div>
</template>
<style>
</style>
<script>
export default {
  name: "LogTime",
  data() {
    return {
      preview: false,
      url: "",
      templateId: this.$route.query.templateId
    };
  },
  methods: {
    save() {
      // console.log(JSON.stringify(document.getElementById("id").files[0]));
      let formData = new FormData();
      var getDate = new Date();
      formData.append("file", document.getElementById("id").files[0]);
      formData.append("templateId", this.templateId);
      formData.append("lastModifiedTime", getDate.toLocaleString());
      formData.append("createdTime", getDate.toLocaleString());
      formData.append("item", document.getElementById("item").value);
      console.log(this.templateId);
      console.log(formData);
      this.$http
        .post("http://127.0.0.1:5000/addTopic/", formData, {
          emulateJSON: true
        })
        .then(function(res) {
          this.$router.go("/template-list");
          this.$router.push({
            path: "/template-edit",
            query: { templateId: this.templateId }
          });
        });
    },
    back() {
      this.$router.go(-1);
    }
  }
};
</script>
