<template>
  <v-app>
    <v-container>
      <div>
        <v-data-table
          :headers="headers"
          :items="contacts"
          :search="search"
          class="elevation-1"
          :page.sync="page"
          :items-per-page="itemsPerPage"
          hide-default-footer
          @page-count="pageCount = $event"
          :loading="myloadingvariable"
          loading-text="Loading... Please wait"
        >
          <template v-slot:top>
            <v-toolbar flat>
              <v-toolbar-title>Contact management</v-toolbar-title>
              <v-divider class="mx-4" inset vertical></v-divider>
              <v-spacer></v-spacer>
              <v-text-field
                outlined
                dense
                class="mr-6"
                v-model="search"
                append-icon="mdi-magnify"
                label="Search"
                single-line
                hide-details
              ></v-text-field>
              <v-dialog v-model="dialogDelete" max-width="500px">
                <v-card>
                  <v-card-title class="headline"
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
          <template v-slot:item="{ item }">
            <tr>
              <td>
                <v-icon small class="mr-6" color="yellow darken-3"
                  >mdi-account</v-icon
                >
                <span>{{ item.firstName }}</span>
              </td>
              <td>
                <span>{{ item.lastName }}</span>
              </td>
              <td>
                <span>{{ item.subject }}</span>
              </td>
              <td class="center">
                <showContact :item="item"></showContact>
              </td>
            </tr>
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
        <div class="text-center pt-2">
          <v-pagination
            v-model="page"
            :length="pageCount"
            color="teal lighten-1"
            circle
          ></v-pagination>
        </div>
      </div>
    </v-container>
  </v-app>
</template>
<script>
//import axios from "axios";
import showContact from "./showContact.component.vue";
import axios from "axios";
export default {
  data: () => ({
    valid: true,
    color: "success",
    snackbar: false,
    icon: "",
    snackbarText: "",
    dialogProfile: false,
    roleNameEdit: "",
    roleFunctionalitiesEdit: {},
    rolesItems: [],
    myloadingvariable: false,
    page: 1,
    pageCount: 0,
    itemsPerPage: 10,
    search: "",
    dialog: false,
    dialogDelete: false,
    headers: [
      {
        text: "First Name",
        align: "start",
        sortable: false,
        value: "firstName",
      },
      { text: "Last Name", value: "lastName" },
      { text: "Subject", value: "subject" },
      { text: "Profile", value: "" },
    ],
    contacts: [],
    editedIndex: -1,
    editedItem: {
      _id: "",
      firstName: "",
      lastName: "",
      subject: "",
      topic: "",
    },
    defaultItem: {
      _id: "",
      firstName: "",
      lastName: "",
      subject: "",
      topic: "",
    },
  }),
  computed: {
    formTitle() {
      return this.editedIndex === -1 ? "New User" : "Edit User";
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
  components: {
    showContact,
  },
  created() {
    this.initialize();
    // this.getRoles();
  },

  methods: {
    initialize() {
      return new Promise((resolve, reject) => {
        axios
          .get("http://localhost:3000/api/contact/getAllContacts")
          .then((res) => {
            let listContacts = [];
            resolve(res.data.contacts);
            res.data.contacts.forEach((element) => {
              listContacts.push({
                _id: element._id,
                firstName: element.firstName,
                lastName: element.lastName,
                subject: element.subject,
                topic: element.topic,
              });
            });
            this.contacts = listContacts;
          })
          .catch((err) => {
            reject(err);
          });
      });
    },

    editItem(item) {
      this.editedIndex = this.contacts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialog = true;
    },

    deleteItem(item) {
      this.editedIndex = this.contacts.indexOf(item);
      this.editedItem = Object.assign({}, item);
      this.dialogDelete = true;
    },

    deleteItemConfirm() {
      this.contacts.splice(this.editedIndex, 1);
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
        Object.assign(this.contacts[this.editedIndex], this.editedItem);
      } else {
        this.contacts.push(this.editedItem);
      }
      this.close();
    },
  },
};
</script>