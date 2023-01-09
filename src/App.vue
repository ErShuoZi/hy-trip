<template>
  <div class="app">
    <router-view></router-view>
    <!-- 方案一:路由meta -->
    <tab-bar v-if="route.meta.showTabBar" :tabbarData="tabbarData"></tab-bar>
    <!-- <tab-bar :tabbarData="tabbarData"></tab-bar> -->
  </div>
</template>

<script setup>
import TabBar from "./components/tab-bar/tabbar.vue";
import tabbarData from "./assets/data/tabbar";
import { useRoute } from "vue-router";
import { watch, ref, computed } from "vue";

// useRoute总是拿到当前活跃路由对象
const route = useRoute();
// let isShowTabBar = computed(() => {
//   return route.meta.showTabBar;
// });
</script>

<style lang="scss" scoped></style>
