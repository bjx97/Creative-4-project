<template>
    <div>
        <div class='header1' style="color:#1270bd;"><h2>Behold the Comments</h2></div>
        <div class="showDetails">
          
        </div>
    </div>
</template>

<script>
import axios from 'axios';
export default {
  name: 'comment',
  data() {
    return {
        realcomments: null,
        cComment: "",
        cName: ""
    }
  },
  methods: {
    async getComments() {
      try {
        let response = await axios.get("/api/jobs/" + this.$route.params.id + "/comments");
        this.realcomments = response.data;
        this.cComment = this.realcomments.text;
        this.cName = this.realcomments.name;
        console.log(this.cComment);
        console.log(this.cName);
        console.log(this.realcomments);
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  },
  created () {
    this.getComments();
  }
}
</script>