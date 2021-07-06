<template>
<div v-if="success" class="text-green-700 bg-white rounded shadow text-center p-4 m-2">
  <p>{{success}}</p>
</div>
    <section class="w-full max-w-2xl px-6 py-4 mx-auto bg-white rounded-md shadow-md dark:bg-gray-800">
      <router-link class="px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600" to="/dashboard" >Go to Your post</router-link>
      <h2 class="text-3xl font-semibold text-center text-gray-800 dark:text-white">Update Your Post</h2>
      <p class="mt-3 text-center text-gray-600 dark:text-gray-400">Change values below to update post</p>
      <form @submit.prevent="updatePost">
        <div class="mt-6">
          <div class="items-center -mx-2 md:flex">
            <div class="w-full mx-2">
              <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Title</label>

              <input v-model="post.title"  class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="text">
            </div>
            <div class="w-full mx-2">
              <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Slug</label>

              <input v-model="post.slug"  class="block w-full px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring" type="text">
            </div>

          </div>

          <div class="w-full mt-4">
            <label class="block mb-2 text-sm font-medium text-gray-600 dark:text-gray-200">Description</label>

            <textarea v-model="post.body"  class="block w-full h-40 px-4 py-2 text-gray-700 bg-white border border-gray-300 rounded-md dark:bg-gray-800 dark:text-gray-300 dark:border-gray-600 focus:border-blue-500 dark:focus:border-blue-500 focus:outline-none focus:ring"></textarea>
          </div>

          <div class="flex justify-center mt-6">
            <button type="submit" class="px-4 py-2 text-white transition-colors duration-200 transform bg-gray-700 rounded-md hover:bg-gray-600 focus:outline-none focus:bg-gray-600">Submit</button>
          </div>

        </div>
      </form>
    </section>

</template>

<script>
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api"
export default {
  name: "UpdatePost",
  data() {
    return {
      user: null,
      postId: null,
      post:{

      },
      success: null
    }
  },
  methods: {
    updatePost() {
      axios.put(`${baseUrl}/post/${this.postId}/update`,{
        title: this.post.title,
        slug: this.post.slug,
        body: this.post.body
      }).then(response => {
        this.success = "Post updated successfully"
      }).catch(error => {
        this.success = "update failed."
      })
    }
  },
  created() {
    this.postId = this.$route.params.id

    if (localStorage.getItem("userInfo")) {
      const data = JSON.parse(localStorage.getItem("userInfo"))
      this.user = data.user
      console.log(this.user)
    }
    axios.get(`${baseUrl}/singlepost/${this.postId}`).then(({data})=>{
      this.post = data
    }).catch(({ response })=>{
      console.error(response)
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

