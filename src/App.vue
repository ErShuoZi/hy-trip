<template>
  <div class="app">
    <router-view v-slot="props">
      <keep-alive include="home">
        <component :is="props.Component" />
      </keep-alive>
    </router-view>

    <!-- 方案一:路由meta -->
    <tab-bar v-show="route.meta.showTabBar" :tabbarData="tabbarData"></tab-bar>
    <!-- <tab-bar :tabbarData="tabbarData"></tab-bar> -->
    <loading></loading>
  </div>
</template>

<script setup>
import TabBar from "./components/tab-bar/tabbar.vue";
import tabbarData from "./assets/data/tabbar";
import Loading from "@/components/loading/loading.vue";
import { useRoute } from "vue-router";
import { watch, ref, computed } from "vue";

// useRoute总是拿到当前活跃路由对象
const route = useRoute();
// let isShowTabBar = computed(() => {
//   return route.meta.showTabBar;
// });
</script>

<style lang="scss" scoped></style>
