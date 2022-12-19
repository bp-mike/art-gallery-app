<template>
  <div class="form-signin">
    <h1 class="h3 mb-3 fw-normal">Login</h1>

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

    <button class="w-100 btn btn-lg btn-primary" @click="login">Login</button>
  </div>
</template>

<script>
export default {
  data() {
    return {
      email: "",
      password: "",
    };
  },

  methods: {
    async login() {
      const { data } = await this.$axios.post(
        "http://localhost:5000/user/login",
        {
          email: this.email,
          password: this.password,
        }
      );
      //   Save token to local storage
      localStorage.setItem("token", data.loginToken);

      //   save token to axios header
      this.$axios.defaults.headers.common = {
        Authorization: `Bearer ${data.loginToken}`,
      };

      this.$router.push("/");
    },
  },
};
</script>
