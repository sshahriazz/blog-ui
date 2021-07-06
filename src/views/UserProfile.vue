
<template>
  <div class="bg-white rounded shadow-lg p-4 m-2 mx-auto max-w-md">
    <div class="" v-for="(userData, user) in currentUser" :key="user">
      <p class="">{{user}} - {{userData}}</p>
    </div>
  </div>
  Posts:
  <div class="bg-white rounded shadow-lg p-4 m-2 mx-auto max-w-md">

    <div v-for="(post, key) in userPosts" :key="key">
      <div  class="max-w-2xl m-5 px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
        <div class="flex items-center justify-between">
          <span class="text-sm font-light text-gray-600 dark:text-gray-400">{{post.created_at}}</span>
        </div>

        <div class="mt-2">
          <a href="#" class="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">{{ post.title }}</a>
          <p class="mt-2 text-gray-600 dark:text-gray-300">{{ post.body }}</p>
        </div>
      </div>
    </div>
    <div class="w-50 flex space-x-4 align-content-around">
      <button class="ml-16 mb-2 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-500 dark:focus:bg-gray-700" @click="previousPage(page)">Go back</button>
      <button class="mr-16 mb-2 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-500 dark:focus:bg-gray-700" @click="nextPage(page)">Load More</button>
    </div>
  </div>
</template>
<script>
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api"
export default {
  data(){
    return{
      access_token: null,
      userId: null,
      userPosts: null,
      currentUser: null,
      page: 1,
      show: false
    }
  },
  created() {
    this.userId = this.$route.params.id
    if (localStorage.getItem("userInfo")) {
      const data = JSON.parse(localStorage.getItem("userInfo"))
      this.access_token = data.access_token
    }
    axios.get(`${baseUrl}/userpost/${this.userId}?page=${this.page}`).then(({data})=>{
      this.userPosts = data.data

    }).catch(({ response })=>{

    })
  },
  methods: {
    nextPage(currentPage){
      this.page = currentPage + 1
      this.userPosts = null
      axios.get(`${baseUrl}/userpost/${this.userId}?page=${this.page}`).then(({data})=>{
        this.userPosts = data.data
      }).catch(({ response })=>{

      })
    },
    previousPage(currentPage){
      this.page = currentPage - 1
      this.userPosts = null
      axios.get(`${baseUrl}/userpost/${this.userId}?page=${this.page}`).then(({data})=>{

        if (data){
          this.userPosts = data.data
        }else this.userPosts = null

      }).catch(({ response })=>{
        this.userPosts = null
      })
    }
  },
  mounted() {
    axios.get(`${baseUrl}/auth/user/${this.userId}`,{
      headers: {
        Authorization: `Bearer ${this.access_token}`
      }
    }).then(({data})=>{
      this.currentUser = data

    }).catch(({ response })=>{

    })
  },
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem("userInfo")) {
      window.location.href = "/";
    }
    next();
  }
}

</script>
<style>

</style>