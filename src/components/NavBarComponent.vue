<template>
  <header class="text-gray-600 bg-white body-font">
    <div class="container mx-auto flex flex-wrap p-5 flex-col md:flex-row items-center">
      <nav class="flex lg:w-2/5 flex-wrap items-center text-base md:ml-auto">
        <span>
          <router-link to="/" class="font-semibold mr-5 hover:text-gray-900">Home</router-link>
        </span>
        <span v-if="!user">
        <router-link to="/register" class="mr-5 font-semibold hover:text-gray-900">Register</router-link>
        <router-link to="/login" class=" font-semibold hover:text-gray-900">Login</router-link>
        </span>
        <span v-if="user">
          <router-link to="/users" class="mr-5 font-semibold hover:text-gray-900">User List</router-link>
          <router-link to="/dashboard"  class="mr-5 font-semibold hover:text-gray-900">Dashboard</router-link>
          <button type="button" @click="logout" class="mr-5 hover:text-gray-900 font-semibold text-red-500">Logout</button>
        </span>
      </nav>
      <a class="flex order-first lg:order-none lg:w-1/5 title-font font-medium items-center text-gray-900 lg:items-center lg:justify-center mb-4 md:mb-0">
        <svg xmlns="http://www.w3.org/2000/svg" fill="none" stroke="currentColor" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" class="w-10 h-10 text-white p-2 bg-indigo-500 rounded-full" viewBox="0 0 24 24">
          <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"></path>
        </svg>
        <span class="ml-3 text-xl"> <router-link to="/">Blog</router-link> </span>
      </a>
    </div>
  </header>
</template>

<script>
export default {
  data(){
    return {
      user: null
    }
  },

  methods: {
    logout(){
      localStorage.removeItem("userInfo")
      window.location.href = "/";
    }
  },
  created() {
    if (localStorage.getItem("userInfo")) {
      const data = JSON.parse(localStorage.getItem("userInfo"))
      this.user = data.user
    }
  },
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem("userInfo")) {
      window.location.href = "/login";
    }
    next();
  }
};
</script>

<style></style>
