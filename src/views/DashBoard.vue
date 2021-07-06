<template>
  <div class="w-full flex space-x-4">
    <div class="mx-auto">
      <router-link to="/addpost" class="px-4 py-2 font-medium tracking-wider text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-500 dark:focus:bg-gray-700">
        Add new post
      </router-link>
    </div>
  </div>

  <div v-if="posts" v-for="(post, key) in posts" :key="key">
    <div  class="max-w-2xl m-5 px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div class="flex items-center justify-between">
        <span class="text-sm font-light text-gray-600 dark:text-gray-400">{{ post.created_at }}</span>
<!--                    <a class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">Design</a>-->
      </div>

      <div class="mt-2">
        <a href="#" class="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">{{ post.title }}</a>
        <p class="mt-2 text-gray-600 dark:text-gray-300">{{ post.body }}</p>
      </div>

      <div class="flex items-center justify-between mt-4">
        <router-link :to="{ name: 'updatepost', params: { id: post.id }}" class="text-blue-600 dark:text-blue-400 hover:underline">Update</router-link>
        <router-link :to="{ name: 'comments', params: { id: post.id }}" class="text-blue-600 dark:text-blue-400 hover:underline">Comments</router-link>
        <div class="flex items-center">
          <!--                                <img class="hidden object-cover w-10 h-10 mx-4 rounded-full sm:block" src="https://images.unsplash.com/photo-1502980426475-b83966705988?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=40&q=80" alt="avatar">-->
          <button @click="deletePost(post.id, key)" href="#" class="font-bold text-red-700 cursor-pointer dark:text-red-200">Delete</button>
        </div>
      </div>
    </div>
  </div>
  <div v-else>
    No post available
  </div>
<!--<p>dashboard</p>-->
</template>

<script>
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api"
export default {
  name: "Dashboard",
  data() {
    return {

      user: null,
      posts: {
        type: Object
      }
    }
  },
  methods:{
    deletePost(id){
      axios.delete(`${baseUrl}/post/${id}`).then(({data})=>{
        this.posts = null
        axios.get(`${baseUrl}/posts/${this.user.id}`).then(({data})=>{
          this.posts = data
        }).catch(({ response })=> {

        })
      }).catch(({ response })=>{

      })
    }
  },
  created() {
    if (localStorage.getItem("userInfo")) {
      const data = JSON.parse(localStorage.getItem("userInfo"))
      this.user = data.user

    }
  },
  mounted() {
    axios.get(`${baseUrl}/posts/${this.user.id}`).then(({data})=>{
      this.posts = data

    }).catch(({ response })=>{

    })
  },
  beforeRouteEnter(to, from, next) {
    if (!localStorage.getItem("userInfo")) {
      window.location.href = "/login";
    }
    next();
  }
}
</script>
