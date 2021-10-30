<template>
  <div>
    <v-carousel hide-delimiters>
      <v-carousel-item
        v-for="(item, i) in items"
        :key="i"
        :src="item.src"
      ></v-carousel-item>
    </v-carousel>
    <h1 style="text-align: center">Latest Books</h1>
    <!--<v-card class="mx-auto">-->
    <v-container fluid>
      <v-row dense align="center" justify="center">
        <v-col v-for="card in books" :key="card.bookName" :cols="card.flex">
          <v-card>
            <v-img
              :src="card.bookImage"
              class="white--text align-end"
              gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
              height="400px"
            >
              <v-card-title v-text="card.book"></v-card-title>
            </v-img>

            <!-- <v-card-actions>
              <v-spacer></v-spacer>

              <v-btn icon>
                <v-icon>mdi-heart</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-bookmark</v-icon>
              </v-btn>

              <v-btn icon>
                <v-icon>mdi-share-variant</v-icon>
              </v-btn>
            </v-card-actions> -->
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!--</v-card>-->
  </div>
</template>
<script>
import axios from "axios";

export default {
  data() {
    return {
      books: [],
      items: [
        {
          src: "https://images.unsplash.com/photo-1492539438225-2666b2a98f93?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1174&q=80",
        },
        {
          src: "https://images.unsplash.com/photo-1520545255830-2511979f3636?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1194&q=80",
        },
      ],
    };
  },
  created() {
    this.getAllBooks();
  },
  methods: {
    getImage() {
      const min = 550;
      const max = 560;

      return Math.floor(Math.random() * (max - min + 1)) + min;
    },

    getAllBooks() {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:3000/api/book/getAllBooks")
          .then((res) => {
            let listBooks = [];
            resolve(res.data.data);
            console.log("res.data.data", res.data.data[0].bookImage);
            res.data.data.forEach((element) => {
              listBooks.push({
                _id: element._id,
                bookName: element.name,
                authorName: element.author,
                price: element.price,
                quantity: element.quantity,
                bookImage: element.bookImage,
                flex: "2",
              });
            });

            this.books = listBooks;
            console.log("listBooks", listBooks);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
</script>