<template>
  <div class="group-item">
    <van-index-bar :index-list="indexList" :sticky="false">
      <van-index-anchor class="title" index="热门城市" />
      <div class="hot-cities">
        <template v-for="(hotCity, key, index) in hotCities">
          <div @click="cityClick(hotCity)" class="hot-cities-name">
            {{ hotCity.cityName }}
          </div>
        </template>
      </div>
      <template v-for="(group, index) in cities" :key="index">
        <van-index-anchor class="title" :index="group.group" />
        <div class="list">
          <template v-for="(city, indey) in group.cities" :key="indey">
            <van-cell
              class="city-name"
              :title="city.cityName"
              @click="cityClick(city)"
            />
          </template>
        </div>
      </template>
    </van-index-bar>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
import { useRouter } from "vue-router";
import useCity from "@/stores/modules/city";

const props = defineProps({
  cities: {
    type: Array,
    default: () => [],
  },
  hotCities: {
    type: Array,
    default: () => [],
  },
});

// 动态索引
const indexList = computed(() => {
  const list = props.cities.map((item) => item.group);
  list.unshift("#");
  return list;
});

// const getIndexList = (tempList) => {
//   return tempList.map((item) => {
//     return item.group;
//   });
// };
// watch(
//   props.cities,
//   (newValue, oldValue) => {
//     indexList = getIndexList(newValue);
//     indexList.unshift("#");
//   },
//   { immediate: true }
// );

// 城市点击
const router = useRouter();
const cityStore = useCity();
const cityClick = (city) => {
  cityStore.currentCity = city;
  router.back();
};
</script>

<style lang="scss" scoped>
.group-item {
  .hot-cities {
    display: flex;
    justify-content: space-evenly;
    flex-wrap: wrap;
    padding: 10px;
    padding-right: 25px;
    .hot-cities-name {
      margin: 5px 0;
      width: 70px;
      height: 28px;
      border-radius: 14px;
      font-size: 12px;
      color: #000;
      background-color: #fff4ec;
      text-align: center;
      line-height: 28px;
    }
  }
}
</style>
