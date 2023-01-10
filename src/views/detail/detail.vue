<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control
      :titles="titles"
      @tab-itemclick="tabItemClick"
      v-if="isShowTopTabBar"
      class="tabs"
    />
    <van-nav-bar
      title="房屋详情"
      left-text="旅途"
      left-arrow
      @click-left="onClickLeft"
    />
    <!-- 轮播 -->
    <div class="main" v-if="mainPart.topModule" v-memo="[mainPart]">
      <detail-swiper :swiper-data="mainPart.topModule.housePicture.housePics" />
      <detail-infos
        :ref="getSectionRef"
        name="描述"
        :top-infos="mainPart.topModule"
      ></detail-infos>
      <detail-faclity
        :ref="getSectionRef"
        name="设施"
        :house-facility="mainPart.dynamicModule.facilityModule.houseFacility"
      />
      <detail-land-lord
        :ref="getSectionRef"
        name="房东"
        :landlord="mainPart.dynamicModule.landlordModule"
      />
      <detail-comment
        :ref="getSectionRef"
        name="评论"
        :comment="mainPart.dynamicModule.commentModule"
      />
      <detail-notice
        :ref="getSectionRef"
        name="须知"
        :order-rules="mainPart.dynamicModule.rulesModule.orderRules"
      />
      <detail-map
        name="周边"
        :ref="getSectionRef"
        :position="mainPart.dynamicModule.positionModule"
      />
      <detail-intro :price-intro="mainPart.introductionModule" />
    </div>
  </div>
</template>

<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";
import useDetailStore from "@/stores/modules/detail";
import { storeToRefs } from "pinia";
import TabControl from "@/components/tab-control/tab-control.vue";
import DetailSwiper from "./cpns/detail-swiper.vue";
import DetailInfos from "./cpns/detail-infos.vue";
import DetailFaclity from "./cpns/detail-faclity.vue";
import DetailLandLord from "./cpns/detail-landlord.vue";
import DetailComment from "./cpns/detail-comment.vue";
import DetailNotice from "./cpns/detail-notice.vue";
import DetailIntro from "./cpns/detail-intro.vue";
import DetailMap from "./cpns/detail-map.vue";
import useScroll from "@/hooks/useScroll";

const route = useRoute();
const id = route.params.id;
// 页面数据
const DetailStore = useDetailStore();
DetailStore.fetchDetailPageDataAction(id);
const { mainPart } = storeToRefs(DetailStore);

// 返回按钮
const router = useRouter();
const onClickLeft = () => {
  router.back();
};

// control detail page  top tabbar block/display
const detailRef = ref();
const { scrollTop } = useScroll(detailRef);
const isShowTopTabBar = computed(() => {
  return scrollTop.value > 300;
});

// listen top bar item click event

// const landLordRef = ref();

// const sectionEls = [];
// const getSectionRef = (value) => {
//   sectionEls.push(value.$el);
// };
// {"描述":el,"设施:el}
const sectionEls = ref({});
const titles = computed(() => Object.keys(sectionEls.value));
const getSectionRef = (value) => {
  const name = value.$el.getAttribute("name");
  sectionEls.value[name] = value.$el;
};

const tabItemClick = (index) => {
  // const key = Object.keys(sectionEls.value)[index];
  // const el = sectionEls.value[key];
  let instance = sectionEls.value[titles.value[index]].offsetTop;
  if (index !== 0) {
    instance = instance - 44;
  }
  detailRef.value.scrollTo({
    top: instance,
    behavior: "smooth",
  });
};
</script>

<style lang="scss" scoped>
.tabs {
  position: fixed;
  top: 0;
  left: 0;
  right: 0;
  z-index: 10;
  background: #fff;
}
</style>
