<template>
  <v-app>
    <v-container fluid>
      <v-data-iterator
        :items="books"
        :items-per-page.sync="itemsPerPage"
        :page.sync="page"
        hide-default-footer
      >
        <template v-slot:default="props">
          <v-row>
            <v-col
              cols="12"
              sm="6"
              md="4"
              lg="3"
              max-width="400"
              v-for="item in books"
              :key="item._id"
            >
              <v-card height="100%">
                <v-img
                  class="white--text align-end"
                  gradient="to bottom, rgba(0,0,0,.1), rgba(0,0,0,.5)"
                  height="400px"
                  :src="item.bookImage"
                >
                  <v-list-item-title class="font-weight-bold">
                    <span style="font-size: 15px; padding: 4px">
                      {{ item.bookName }}
                    </span>
                  </v-list-item-title>
                </v-img>

                <v-list-item>
                  <v-list-item-content>
                    <v-list-item>
                      <v-list-item-content>
                        <b>Price:</b>
                      </v-list-item-content>
                      <v-list-item-content class="align-end">{{
                        item.price
                      }}</v-list-item-content>
                    </v-list-item>

                    <v-list-item>
                      <v-list-item-content>
                        <b>Quantity:</b>
                      </v-list-item-content>
                      <v-list-item-content class="align-end">{{
                        item.quantity
                      }}</v-list-item-content>
                    </v-list-item>
                    <v-list-item>
                      <v-list-item-content>
                        <b>Author:</b>
                      </v-list-item-content>
                      <v-list-item-content class="align-end">{{
                        item.authorName
                      }}</v-list-item-content>
                    </v-list-item>
                  </v-list-item-content>
                </v-list-item>
                <v-divider></v-divider>

                <v-spacer></v-spacer>
              </v-card>
            </v-col>
          </v-row>
        </template> </v-data-iterator
    ></v-container>
  </v-app>
</template>
    </v-data-iterator>
  </v-container>
</template>
<!--<template>
  <div id="app">
    <v-app>
      <v-content>
        <v-container grid-list-lg fluid>
          <v-layout row wrap>
            <v-layout v-if="books.length" row wrap>
              <v-flex v-for="item in books" :key="item._id" xs12 md6 lg3>
                <v-card width="95%">
                  <v-card-title primary-title>
                    <div>
                      <h3 class="headline mb-0" v-text="item.bookName"></h3>
                      <h4 class="headline mb-0" v-text="item.price"></h4>
                      <h4 class="headline mb-0" v-text="item.authorName"></h4>
                      <!-- <h4 class="headline mb-0" v-text="item.bookImage"></h4> 
                      <v-img :src="item.bookImage" aspect-ratio="1.75"></v-img>
                    </div>
                  </v-card-title>
                  <!-- <v-card-actions>
                  <v-btn color="orange" class="body-1">Inquire Item</v-btn>
                </v-card-actions> 
                </v-card>
              </v-flex>
            </v-layout>
          </v-layout>
        </v-container>
      </v-content>
    </v-app>
  </div>
</template>
-->
<script>
import axios from "axios";
export default {
  data: () => ({
    itemsPerPageArray: [8, 12],
    search: "",
    filter: {},
    sortDesc: false,
    page: 1,
    itemsPerPage: 8,
    drawer: true,
    books: [],
    editedIndex: -1,
  }),

  created() {
    this.getAllBooks();
  },

  methods: {
    getAllBooks() {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:3000/api/book/getAllBooks")
          .then((res) => {
            let listBooks = [];
            resolve(res.data.data);
            //console.log("res.data.data", res.data.data[0].bookImage);
            res.data.data.forEach((element) => {
              listBooks.push({
                _id: element._id,
                bookName: element.name,
                authorName: element.author,
                price: element.price,
                quantity: element.quantity,
                bookImage: element.bookImage,
              });
            });

            this.books = listBooks;
            //console.log("listBooks", listBooks);
          })
          .catch((err) => {
            reject(err);
          });
      });
    },
  },
};
</script>
