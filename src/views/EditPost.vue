<template>
  <v-container>
    <v-row no-gutters>
      <v-col sm="10" class="mx-auto">
        <v-card class="pa-5">
          <v-card-title>Edit this Post</v-card-title>
          <v-divider></v-divider>
          <v-form
            ref="form"
            class="pa-5"
            enctype="multipart/form-data"
            @submit.prevent="updateForm()"
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
              show-size
              counter
              multiple
              label="SelectImage"
            ></v-file-input>
            <v-img
              width="120px"
              height="120px"
              :src="'http://localhost:5000/uploads/' + post.image"
            ></v-img>
            <v-btn type="submit" class="mt-3" color="primary">Update Post</v-btn>
          </v-form>
        </v-card>
      </v-col>
    </v-row>
  </v-container>
</template>

<script>
import API from "../api";
export default {
  name: "UpdatePost",
  data() {
    return {
      rules: [(value) => !!value || "this filed is required !"],
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
    async updateForm() {
      const formData = new FormData();
      formData.append("image", this.image);
      formData.append("title", this.post.title);
      formData.append("category", this.post.category);
      formData.append("content", this.post.content);
      formData.append("old_image", this.post.image);
      if (this.$refs.form.validate()) {
        await API.updatePost(this.$route.params.id, formData);
        this.$router.push("/");
      }
    },
  },
  async created() {
    const response = await API.getPostByID(this.$route.params.id);
    this.post = response;
  },
};
</script>

<style></style>
