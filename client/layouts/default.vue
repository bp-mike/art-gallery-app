<template>
  <div>
    <nav class="navbar navbar-expand-md navbar-dark bg-dark mb-4">
      <div class="container-fluid">
        <nuxt-link class="navbar-brand" to="/">Home</nuxt-link>
        <div>
          <ul class="navbar-nav me-auto mb-2 mb-md-0">
            <li class="nav-item" v-if="token === null">
              <nuxt-link class="nav-link" to="/login">login</nuxt-link>
            </li>
            <li class="nav-item" v-if="token === null">
              <nuxt-link class="nav-link" to="/register">Register</nuxt-link>
            </li>
            <li class="nav-item" v-if="token !== null">
              <a class="nav-link" style="cursor: pointer" @click="logout"
                >logout</a
              >
            </li>
          </ul>
        </div>
      </div>
    </nav>
    <Nuxt />
  </div>
</template>
<script>
export default {
  data() {
    return {
      token: "",
    };
  },
  mounted() {
    this.getToken();
  },
  methods: {
    // get token from local storage
    async getToken() {
      this.token = localStorage.getItem("token");
      console.log({ token: this.token });
      return this.token;
    },

    logout() {
      localStorage.removeItem("token");
      this.$router.push("/login");
    },
  },
};
</script>
<style>
.form-signin {
  width: 100%;
  max-width: 330px;
  padding: 15px;
  margin: auto;
}

.form-signin .checkbox {
  font-weight: 400;
}

.form-signin .form-floating:focus-within {
  z-index: 2;
}

.form-signin input[type="email"] {
  margin-bottom: -1px;
  border-bottom-right-radius: 0;
  border-bottom-left-radius: 0;
}

.form-signin input[type="password"] {
  margin-bottom: 10px;
  border-top-left-radius: 0;
  border-top-right-radius: 0;
}
</style>
