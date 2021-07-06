<template>
  <div v-if="error">
    <p class="text-red-500 font-semibold">{{error}}</p>
  </div>

  <section class="max-w-4xl p-6 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
    <h2 class="text-lg font-semibold text-gray-700 capitalize dark:text-white">Register your account or <router-link class="text-blue-700" to="/login">Login</router-link></h2>

    <form @submit.prevent="handleRegister">
      <div class="grid grid-cols-1 gap-6 mt-4 sm:grid-cols-2">
        <div>
          <label class="text-gray-700 dark:text-gray-200" for="username">Username</label>
          <input v-model="v$.form.name.$model" id="username" type="text" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
          <div class="text-red-500" v-for="(error, index) of v$.form.name.$errors" :key="index">
            <div class="">{{ error.$message }}</div>
          </div>
        </div>

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

        <div>
          <label class="text-gray-700 dark:text-gray-200" for="passwordConfirmation">Password Confirmation</label>
          <input v-model="v$.form.confirmPassword.$model" id="passwordConfirmation" type="password" class="block w-full px-4 py-2 mt-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring">
          <div class="text-red-500" v-for="(error, index) of v$.form.confirmPassword.$errors" :key="index">
            <div class="error-msg">{{ error.$message }}</div>
          </div>
        </div>
      </div>
      <div class="flex justify-end mt-6">
        <button type="submit" :disabled="v$.form.$invalid" class="px-6 py-2 leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Register</button>
      </div>
    </form>
  </section>
</template>

<script>
import axios from "axios";
import useVuelidate from '@vuelidate/core'
import { required, email, minLength, sameAs } from '@vuelidate/validators'


export function validName(name) {
  let validNamePattern = new RegExp("^[a-zA-Z]+(?:[-'\\s][a-zA-Z]+)*$");
  return validNamePattern.test(name);
}


export default {

  setup () {
    return { v$: useVuelidate() }
  },

  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        confirmPassword: '',
      },
      error: null
    }
  },
methods:{
handleRegister() {
  axios.post('http://127.0.0.1:8000/api/auth/register',{
    name: this.form.name,
    email: this.form.email,
    password: this.form.password,
    password_confirmation: this.form.confirmPassword,
  }).then( response => {
    this.$router.push('/login')
  }).catch(error => {
    this.error = "Check your credentials"
  })
}
},
  validations() {
    return {
      form: {
        name: {
          required, name_validation: {
            $validator: validName,
            $message: 'Invalid Name. Valid name only contain letters, dashes (-) and spaces'
          }
        },
        email: { required, email },
        password: { required, min: minLength(6) },
        confirmPassword: { required }
      },
    }
  },
  beforeRouteEnter(to, from, next) {
    if (localStorage.getItem("userInfo")) {
      return next('/login');
    }
    next();
  }
}
</script>

<style></style>
