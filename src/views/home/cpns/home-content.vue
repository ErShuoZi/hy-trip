<template>
  <div class="content">
    <h2 class="title">热门精选</h2>
    <div class="list">
      <template v-for="(item, index) in houseList" :key="item.data.cityId">
        <div class="item">
          <HomeContentListItemType3
            v-if="item.discoveryContentType === 3"
            :itemData="item.data"
            @click="itemClick(item)"
          />
          <HomeContentListItemType9
            v-else-if="item.discoveryContentType === 9"
            :itemData="item.data"
            @click="itemClick(item)"
          />
        </div>
      </template>
    </div>
  </div>
</template>

<script setup>
import useHome from "@/stores/modules/home";
import { storeToRefs } from "pinia";
import HomeContentListItemType3 from "@/components/house-item-v3/home-content-list-item-type-3.vue";
import HomeContentListItemType9 from "@/components/house-item-v9/home-content-list-item-type-9.vue";
import { useRouter } from "vue-router";

const HomeStore = useHome();
const { houseList } = storeToRefs(HomeStore);

const router = useRouter();
const itemClick = (item) => {
  // 跳转
  router.push(`/detail/${item.data.houseId}`);
};
</script>

<style lang="scss" scoped>
.content {
  padding: 10px 8px;
  .title {
    font-size: 22px;
    padding: 10px;
  }
  .list {
    display: flex;
    flex-wrap: wrap;
    .item {
      width: 50%;
    }
  }
}
</style>
