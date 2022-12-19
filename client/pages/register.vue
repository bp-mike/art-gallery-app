<template>
  <div>
    <h1 class="h3 mb-3 fw-normal">Register</h1>

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
        type="email"
        v-model="email"
        class="form-control"
        placeholder="name@example.com"
      />
    </div>
    <div class="form-floating">
      <input
        type="password"
        v-model="password"
        class="form-control"
        placeholder="Password"
      />
    </div>
    <div class="form-floating">
      <nuxt-link to="/login">Have an account? login</nuxt-link>
    </div>

    <button class="w-100 btn btn-lg btn-primary" @click="register">
      Register
    </button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      name: "",
      email: "",
      password: "",
    };
  },

  methods: {
    async register() {
      const { data } = await this.$axios.post(
        "http://localhost:5000/user/register",
        {
          name: this.name,
          email: this.email,
          password: this.password,
        }
      );
      console.log(data);
      this.$router.push("/login");
    },
  },
};
</script>
