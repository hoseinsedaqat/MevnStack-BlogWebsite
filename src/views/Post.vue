<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="pa-4 mx-auto">
        <v-card class="pa-2">
          <v-img :src="'http://localhost:5000/uploads/' + post.image"></v-img>
          <v-card-actions class="pb-0">
            <v-row class="mt-1 mx-1">
              <v-col sm="2">
                <v-btn small outlined color="primary">{{ post.category }}</v-btn>
              </v-col>
              <v-col sm="10" class="d-flex justify-end">
                <v-btn color="success" text :to="`/edit-post/${post._id}`">Edit</v-btn>
                <v-btn color="red" text @click="deletePost(post._id)">Delete</v-btn>
              </v-col>
            </v-row>
          </v-card-actions>
          <v-card-subtitle class="headline">
            <h3>{{ post.title }}</h3>
          </v-card-subtitle>
          <v-card-text class="grey-text">
            <p>{{ post.content }}</p>
            <p>{{ post.create }}</p>
          </v-card-text>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "../api";
export default {
  name: "Post",
  data() {
    return {
      post: {},
    };
  },
  methods: {
    async deletePost(id) {
      await API.deltePost(id);
      this.$router.push("/");
    },
  },
  async created() {
    const respone = await API.getPostByID(this.$route.params.id);
    this.post = respone;
  },
};
</script>

<style></style>
