<template>
<div class="book-wrapper">
  <div class='header1'><h2>Welcome to the [BC] owned Job Board!</h2></div>
  <div class="jobs-wrapper">
    <div v-for="job in jobs" v-bind:key="job.id">
        <div class="job">
            <div class="job-descrip">
                <p><strong>Job Position: </strong>{{job.position}}</p><br/>
                <p><strong>Posted On: </strong><i>{{job.posteddate}}</i></p><br/>
                <p><strong>Opening: </strong>{{job.openings}}</p><br/>
                <p><strong>Start Date: </strong>{{job.startdate}}</p><br/>
                <p><strong>Shifts: </strong>{{job.shift}}</p><br/>
                <p><strong>Hourly Pay: </strong>${{job.wage}}</p><br/>
                <p><strong>Job Description: </strong>{{job.description}}</p><br/>
                <div class="buttons">
                  <button @click="deleteJob(job)">Delete</button>
                  <div class="link-button">
                    <router-link :to="'/editjob/' + job.id">Edit</router-link>
                  </div>
                  <button @click="showComments(job)">See Comments</button>
                </div>
                <div v-if="showing" class="if-com">
                  <h3>List of Comments:</h3>
                  <br/>
                  <div v-for="comment in comments" v-bind:key="comment._id">
                    <p><strong>Name: </strong>{{comment.name}}</p>
                    <p><strong>Comment: </strong>{{comment.text}}</p>
                    <p><i><strong>Date: </strong>{{comment.whenDate}}</i></p>               
                    <button @click="deleteComment(comment, job)">Delete</button>
                    <br/>
                    <br/>
                    <br/>
                  </div>
                </div>
                <!--<router-link :to="'/commentjob/' + job.id">Comments</router-link>-->
            </div>
            <div class="comments">
              <h2>Comment below:</h2>
              <form class="form-wrap" v-on:submit.prevent="commentJob(job)">
                <input v-model="hName" placeholder="Name"/><br/>
                <input v-model="hDate" placeholder="Date"/><br/>
                <textarea rows="4" cols="50"  v-model="hComment" placeholder="Comments/Interests"></textarea><br/>
                <button type="submit">Comment</button>
              </form>
            </div>
        </div>
    </div>
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
      comments: [],
      iPosition: '',
      iDate: '',
      iOpening: '',
      iStart: '',
      iShift: '',
      iWage: '',
      idescription: '',
      hComment: '',
      hName: '',
      hDate: '',
      showing: false
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
        console.log(response.data.jobs);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async getComments(job) {
      try {
        let response = await axios.get("/api/jobs/" + job.id + "/comments");
        this.comments = response.data;
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
    async commentJob(job) {
      try {
        await axios.post("/api/jobs/" + job.id + "/comments", {
            text: this.hComment,
            name: this.hName,
            whenDate: this.hDate
        });
        this.hComment = "";
        this.hName = "";
        this.hDate = "";
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async showComments(job) {
      try {
        this.showing = !this.showing;
        this.comments = [];
        let response = await axios.get("/api/jobs/" + job.id + "/comments");
        this.comments = response.data;
        console.log(response);
        return true;
      } catch (error) {
        console.log(error);
      }
    },
    async deleteComment(comment, job) {
      try {
        await axios.delete('/api/jobs/' + job.id + '/comments/' + comment._id);
        this.getComments(job);
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
  flex-wrap: wrap;
  margin-bottom: 40px;
  text-align: start;
  justify-content: space-around;
}

.job-descrip {
  padding-top: 10px;
  padding-bottom: 10px;
  flex-wrap: wrap;
}

.form-wrap {
  padding-top: 10px;
  display: flex;
  flex-direction: column;
  align-items: flex-start;
}

.buttons {
  display: flex;
  justify-content:space-evenly;
  margin-top: 10px;
}

.des-wrap {
  display: flex;
  flex-wrap: wrap;
}

.if-com {
  display: flex;
  flex-direction: column;
  margin-top: 110px;
}

.link-button {
  background-color: #e7e7e7; 
  color: black;
  border: solid;
  text-align: center;
  text-decoration: none;
  display: inline-block;
  padding:5px;
  font-size: 13px;
}

</style>
