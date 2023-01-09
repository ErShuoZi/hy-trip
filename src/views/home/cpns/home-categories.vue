<template>
  <div class="home-categories">
    <template v-for="(item, index) in categories" :key="item.id">
      <div class="item">
        <img :src="item.pictureUrl" alt="" />
        <span>{{ item.title }}</span>
      </div>
    </template>
  </div>
</template>

<script setup>
import useHome from "@/stores/modules/home";
import { storeToRefs } from "pinia";

const HomeStore = useHome();
const { categories } = storeToRefs(HomeStore);
</script>

<style lang="scss" scoped>
.home-categories {
  display: flex;
  overflow-x: auto;
  &::-webkit-scrollbar {
    width: 0px;
  }
  .item {
    width: 80px;
    display: flex;
    flex-direction: column;
    align-items: center;
    flex-shrink: 0;
    text-align: center;
    img {
      width: 32px;
      height: 32px;
    }
  }
}
</style>
