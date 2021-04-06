<template>
<div class="book-wrapper">
  <div class='header1'><h2>Welcome to the [BC] owned Job Board!</h2></div>

  <div class="jobs-wrapper">
    <div v-for="job in jobs" v-bind:key="job.id">
        <div class="job">
            <div class="job-descrip">
                <p><strong>Job Position: </strong>{{job.position}}</p>
                <p><strong>Posted On: </strong><i>{{job.posteddate}}</i></p>
                <p><strong>Opening: </strong>{{job.openings}}</p>
                <p><strong>Start Date: </strong>{{job.startdate}}</p>
                <p><strong>Shifts: </strong>{{job.shift}}</p>
                <p><strong>Hourly Pay: </strong>${{job.wage}}</p>
                <p><strong>Job Description: </strong>{{job.description}}</p>
            </div>
            <div class="buttons">
              <button @click="deleteJob(job)">Delete</button>
              <router-link :to="'/editjob/' + job.id">Edit</router-link>
            </div>
        </div>
    </div>
  </div>

  <div class="footer">
      <!--<a href="https://github.com/bjx97/creative-project-3" target="_blank">GitHub Repository</a>-->
  </div>
</div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'home',
  data() {
    return {
      jobs: [],
      findJob: null,
      iPosition: '',
      iDate: '',
      iOpening: '',
      iStart: '',
      iShift: '',
      iWage: '',
      idescription: ''
    }
  },
  created() {
    this.getJobs();
  },
  methods: {
    async getJobs() {
      try {
        let response = await axios.get("/api/jobs");
        this.jobs = response.data.jobs;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteJob(job) {
      try {
        await axios.delete("/api/jobs/" + job.id);
        this.getJobs();
        return true;
      } catch (error) {
        console.log(error);
      }
    }
   /*setcurrentjob(job) {
     @click.native="setcurrentjob(job);
       this.$root.$data.currentjob = job;
   }*/
  }
}
</script>

<style scoped>

.header1 {
  display: flex;
  justify-content: center;
  color:#1270bd;
  margin-bottom: 40px;
}

.job {
  display: flex;
  margin-bottom: 10px;
}

</style>
