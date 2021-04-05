<template>
    <div>
        <div class='header1' style="color:#1270bd;"><h2>Edit Job Posts Here</h2></div>
        <div class="addedWrapper">
            <div class="form-wrapper">
                <form v-on:submit.prevent="editJob()">
                    <input v-model="ePosition" placeholder="Position"><br/>
                    <input v-model="eDate" placeholder="Posted Date"><br/>
                    <input v-model="eOpening" placeholder="Openings"><br/>
                    <input v-model="eStart" placeholder="Start Date"><br/>
                    <input v-model="eShift" placeholder="Shift"><br/>
                    <input v-model="eWage" placeholder="Hourly Wage"><br/>
                    <textarea rows="4" cols="50"  v-model="eDescription" placeholder="Description"></textarea><br/><br/>
                    <button type="submit">Update Post</button>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'edit',
  data() {
    return {
        updatejob: null,
        ePosition: "",
        eDate: "",
        eOpening: "",
        eStart: "",
        eShift: "",
        eWage: "",
        eDescription: ""
    }
  },
  methods: {
    async getJobs() {
      try {
        let response = await axios.get("/api/jobs/" + this.$route.params.id);
        this.updatejob = response.data;
        this.ePosition = this.updatejob.position;
        this.eDate = this.updatejob.posteddate;
        this.eOpening = this.updatejob.openings;
        this.eStart = this.updatejob.startdate;
        this.eShift = this.updatejob.shift;
        this.eWage = this.updatejob.wage;
        this.eDescription = this.updatejob.description;
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  },
  created () {
    this.getJobs();
  }
}
</script>