<template>
<div class="book-wrapper">
  <div class='header1'><h2>Welcome to the [BC] owned Job Board!</h2></div>

  <div class="jobs-wrapper">
    <div v-for="job in jobs" v-bind:key="job.id">
        <div class="job">
            <div class="job-descrip">
                <p>{{job.position}}</p>
                <p><i>{{job.posteddate}}</i></p>
                <p>{{job.openings}}</p>
                <p>{{job.startdate}}</p>
                <p>{{job.shift}}</p>
                <p>{{job.wage}}</p>
                <p>{{job.description}}</p>
            </div>
            <button @click="deleteJob(job)">Delete</button>
            <router-link :to="'/editjob/' + job.id" @click.native="setcurrentjob(job)">Edit</router-link>
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
    },
    async editItem(job) {
      console.log("editing item: " + this.findItem.description);
      try {
        await axios.put("/api/jobs/" + job.id, {
            
            /*posteddate = this.job.posteddate,
            openings = this.job.openings,
            startdate = this.job.startdate,
            shift = this.job.shift,
            wage = this.job.wage,
            description = this.job.description,*/
        });
        this.job = null;
        this.posteddate = null;
        this.openings;
        this.startdate;
        this.shift;
        this.wage;
        this.description;
        return true;
      } catch (error) {
        console.log(error);
      }
    },
   setcurrentjob(job) {
       this.$root.$data.currentjob = job;
   } 
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

.books {
    display: flex;
    flex-wrap: wrap;
    justify-content: space-around;
}

.book {
    display: flex;
    flex-direction: column;
    width: 38%;
    padding: 20px;
    margin-bottom: 30px;
    border: 5px double #333;
}

.image-wrapper img {
    height: 280px;
    width: 200px;
    object-fit: cover;
}

.info {
    padding-top: 70px;
    text-align: left;
    margin-left: 20px;
}

.info-wrapper {
    display: flex;
    justify-content: space-around;
}

</style>
