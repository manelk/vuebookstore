<template>
  <v-dialog v-model="dialog" width="600">
    <template v-slot:activator="{ on, attrs }">
      <v-btn outlined small color="red accent-3" v-bind="attrs" v-on="on">
        View details
      </v-btn>
    </template>
    <v-card>
      <v-card-title>
        <span class="headline">View details</span>
      </v-card-title>
      <v-card-text>
        <v-container>
          <v-row>
            <v-col cols="12" sm="6">
              <v-label>First Name</v-label>
              <v-text-field
                :label="item.firstName ? item.firstName : ''"
                solo
                readonly
                v-model="item.firstName"
                outlined
                disabled
              ></v-text-field>
            </v-col>
            <v-col cols="12" sm="6">
              <v-label>Last Name</v-label>
              <v-text-field
                readonly
                solo
                :label="item.lastName ? item.lastName : ''"
                v-model="item.lastName"
                outlined
                disabled
              ></v-text-field>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" sm="12">
              <v-label>Topic</v-label>
              <v-textarea
                readonly
                solo
                label="Topic"
                v-model="item.topic"
                outlined
                disabled
              ></v-textarea>
            </v-col>
          </v-row>
        </v-container>
      </v-card-text>
      <v-card-actions>
        <v-spacer></v-spacer>
        <v-btn color="blue darken-1" text @click="dialog = false">
          Close
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>
<script>
export default {
  props: ["item"],
  data() {
    return {
      dialog: false,
    };
  },
};
</script>