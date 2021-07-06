<template>
  <!-- component -->
  <div class="p-4 m-4">

    <!-- component -->
    <div class="text-gray-900 bg-gray-200">
      <div class="p-4 flex">
        <h1 class="text-3xl">
          Users
        </h1>
      </div>
      <div class="flex ml-7 my-2">
        <div>
          <input v-model="filter" type="search" class="bg-purple-white shadow rounded border-0 p-3" placeholder="Search by name...">

        </div>
        <div class="pin-r pin-t  ml-4 text-purple-lighter">
          <input class="bg-purple-white shadow rounded border-0 p-3" type="number" v-model="pageSize" placeholder="Enter page size">
        </div>
      </div>



      <div class="px-3 py-4 flex justify-center">

        <table class="w-full text-md bg-white shadow-md rounded mb-4">
          <tbody>
          <tr class="border-b">
            <th @click="sort('name')" class="text-left p-3 px-5">Name</th>
            <th @click="sort('email')" class="text-left p-3 px-5">Email</th>
            <th @click="sort('website')" class="text-left p-3 px-5">Website</th>
          </tr>

          <tr v-for="(user, key) in sortedUser" :key="key" class="border-b hover:bg-orange-100">
            <td class="p-3 px-5">
              <router-link :to="{ name: 'userprofile', params: { id: user.id }}">{{user.name}}</router-link>
            </td>
            <td class="p-3 px-5">{{user.email}}</td>
            <td class="p-3 px-5">
              {{user.website}}
            </td>
          </tr>
          </tbody>
        </table>
      </div>
    </div>
  </div>
  <div class="m-4">
    <button class="ml-7 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-500 dark:focus:bg-gray-700">
      Next
    </button>
    <button class="ml-7 px-4 py-2 font-medium tracking-wide text-white capitalize transition-colors duration-200 transform bg-blue-600 rounded-md dark:bg-gray-800 hover:bg-blue-500 dark:hover:bg-gray-700 focus:outline-none focus:bg-blue-500 dark:focus:bg-gray-700">
      Back
    </button>
  </div>
</template>

<script>
import axios from "axios";
const baseUrl = "http://127.0.0.1:8000/api"
export default {
  name: "UserInfo",
  data() {
    return {
      access_token: null,
      users: [],
      currentSort: 'name',
      currentSortDir: 'asc',
      pageSize: 5,
      currentPage: 1,
      filter: ''
    }
  },
  methods:{

    sort:function(s) {
      if(s === this.currentSort) {
        this.currentSortDir = this.currentSortDir==='asc'?'desc':'asc';
      }
      this.currentSort = s;
    },
    nextPage:function() {
      if((this.currentPage*this.pageSize) < this.users.length) this.currentPage++;
    },
    prevPage:function() {
      if(this.currentPage > 1) this.currentPage--;
    }
  },
  computed:{
    sortedUser:function() {
      return this.filteredUser.sort((a,b) => {
        let modifier = 1;
        if(this.currentSortDir === 'desc') modifier = -1;
        if(a[this.currentSort] < b[this.currentSort]) return -1 * modifier;
        if(a[this.currentSort] > b[this.currentSort]) return 1 * modifier;
        return 0;
      }).filter((row, index, search) => {
        let start = (this.currentPage-1)*this.pageSize;
        let end = this.currentPage*this.pageSize;
        if(index >= start && index < end)
          return true;
      });
    },
    filteredUser() {
      return this.users.filter(c => {
        if(this.filter === '') return true;
        return c.name.toLowerCase().indexOf(this.filter.toLowerCase()) >= 0;
      })
    }
  },
  watch: {
    filter() {
      console.log('reset to p1 due to filter');
      this.currentPage = 1;
    }
  },
  created() {
    if (localStorage.getItem("userInfo")) {
      const data = JSON.parse(localStorage.getItem("userInfo"))
      this.access_token = data.access_token
    }
    axios.get(`${baseUrl}/auth/user`,{
      headers: {
        Authorization: `Bearer ${this.access_token}`
      }
    }).then(({data}) => {
      this.users = data
    }).catch(({ response })=>{
      if(response){
        window.location.href = "/login";
      }
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
