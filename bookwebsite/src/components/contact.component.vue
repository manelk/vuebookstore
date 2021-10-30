<template>
  <v-app>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card width="500" class="elevation-5">
          <v-container>
            <br />
            <div style="text-align: center">
              <v-icon color="deep-orange lighten-2" size="48" outlined
                >mdi-email</v-icon
              >
              <h4>Contact us!</h4>
            </div>
            <br />
            <v-divider></v-divider>
            <v-flex xs12 sm8 offset-sm2 align-center justify-center>
              <v-form ref="form" v-model="valid" lazy-validation>
                <v-text-field
                  v-model="editedItem.firstName"
                  :counter="10"
                  :rules="nameRules"
                  label="First name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.lastName"
                  :counter="10"
                  :rules="nameRules"
                  label="Last name"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.email"
                  :rules="emailRules"
                  label="E-mail"
                  required
                ></v-text-field>
                <v-text-field
                  v-model="editedItem.subject"
                  label="Subject"
                  :rules="subjectRules"
                  required
                ></v-text-field>
                <v-textarea
                  v-model="editedItem.topic"
                  name="input-7-1"
                  label="Topic"
                  hint="Tell us more about your needs."
                  :rules="topicRules"
                ></v-textarea>
                <v-btn
                  :disabled="!valid"
                  color="success"
                  class="mr-4"
                  @click="validate"
                >
                  Validate
                </v-btn>
              </v-form>
            </v-flex>
          </v-container>
        </v-card>
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
      </v-col>
    </v-row>
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
    valid: true,
    nameRules: [
      (v) => !!v || "Name is required",
      (v) => (v && v.length <= 10) || "Name must be less than 10 characters",
    ],
    subjectRules: [(v) => !!v || "Subject is required"],
    topicRules: [(v) => !!v || "Topic is required"],
    emailRules: [
      (v) => !!v || "E-mail is required",
      (v) => /.+@.+\..+/.test(v) || "E-mail must be valid",
    ],
    editedItem: {
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      topic: "",
    },
    defaultItem: {
      _id: "",
      firstName: "",
      lastName: "",
      email: "",
      subject: "",
      topic: "",
    },
  }),

  methods: {
    validate() {
      if (this.$refs.form.validate()) {
        axios
          .post("http://localhost:3000/api/contact/contactAdd", this.editedItem)
          .then((res) => {
            console.log("resssssssssssssss", res);
            this.icon = "mdi-check-circle-outline";
            this.snackbarText = "Your request has been added!";
            this.color = "success";
            this.snackbar = true;
            //this.$router.push({ path: "/" });
          });
      } else {
        this.icon = "mdi-alert";
        this.snackbarText = "Please verify your information.";
        this.color = "red";
        this.snackbar = true;
      }
    },
    reset() {
      this.$refs.form.reset();
    },
    resetValidation() {
      this.$refs.form.resetValidation();
    },
  },
};
</script>