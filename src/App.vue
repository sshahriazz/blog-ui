<template>
  <div class="bg-gray-200">
  <nav-bar-component />
  <div class="ml-10 mr-10 p-4 mx-auto">
    <router-view />
  </div>
  <footer-component />
  </div>
</template>

<script>
import FooterComponent from "./components/FooterComponent.vue";
import NavBarComponent from "./components/NavBarComponent.vue";

export default {
  components: { FooterComponent, NavBarComponent },
};
</script>

<style></style>
