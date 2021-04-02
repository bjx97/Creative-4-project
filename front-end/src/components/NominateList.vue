<template>
<div class="all-wrapper">
    <div class='header1' style="color:#1270bd;"><h2>You may also nominate any books you feel worthy of being in the top rated books list.</h2>
    </div>
    <div class="addedWrapper">
        <div class="form-wrapper">
            <h2>Nominate a Book</h2><br/>
            <form v-on:submit.prevent="addBook">
                <input v-model="addedBookName" placeholder="Book name"><br/><br/>
                <input v-model="addedPrice" placeholder="Price"><br/><br/>
                <input v-model="addedAuthor" placeholder="Author"><br/><br/>
                <input v-model="addedGenre" placeholder="Genre"><br/><br/>
                <input v-model="addedLanguage" placeholder="Language"><br/><br/>
                <button type="submit">Add Book</button>
            </form>
        </div>
        <div class="list-wrapper">
            <h2>Book List</h2>
            <hr/>
            <p><strong><i>Check original list for added item</i></strong></p>
            <br/>
            <div v-if="this.$root.$data.nominatelist.length === 0">
                <p style="font-size: 30px"><strong>Add some books!</strong></p>
            </div>
            <div v-else v-for="list in nominatelist" :key="list.id" class="item-wrapper">
                <div>
                    <br/>
                    <p>Name: {{list.name}}</p>
                    <p>Price: ${{list.price}}</p>
                    <p>Genre: {{list.genre}}</p>
                    <p>Language: {{list.language}}</p>
                    <p><i>Author: {{list.author}}</i></p>
                    <br/>
                    <hr/>
                </div>
                <div class="remove-wrapper">
                    <button @click="remove(list)">Remove</button>
                    <br/>
                    <br/>
                    <button @click="addMock(list)">Upload to original list</button>
                    <hr/>
                </div>
            </div>
        </div>
    </div>
    <div class="footer">
      <a href="https://github.com/bjx97/creative-project-3" target="_blank">GitHub Repository</a>
    </div>
</div>
    
</template>

<script>
export default {
  name: 'NominateList',
  props: {
    nominatelist: Array
  },
  data () {
      return {
        addedBookName: '',
        addedGenre: '',
        addedAuthor: '',
        addedPrice: '',
        addedLanguage: '',
      }
  },
  methods: {
    addBook() {
      this.$root.$data.nominatelist.push({
        name: this.addedBookName,
        genre: this.addedGenre,
        author: this.addedAuthor,
        price: this.addedPrice,
        language: this.addedLanguage
      });
      this.addedBookName = '';
      this.addedGenre = '';
      this.addedAuthor = '';
      this.addedPrice = '';
      this.addedLanguage = '';
    },
    remove(list) {
        let index = this.$root.$data.nominatelist.indexOf(list);
        this.$root.$data.nominatelist.splice(index, 1);
    },
    addMock(list) {
        this.$root.$data.books.push( {
            id: this.$root.$data.id,
            name: list.name,
            price: list.price,
            language: list.language,
            author: list.author,
            genre: list.genre,
            image: "funnyimage.png"
            //image:
        })
        this.$root.$data.id += 1;
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

.addedWrapper {
    display: flex;
    justify-content: space-around;
}

.item-wrapper {
    display: flex;
}

.remove-wrapper {
    padding-top: 50px;
    padding-left: 50px;
}

</style>
