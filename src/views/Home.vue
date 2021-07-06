<template>


  <div v-for="(post, key) in posts">
    <div  class="max-w-2xl m-5 px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div class="flex items-center justify-between">
        <span class="text-sm font-light text-gray-600 dark:text-gray-400">{{post.created_at}}</span>
        <!--            <a class="px-3 py-1 text-sm font-bold text-gray-100 transition-colors duration-200 transform bg-gray-600 rounded cursor-pointer hover:bg-gray-500">Design</a>-->
      </div>

      <div class="mt-2">
        <p class="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">{{ post.title }}</p>
        <p class="mt-2 text-gray-600 dark:text-gray-300">{{ post.body }}</p>
      </div>

      <div class="flex items-center justify-between mt-4">
        <router-link :to="{ name: 'postcomment', params: { id: post.id }}" class="text-blue-600 dark:text-blue-400 hover:underline">Comments</router-link>

      </div>
    </div>
  </div>
  <div v-if="posts" class="w-full flex space-x-4">
    <div class="mx-auto space-x-2">
      <button class="mb-2 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-500 dark:focus:bg-gray-700" @click="previousPage(page)">Go back</button>
      <button class="mb-2 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-500 dark:focus:bg-gray-700" @click="nextPage(page)">Load More</button>
    </div>
  </div>

</template>

<script>
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api"

export default {
  name:"Home",
  components:{

  },
  data(){
    return {
      posts: null,
      page: 1,
    }
  },
  mounted(){
    axios.get(`${baseUrl}/posts?page=${this.page}`).then(({data})=>{
      this.posts = data.data
    }).catch(({ response })=>{
      console.error(response)
    })
  },
  methods:{
    nextPage(currentPage){
      this.page = currentPage + 1
      this.posts = null
      axios.get(`${baseUrl}/posts?page=${this.page}`).then(({data})=>{
        this.posts = data.data
      }).catch(({ response })=>{

      })
    },
    previousPage(currentPage){
      this.page = currentPage - 1
      this.posts = null
      axios.get(`${baseUrl}/posts?page=${this.page}`).then(({data})=>{

        this.posts = data.data
      }).catch(({ response })=>{

      })
    }
  }
}
</script>