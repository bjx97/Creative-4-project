<template>
    <div>
        <div class='header1' style="color:#1270bd;"><h2>Post Jobs Here</h2>
        </div>
        <div class="addedWrapper">
            <div class="form-wrapper">
                <h2>Enter Job Details:</h2><br/>
                <form v-on:submit.prevent="addJob">
                    <p>Position: <input v-model="aPosition"></p><br/>
                    <p>Date Posted: <input v-model="aDate"></p><br/>
                    <p>Openings: <input v-model="aOpening"></p><br/>
                    <p>Start Date: <input v-model="aStart"></p><br/>
                    <p>Shift: <input v-model="aShift"></p><br/>
                    <p>Hourly Wage: <input v-model="aWage"></p><br/>
                    <p>Job Description: <textarea rows="4" cols="50"  v-model="description" placeholder="Description"></textarea></p><br/><br/>
                    <button type="submit">Post Job</button>
                </form>
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
  name: 'post',
  data() {
    return {
        aPosition: '',
        aDate: '',
        aOpening: '',
        aStart: '',
        aShift: '',
        aWage: '',
        description: ''
    }
  },
  methods: {
    async addJob() {
      try {
        await axios.post("/api/jobs", {
            position: this.aPosition,
            posteddate: this.aDate,
            openings: this.aOpening,
            startdate: this.aStart,
            shift: this.aShift,
            wage: this.aWage,
            description: this.description
        });
        this.aPosition = "";
        this.aDate = "";
        this.aOpening = "";
        this.aStart = "";
        this.aShift = "";
        this.aWage = "";
        this.description = "";
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  }
}
</script>


<style scoped>

.header1 {
  display: flex;
  justify-content: center;
  color: #868583;
  margin-bottom: 60px;
}

.form-wrapper {

}

.addedWrapper {
    display: flex;
    justify-content: space-between;
}

.item-wrapper {
    display: flex;
}

.remove-wrapper {
    padding-top: 50px;
    padding-left: 50px;
}

</style>