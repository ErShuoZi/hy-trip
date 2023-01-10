<template>
  <div class="detail">
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 轮播 -->
    <div class="main" v-if="mainPart.topModule">
      <detail-swiper :swiper-data="mainPart.topModule.housePicture.housePics" />
      <detail-infos :top-infos="mainPart.topModule"></detail-infos>
      <detail-faclity
        name="设施"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
      />
      <detail-land-lord
        name="房东"
        :ref="getSectionRef"
        :landlord="mainPart.dynamicModule.landlordModule"
      />
      <detail-comment
        name="评论"
        :comment="mainPart.dynamicModule.commentModule"
      />
      <detail-notice
        name="须知"
        :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
      />
      <detail-map :position="mainPart.dynamicModule.positionModule" />
      <detail-intro :price-intro="mainPart.introductionModule" />
    </div>
  </div>
</template>

<script setup>
import { useRoute, useRouter } from "vue-router";
import useDetailStore from "@/stores/modules/detail";
import { storeToRefs } from "pinia";
import DetailSwiper from "./cpns/detail-swiper.vue";
import DetailInfos from "./cpns/detail-infos.vue";
import DetailFaclity from "./cpns/detail-faclity.vue";
import DetailLandLord from "./cpns/detail-landlord.vue";
import DetailComment from "./cpns/detail-comment.vue";
import DetailNotice from "./cpns/detail-notice.vue";
import DetailIntro from "./cpns/detail-intro.vue";
import DetailMap from "./cpns/detail-map.vue";

const route = useRoute();
const id = route.params.id;
// 页面数据
const DetailStore = useDetailStore();
DetailStore.fetchDetailPageDataAction(id);
const { mainPart } = storeToRefs(DetailStore);
console.log(mainPart);

// 返回按钮
const router = useRouter();
const onClickLeft = () => {
  router.back();
};
</script>

<style lang="scss" scoped></style>
