<template>
  <div class="bg-white rounded flex shadow m-4">
    <p class="text-red-500 mx-auto">{{error}}</p>
  </div>
  <section class="max-w-lg p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
    <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Login to your account or <router-link class="text-blue-700" to="/register">Register</router-link></h2>

    <form @submit.prevent="handleLogin">
      <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label class="text-gray-700 dark:text-gray-200" for="emailAddress">Email Address</label>
          <input v-model="v$.form.email.$model" id="emailAddress" type="email" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
          <div class="text-red-500" v-for="(error, index) of v$.form.email.$errors" :key="index">
            <div class="">{{ error.$message }}</div>
          </div>
        </div>

        <div>
          <label class="text-gray-700 dark:text-gray-200" for="password">Password</label>
          <input v-model="v$.form.password.$model" id="password" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
          <div class="text-red-500" v-for="(error, index) of v$.form.password.$errors" :key="index">
            <div class="">{{ error.$message }}</div>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-6">
        <button type="submit" :disabled="v$.form.$invalid" class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Login</button>
      </div>
    </form>
  </section>
</template>

<script>
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'
import axios from "axios";



export default {

  setup () {
    return { v$: useVuelidate() }
  },

  data() {
    return {
      form: {
        email: '',
        password: '',
      },
      error: null
    }
  },
  methods:{
    handleLogin () {
      axios.post('http://127.0.0.1:8000/api/auth/login',{
        email: this.form.email,
        password: this.form.password,
      }).then( response => {

        const parsed = JSON.stringify(response.data)
        localStorage.setItem('userInfo', parsed)
        window.location.href = "/dashboard";
      }).catch(error => {
        this.error = "Password or Email didnt matched."
      })
    }
  },
  validations() {
    return {
      form: {
        email: { required, email },
        password: { required, min: minLength(6) },
      },
    }
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("userInfo")) {
      return next('/dashboard');
    }
    next();
  }
}
</script>

<style></style>

