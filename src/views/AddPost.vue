<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>Add New Post</v-card-title>
          <v-divider></v-divider>
          <v-form
            ref="form"
            class="pa-5"
            enctype="multipart/form-data"
            @submit.prevent="submitForm()"
          >
            <v-text-field
              label="Title"
              prepend-icon="mdi-note"
              :rules="rules"
              v-model="post.title"
            ></v-text-field>
            <v-text-field
              label="Category"
              prepend-icon="mdi-view-list"
              :rules="rules"
              v-model="post.category"
            ></v-text-field>
            <v-textarea
              label="Content"
              prepend-icon="mdi-note-plus"
              :rules="rules"
              v-model="post.content"
            ></v-textarea>
            <v-file-input
              type="file"
              ref="file"
              @change="selecteFile"
              :rules="rules"
              show-size
              counter
              multiple
              label="SelectImage"
            ></v-file-input>
            <v-btn type="submit" class="mt-3" color="primary">Add Post</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "../api";
export default {
  name: "AddPost",
  data() {
    return {
      rules: [(values) => !!values || "this filed is required !"],
      post: {
        title: "",
        category: "",
        content: "",
        image: "",
      },
      image: "",
    };
  },
  methods: {
    selecteFile(file) {
      this.image = file[0];
    },
    async submitForm() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("title", this.post.title);
      formData.append("category", this.post.category);
      formData.append("content", this.post.content);
      if (this.$refs.form.validate()) {
        await API.addPost(formData);
        this.$router.push("/");
      }
    },
  },
};
</script>

<style></style>
