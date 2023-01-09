<template>
  <div class="home">
    <home-nav-bar></home-nav-bar>
    <home-banner></home-banner>
    <home-loaction></home-loaction>
    <home-categories></home-categories>
    <home-content></home-content>
    <button @click="loadMore">加载更多</button>
  </div>
</template>

<script setup>
import HomeNavBar from "./cpns/home-nav-bar.vue";
import HomeBanner from "./cpns/home-banner.vue";
import HomeLoaction from "./cpns/home-loaction.vue";
import HomeCategories from "./cpns/home-categories.vue";
import HomeContent from "./cpns/home-content.vue";

import useHome from "@/stores/modules/home";
const HomeStore = useHome();
HomeStore.fetchHomeSuggestsAction();
HomeStore.fetchHomeCategoryAction();
HomeStore.fetchHouseListAction();

const loadMore = () => {
  HomeStore.fetchHouseListAction();
};
</script>

<style lang="scss" scoped>
.home {
  height: calc(100vh - 50px);
  overflow-y: auto;
}
</style>
