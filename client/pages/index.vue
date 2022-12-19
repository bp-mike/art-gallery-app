<template>
  <div class="gallery">
    <div class="row px-5 mb-4 text-center">
      <h1 class="">Art Gallery App</h1>
      <nuxt-link to="/add-image" class="btn btn-primary btn-lg btn-block"
        >Add Image</nuxt-link
      >
    </div>
    <div class="row px-5">
      <div v-for="image in images" :key="image._id" class="my-2 col-md-3">
        <div class="card">
          <img class="card-img-top" :src="image.path" alt="Card image cap" />
          <div class="card-body">
            <h5 class="card-title">{{ image.name }}</h5>
            <p class="card-text">{{ image.desc }}</p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  async asyncData({ $axios }) {
    const { data } = await $axios.get("http://localhost:5000/images");
    const token = localStorage.getItem("token");
    return {
      images: data,
      token,
    };
  },

  methods: {
    async deleteImage(id) {
      await this.$axios.delete(`http://localhost:5000/images/${id}`);
    },

    getImage(image) {
      const base64Image = Buffer.from(image.data.data).toString("base64");
      console.log(`data:${image.contentType};base64,${base64Image}`);
      return `data:${image.contentType};base64,${base64Image}`;
    },
  },
};
</script>

<style scoped>
.gallery {
  width: 100vw !important;
}
</style>
