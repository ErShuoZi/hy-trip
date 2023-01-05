<template>
  <div class="app">
    <router-view></router-view>
    <tab-bar :tabbarData="tabbarData"></tab-bar>
  </div>
</template>

<script setup>
import TabBar from "./components/tab-bar/tabbar.vue";
import tabbarData from "./assets/data/tabbar";
</script>

<style lang="scss" scoped></style>
