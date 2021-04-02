<template>
<div class="book-wrapper">
  <div class='header1'><h1>Welcome to the [BC] owned Job Board!</h1> 
  </div>
  <div class="books">
    <div class="book" v-for="book in books" :key="book.id">
        <p><strong>Name:</strong> {{book.name}}</p><br/>
        <div class="info-wrapper">
            <div class="image-wrapper">
                <img :src="'/images/'+book.image"/>                
            </div>
            <div class="info">
                <div class="price-button">
                    <div class="price-wrapper">
                        <p><strong>Price(USD):</strong> {{book.price}}</p>
                    </div>
                    <div class="button-wrapper">
                        <button class="auto" @click="increasePrice(book.id)" style="margin-right: 23px;">+ price</button>
                        <button class="auto" @click="decreasePrice(book.id)">- price</button>
                    </div>
                </div>
                <p><strong>Genre:</strong> {{book.genre}}</p>
                <p><strong>Author:</strong> {{book.author}}</p>
                <p><strong>Language:</strong> {{book.language}}</p><br/>
                <button class="auto" @click="add(book)" style="margin-top:50px;">Favorite it!</button><br/>
                <p><strong><i>See Favorite Tab</i></strong></p>
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
  name: 'BookList',
  props: {
    books: Array
  },
  methods: {
    add(book) {
        this.$root.$data.tobuylist.push(book);
    },
    increasePrice(id) {
        this.$root.$data.books[this.$root.$data.books.findIndex(book => book.id == id)].price++
    },
    decreasePrice(id) {
        this.$root.$data.books[this.$root.$data.books.findIndex(book => book.id == id)].price--
    }
  }
}
</script>

<style scoped>
.book-wrapper {

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

.price-wrapper {
}

.price-button {
}

.button-wrapper {
}
</style>
