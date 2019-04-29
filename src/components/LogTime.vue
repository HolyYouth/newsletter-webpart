<template>
  <div class="form-horizontal">
    <div class="form-group">
      <div class="col-sm-6">
        <label>Template Name</label>
        <input
          type="text"
          class="form-control"
          v-model="templateName"
          placeholder="Template Name"
        />
      </div>
      <div class="col-sm-6">
        <label>Deadline</label>
        <input
          type="date"
          class="form-control"
          v-model="DDL"
          placeholder="Deadline"
        />
      </div>
      <!-- <div class="col-sm-6">
        <label>Time</label>
        <input
          type="number"
          class="form-control"
          v-model="totalTime"
          placeholder="Hours"
        />
      </div> -->
    </div>
    
    <button class="btn btn-primary" @click="save()">Save</button>
    <router-link to="/template-list" class="btn btn-danger">Cancel</router-link>
    <hr>
  </div>
</template>
<style>

</style>
<script>

    export default {
        name : 'LogTime',
        data() {
            return {
                DDL : '',
                totalTime : '',
                templateName : ''
            }
        },
        methods:{
          save() {
            const plan = {
              name : '二哲',
              image : 'https://sfault-avatar.b0.upaiyun.com/888/223/888223038-5646dbc28d530_huge256',
              DDL : this.DDL,
              totalTime : this.totalTime,
              templateName : this.templateName
            };
            this.$store.dispatch('savePlan', plan)
            this.$store.dispatch('addTotalTime', this.totalTime)
            this.$router.go(-1)
          }
        }
    }
</script>
