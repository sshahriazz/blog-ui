<template>
  <div v-if="user !== null">
    <div class="w-full max-w-sm mx-auto overflow-hidden bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div class="px-6 py-4">
        <h2 class="text-3xl font-bold text-center text-gray-700 dark:text-white">Hey! {{ user.name }}</h2>

        <h3 class="mt-1 text-xl font-medium text-center text-gray-600 dark:text-gray-200">Add your Comment</h3>

        <form @submit.prevent="addComment">
          <div class="w-full mt-4">
            <textarea v-model="text" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"  placeholder="Type Your Comments" ></textarea>
          </div>
          <div class="w-full mt-4">
            <input v-model="star" class="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-500 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:border-gray-600 dark:placeholder-gray-400 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="number" placeholder="Give your Rating." >
          </div>

          <div class="flex items-center justify-between mt-4">
            <button class="px-4 py-2 mx-auto leading-5 text-white transition-colors duration-200 transform bg-gray-700 rounded hover:bg-gray-600 focus:outline-none" type="submit">
              Add Comment
            </button>
          </div>
        </form>
      </div>

    </div>
  </div>
  <div v-for="(comment, key) in comments" :key="key" class="bg-white m-4 p-2 rounded-lg">
    <div class="max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div class="flex items-center justify-between">
        <span class="text-sm font-light text-gray-600 dark:text-gray-400">{{ comment.created_at }}</span>
      </div>
      <div class="mt-2">
        <p class="mt-2 text-gray-600 dark:text-gray-300">{{comment.text}}</p>
      </div>

      <div class="flex items-center justify-between mt-4">
        <p  class="text-blue-600 dark:text-blue-400 hover:underline">Rate Point:{{comment.star}} </p>

        <div v-if="user" class="flex items-center">
          <button @click="deleteComment(comment.id)" type="button" class="font-bold text-red-700 cursor-pointer dark:text-red-200">Delete</button>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api"

export default {
  name: "Comments",
  data() {
    return {
      user: null,
      postId: null,
      text: "",
      star: 0,
      comments:{

      }
    }
  },
  methods: {
    addComment() {
      axios.post(`${baseUrl}/post/${this.postId}/comment`,{
        text: this.text,
        star: this.star
      },).then(({data}) => {
        axios.get(`${baseUrl}/post/${this.postId}/comments`).then(({data})=>{
          this.comments = null
          this.comments = data.data
        }).catch(({ response })=>{
        })
      })
    },
    deleteComment(id){
      axios.delete(`${baseUrl}/comment/${id}`).then(({data})=>{
        axios.get(`${baseUrl}/post/${this.postId}/comments`).then(({data})=>{
          this.comments = null
          this.comments = data.data
        }).catch(({ response })=>{

        })
      }).catch(({ response })=>{

      })
    }
  },
  created() {
    this.postId = this.$route.params.id
    if (localStorage.getItem("userInfo")) {
      const data = JSON.parse(localStorage.getItem("userInfo"))
      this.user = data.user
    }
    axios.get(`${baseUrl}/singlepost/${this.postId}`).then(({data})=>{
      this.post = data
    }).catch(({ response })=>{

    })
    axios.get(`${baseUrl}/post/${this.postId}/comments`).then(({data})=>{
      this.comments = null
      this.comments = data.data
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

<style scoped>

</style>
