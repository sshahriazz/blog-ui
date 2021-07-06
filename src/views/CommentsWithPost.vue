<template>
  <div>

    <router-link to="/" class="px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-500 dark:focus:bg-gray-700">
      Go Back
    </router-link>
  </div>
  <div v-if="post">
  <p>Post Details:</p>
    <div class="max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div class="flex items-center justify-between">
        <span class="text-sm font-light text-gray-600 dark:text-gray-400">{{ post.created_at }}</span>
      </div>

      <div class="mt-2">
        <a href="#" class="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200 hover:underline">{{
            post.title
          }}</a>
        <p class="mt-2 text-gray-600 dark:text-gray-300">{{post.body}}</p>
      </div>
    </div>
  </div>
  <p>Post Comments:</p>
  <div class="p-2" v-if="comments" v-for="(comment, key) in comments" :key="key">
    <div class="max-w-2xl px-8 py-4 mx-auto bg-white rounded-lg shadow-md dark:bg-gray-800">
      <div class="flex items-center justify-between">
        <span class="text-sm font-light text-gray-600 dark:text-gray-400">{{ comment.created_at }}</span>
      </div>

      <div class="mt-2">
        <p class="text-2xl font-bold text-gray-700 dark:text-white hover:text-gray-600 dark:hover:text-gray-200">
          {{comment.text}} </p>
        <p class="mt-2 text-gray-600 dark:text-gray-300">Rating: {{
            comment.star
          }}</p>
      </div>
    </div>
  </div>
  <div v-else>
    <p class="text-red-500">Sorry! No comments.</p>
  </div>

</template>

<script>
  import axios from "axios";
  const baseUrl = "http://127.0.0.1:8000/api"
  export default {
    name: "CommentsPost",
    data() {
      return {
        postId: null,
        post: null,
        comments: null,
      }
    },
    methods:{
          // axios.get(`${baseUrl}/posts/${this.user.id}`).then(({data})=>{
          //   this.posts = data
          // }).catch(({ response })=> {
          //
          // })
    },
    created() {
      this.postId = this.$route.params.id
      if (localStorage.getItem("userInfo")) {
        const data = JSON.parse(localStorage.getItem("userInfo"))
        this.user = data.user

      }
    },
    mounted() {
      axios.get(`${baseUrl}/singlepost/${this.postId}`).then(({data})=>{
        this.post = data
        console.log(this.post)
      }).catch(({ response })=>{

      })
      axios.get(`${baseUrl}/post/${this.postId}/comments`).then(({data})=>{
        this.comments = data.data
        console.log(this.comments)
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