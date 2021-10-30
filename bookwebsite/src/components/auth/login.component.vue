<template>
  <v-app>
    <v-row align="center" justify="center">
      <v-col cols="12" sm="8" md="4">
        <v-card width="500" class="elevation-5">
          <v-container>
            <br />
            <div style="text-align: center">
              <v-icon color="deep-orange lighten-2" size="48" outlined
                >mdi-account</v-icon
              >
              <h4>Login</h4>
            </div>
            <br />
            <v-divider></v-divider>
            <br />
            <v-card-text>
              <v-form ref="form" v-model="valid" :lazy-validation="lazy">
                <v-text-field
                  color="deep-orange lighten-2"
                  label=" Email"
                  prepend-inner-icon="mdi-email"
                  v-model="dataUser.email"
                  outlined
                  :rules="emailRules"
                  required
                />
                <v-text-field
                  color="deep-orange lighten-2"
                  v-model="dataUser.password"
                  :type="showPassword ? 'text' : 'password'"
                  label=" Password"
                  prepend-inner-icon="mdi-lock"
                  outlined
                  :rules="[(v) => !!v || 'Password is required']"
                  :append-icon="showPassword ? 'mdi-eye' : 'mdi-eye-off'"
                  @click:append="showPassword = !showPassword"
                />
              </v-form>
              <v-btn
                @click="Login"
                color="deep-orange lighten-2"
                class="mr-4"
                style="height: 45px"
                block
                dark
                outlined
              >
                <v-icon left>mdi-login</v-icon>Login
              </v-btn>
              <v-card-actions class="text-xs-center" text align="center">
                <v-flex justify-center>
                  <v-btn color="deep-orange darken-2" text>
                    Forgot password?
                  </v-btn>
                </v-flex>
              </v-card-actions>

              <br />
            </v-card-text>
          </v-container>
        </v-card>
      </v-col>
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
    </v-row>
  </v-app>
</template>
<script>
/*import axios from "axios";
import jwt_decode from "jwt-decode";
import forgetPassword from "../../components/auth/forgetPassword.component";

import forgetPasswordComponent from "./forgetPassword.component.vue";*/

export default {
  //components: { forgetPasswordComponent },
  name: "Login",
  data() {
    return {
      dataUser: {},
      color: "success",
      snackbar: false,
      icon: "",
      snackbarText: "",
      isFormValid: false,
      password: "",
      confirmPassword: "",
      validPassword: "",
      rules: {
        confirmPasswordRules: (v) => !!v || "Password is required",
      },
      confirmPasswordRules: [
        (value) => !!value || "type confirm password",
        (value) =>
          value === this.dataUser.password ||
          "The password confirmation does not match.",
      ],
      passwordRules: [
        (v) => !!v || "Password is required",
        (v) => (v && v.length >= 5) || "Password must have 5+ characters",
        (v) => /(?=.*[A-Z])/.test(v) || "Must have one uppercase character",
        (v) => /(?=.*\d)/.test(v) || "Must have one number",
        (v) =>
          /([!@$%+])/.test(v) || "Must have one special character [!@#$%+]",
      ],
      dialog: false,
      pass: "",
      pass2: "",
      email: "",
      password: "",
      emailRules: [
        (v) => !!v || "E-mail is required",
        (v) => /.+@.+\..+/.test(v) || "E-mail is invalid",
      ],
      lazy: false,
      valid: true,
      showPassword: false,
      showPasswordUpdate1: false,
      showPasswordUpdate2: false,
      users: [],
      v: false,
      role: "",
      resetPasswordBtn: false,
    };
  },
  methods: {
    Login() {
      this.$store
        .dispatch("loginAction", this.dataUser)
        .then((response) => {
          if (response) {
            this.$router.push({ path: "/manageBooks" });
          }
        })
        .catch((error) => {
          if (error) {
            console.log("Err", error);
            this.dialog = false;
            if (error.response.status === 400) {
              this.error = "Error";
            }
            this.icon = "mdi-alert";
            this.snackbarText = "Email or password incorrect!";
            this.color = "red";
            this.snackbar = true;
          }
        });
    },
  },
};
</script>