<template>
  <div class="loading" v-show="isLoading" @click="handleLoadingShow">
    <div class="bg">
      <img src="@/assets/img/home/full-screen-loading.gif" alt="" />
    </div>
  </div>
</template>

<script setup>
import useMainStore from "@/stores/modules/main";
import { storeToRefs } from "pinia";

const mainStore = useMainStore();
const { isLoading } = storeToRefs(mainStore);

const handleLoadingShow = () => {
  isLoading.value = false;
};
</script>

<style lang="scss" scoped>
.loading {
  position: fixed;
  left: 0;
  right: 0;
  top: 0;
  bottom: 0;
  display: flex;
  justify-content: center;
  align-items: center;
  z-index: 999;
  background-color: rgba(0, 0, 0, 0.3);
  .bg {
    width: 104px;
    height: 104px;
    display: flex;
    justify-content: center;
    align-items: center;
    background: url("@/assets/img/home/loading-bg.png") 0 0 / 100% 100%;
    img {
      width: 70px;
      height: 70px;
      margin-bottom: 8px;
    }
  }
}
</style>
