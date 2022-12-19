<template>
  <form @submit.prevent="addImage" class="form-signin">
    <h1 class="h3 mb-3 fw-normal">Add Image</h1>

    <div class="form-floating">
      <input
        type="text"
        v-model="name"
        class="form-control"
        placeholder="name"
      />
    </div>
    <div class="form-floating">
      <input
        type="text"
        v-model="desc"
        class="form-control"
        placeholder="name@example.com"
      />
    </div>
    <div class="form-floating">
      <input
        @change="onFileChange"
        ref="fileInput"
        class="form-control"
        type="file"
      />
    </div>

    <button class="w-100 btn btn-lg btn-primary" type="submit">Add</button>
  </form>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      desc: "",
      file: null,
    };
  },

  mounted() {
    this.checkToken();
  },

  methods: {
    // if url for add is manually typed in browser, check if user is logged in
    // check if token is present in local storage
    // if not, redirect to login page
    checkToken() {
      const token = localStorage.getItem("token");
      if (!token) {
        this.$router.push("/login");
      }
    },

    onFileChange() {
      this.file = this.$refs.fileInput.files[0];
    },
    async addImage() {
      const formData = new FormData();
      formData.append("name", this.name);
      formData.append("desc", this.desc);
      formData.append("file", this.file);

      const { data } = await this.$axios.post(
        "http://localhost:5000/images",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
        }
      );
      console.log(data);
      this.$router.push("/");
    },
  },
};
</script>
