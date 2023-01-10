<template>
  <div class="home">
    <home-nav-bar></home-nav-bar>
    <home-banner></home-banner>
    <home-loaction ref="locationRef"></home-loaction>
    <home-categories></home-categories>
    <search-bar
      v-if="isShowSearchBar"
      :start-date="nowDate"
      :end-date="leaveDate"
      @search-bar-btn-click="searchBtnClick"
      class="search"
    ></search-bar>
    <home-content></home-content>
  </div>
</template>

<script setup>
import { ref, watch, toRaw, onMounted } from "vue";
import HomeNavBar from "./cpns/home-nav-bar.vue";
import HomeBanner from "./cpns/home-banner.vue";
import HomeLoaction from "./cpns/home-loaction.vue";
import HomeCategories from "./cpns/home-categories.vue";
import SearchBar from "@/components/search-bar/search-bar.vue";
import HomeContent from "./cpns/home-content.vue";
import { useScroll, scrollTop } from "@/hooks/useScroll";
import useHome from "@/stores/modules/home";
import useMainStore from "@/stores/modules/main";
import { storeToRefs } from "pinia";
const HomeStore = useHome();
HomeStore.fetchHomeSuggestsAction();
HomeStore.fetchHomeCategoryAction();
HomeStore.fetchHouseListAction();

const mainStore = useMainStore();
const { nowDate, leaveDate } = storeToRefs(mainStore);

useScroll(() => {
  HomeStore.fetchHouseListAction();
});

// 搜索框显示控制
const isShowSearchBar = ref(false);
watch(scrollTop, (newTop) => {
  isShowSearchBar.value = newTop > 450;
});

const locationRef = ref();
onMounted(() => {
  console.log();
});
const searchBtnClick = () => {
  // 通知子组件修改日期
  locationRef.value.showCalendar = true;
};
</script>

<style lang="scss" scoped>
.home {
  /* height: calc(100vh - 50px); */
  /* overflow-y: auto; */
  .search {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    z-index: 10;
    background-color: #fff;
    height: 45px;
    padding: 16px 16px 10px;
  }
}
</style>
