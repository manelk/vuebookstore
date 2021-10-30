  <!--  <v-app>
    <v-layout fill-height>
      <router-view name="Nav"></router-view>
      <v-main>
        <v-container fluid>
          <router-view> </router-view>
        </v-container>
      </v-main>
    </v-layout>
  </v-app>
-->
<template>
  <v-app>
    <v-app-bar color="brown lighten-1" dense dark>
      <!-- <v-app-bar-nav-icon></v-app-bar-nav-icon>
      <v-toolbar-title>Bookshop</v-toolbar-title> -->
      <v-btn text to="/" v-if="!isAdmin"> Home </v-btn>
      <v-btn text to="Ebooks" v-if="!isAdmin"> E Books </v-btn>
      <v-btn text to="Contact" v-if="!isAdmin"> Contact </v-btn>
      <v-btn text to="manageBooks" v-if="isAdmin">Manage Books</v-btn>
      <v-btn text to="manageContacts" v-if="isAdmin">Manage Contacts</v-btn>
      <v-spacer></v-spacer>
      <v-col cols="2">
        <v-text-field
          v-model="search"
          clearable
          outlined
          dense
          flat
          hide-details
          prepend-inner-icon="mdi-magnify"
          label="Search"
        ></v-text-field
      ></v-col>
      <!-- {{ isLoggedIn }}
      <span v-if="isLoggedIn">
        <v-btn text @click="logout">
          <v-icon left>mdi-door</v-icon>
          Log out
        </v-btn>
      </span>
      <span v-else>
        <v-btn text to="login">
          <v-icon left>mdi-lock-open</v-icon>
          Sign in
        </v-btn>
        <v-btn text to="register">
          <v-icon left>mdi-account-circle</v-icon>
          Sign up
        </v-btn>
      </span> -->

      <v-btn text to="login">
        <v-icon left>mdi-lock-open</v-icon>
        Sign in
      </v-btn>
      <v-btn text to="register">
        <v-icon left>mdi-account-circle</v-icon>
        Sign up
      </v-btn>
      <v-btn text @click="logout">
        <v-icon left>mdi-door</v-icon>
        Log out
      </v-btn>
    </v-app-bar>
    <v-main>
      <v-container fluid>
        <router-view> </router-view>
      </v-container>
    </v-main>
    <template>
      <v-footer color="brown lighten-1" padless>
        <v-row justify="center" no-gutters>
          <v-col class="brown lighten-1 py-4 text-center white--text" cols="12">
            {{ new Date().getFullYear() }} — <strong>Book store</strong>
          </v-col>
        </v-row>
      </v-footer>
    </template>
  </v-app>
</template>

<script>
import userMixin from "./mixins/user.mixin";
export default {
  mixins: [userMixin],
  name: "App",
  data() {
    return {
      search: "",
    };
  },
  computed: {
    isAdmin() {
      return this.currentUser && this.currentUser.role === "admin";
    },
    isLoggedIn() {
      // object is not empy ==> user exist then logged in
      if (this.$store.getters.getCurrentUser !== {}) {
        return true;
      } else {
        return false;
      }
      //return this.loggedIn;
    },
  },
  methods: {
    logout() {
      this.$store.dispatch("logout").then(() => {
        this.$router.push("/");
      });
    },
  },
};
</script>
