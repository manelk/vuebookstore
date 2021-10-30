<template>
  <v-app>
    <v-container>
      <v-data-table :headers="headers" :items="books" class="elevation-1">
        <template v-slot:top>
          <v-toolbar flat>
            <v-toolbar-title>Manage books</v-toolbar-title>
            <v-divider class="mx-4" inset vertical></v-divider>
            <v-spacer></v-spacer>
            <v-dialog v-model="dialog" max-width="500px">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  color="brown lighten-1"
                  dark
                  outlined
                  class="mb-2"
                  v-bind="attrs"
                  v-on="on"
                >
                  <v-icon left>mdi-plus</v-icon>
                  New book
                </v-btn>
              </template>
              <v-card>
                <v-card-title>
                  <span class="text-h5">{{ formTitle }}</span>
                </v-card-title>

                <v-card-text>
                  <v-container>
                    <v-row>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.bookName"
                          label="Book title"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.authorName"
                          label="Author Name"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.bookImage"
                          label="bookImage"
                        ></v-text-field>
                      </v-col>
                      <v-col cols="12" sm="6" md="4">
                        <v-text-field
                          v-model="editedItem.price"
                          label="Price"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                  </v-container>
                </v-card-text>

                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="close">
                    Cancel
                  </v-btn>
                  <v-btn color="blue darken-1" text @click="save"> Save </v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>
            <v-dialog v-model="dialogDelete" max-width="500px">
              <v-card>
                <v-card-title class="text-h5"
                  >Are you sure you want to delete this item?</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="blue darken-1" text @click="closeDelete"
                    >Cancel</v-btn
                  >
                  <v-btn color="blue darken-1" text @click="deleteItemConfirm"
                    >OK</v-btn
                  >
                  <v-spacer></v-spacer>
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-toolbar>
        </template>
        <template v-slot:item.actions="{ item }">
          <v-icon small class="mr-2" @click="editItem(item)">
            mdi-pencil
          </v-icon>
          <v-icon small @click="deleteItem(item)"> mdi-delete </v-icon>
        </template>
        <template v-slot:no-data>
          <v-btn color="primary" @click="getAllBooks"> Reset </v-btn>
        </template>
      </v-data-table>
      <v-snackbar
        v-model="snackbar"
        timeout="1500"
        color="white"
        transition="scroll-y-transition"
        top
      >
        <v-icon left class="mr-6" :color="color">{{ icon }}</v-icon>
        <span style="color: black">{{ snackbarText }}</span>
        <template v-slot:action="{ attrs }">
          <v-btn color="black" text v-bind="attrs" @click="snackbar = false">
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-container>
  </v-app>
</template>

<script>
import axios from "axios";
export default {
  data: () => ({
    color: "success",
    snackbar: false,
    icon: "",
    snackbarText: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "Book title",
        align: "start",
        sortable: false,
        value: "bookName",
      },
      { text: "Author name", value: "authorName" },
      { text: "Price", value: "price" },
      { text: "Book Image", value: "bookImage" },
      { text: "Actions", value: "actions", sortable: false },
    ],
    books: [],
    editedIndex: -1,
    editedItem: {
      _id: "",
      bookName: "",
      authorName: "",
      price: 0,
      bookImage: "",
    },
    defaultItem: {
      _id: "",
      bookName: "",
      authorName: "",
      price: 0,
      bookImage: "",
    },
  }),

  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New Item" : "Edit Item";
    },
  },

  watch: {
    dialog(val) {
      val || this.close();
    },
    dialogDelete(val) {
      val || this.closeDelete();
    },
  },

  created() {
    //this.initialize();
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
            console.log("res.data.data", res.data.data[0].name);
            res.data.data.forEach((element) => {
              listBooks.push({
                _id: element._id,
                bookName: element.name,
                authorName: element.author,
                price: element.price,
                bookImage: element.bookImage,
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

    editItem(item) {
      this.editedIndex = this.books.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      axios
        .delete("http://localhost:3000/api/book/deleteBook/" + item._id)
        .then((res) => {
          if (res) {
            this.editedIndex = this.books.indexOf(item);
            this.editedItem = Object.assign({}, item);
            this.dialogDelete = true;
          }
        });
    },

    deleteItemConfirm() {
      this.books.splice(this.editedIndex, 1);
      this.closeDelete();
    },

    close() {
      this.dialog = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    closeDelete() {
      this.dialogDelete = false;
      this.$nextTick(() => {
        this.editedItem = Object.assign({}, this.defaultItem);
        this.editedIndex = -1;
      });
    },

    save() {
      if (this.editedIndex > -1) {
        // Edit
        console.log("this.editedItem._id", this.editedItem._id);
        axios
          .post(
            "http://localhost:3000/api/book/updateBook/" + this.editedItem._id,
            {
              name: this.editedItem.bookName,
              author: this.editedItem.authorName,
              price: this.editedItem.price,
              bookImage: this.editedItem.bookImage,
            }
          )
          .then((res) => {
            Object.assign(this.books[this.editedIndex], this.editedItem);
            this.close();
            this.icon = "mdi-check-circle-outline";
            this.snackbarText = "Book modified!";
            this.color = "success";
            this.snackbar = true;
          });
      } else {
        // Add
        axios
          .post("http://localhost:3000/api/book/bookAdd", {
            name: this.editedItem.bookName,
            author: this.editedItem.authorName,
            price: this.editedItem.price,
            bookImage: this.editedItem.bookImage,
          })
          .then((res) => {
            this.close();
            this.icon = "mdi-check-circle-outline";
            this.snackbarText = "Book added!";
            this.color = "success";
            this.snackbar = true;
            this.getAllBooks();
          });
      }
    },
  },
};
</script>