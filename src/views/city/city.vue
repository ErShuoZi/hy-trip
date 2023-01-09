<template>
  <div class="city top-page">
    <div class="top">
      <van-search
        v-model="searchValue"
        placeholder="城市/区域/位置"
        shape="round"
        show-action
        @cancel="cancelSearch"
      />
      <van-tabs v-model:active="tabActive" color="#ff9874">
        <template v-for="(item, key, index) in allCity">
          <van-tab :name="key" :title="item.title"></van-tab>
        </template>
      </van-tabs>
    </div>
    <div class="content">
      <template v-for="(value, key, index) in allCity">
        <city-group-item v-show="key === tabActive" :cities="value.cities"  :hot-cities="value.hotCities"/>
      </template>
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";
import useCity from "@/stores/modules/city";
import { storeToRefs } from "pinia";
import CityGroupItem from "./cpns/city-group-item.vue";

//搜索框
const searchValue = ref("");
const router = useRouter();
const cancelSearch = () => {
  router.back();
};

// tab切换
const tabActive = ref();
// 网络请求
const useCityStore = useCity();
useCityStore.fetchAllCityActions();
const { allCity } = storeToRefs(useCityStore);
// 获取选中标签
const currentGroup = computed(() => allCity.value[tabActive.value]);
console.log(currentGroup);
</script>

<style lang="scss" scoped>
.city {
  --van-tabs-line-height: 30px;

  /* 内容区域滚动做法一: */
  /* .top {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
  }
  .content {
    margin-top: 98px;
  } */

  .top {
    position: relative;
    z-index: 2;
  }

  /* 方式二: */
  .content {
    height: calc(100vh - 84px);
    overflow-y: auto;
  }
}
</style>
