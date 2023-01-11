<template>
  <div class="detail top-page" ref="detailRef">
    <tab-control
      ref="tabControRef"
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
    <div class="footer">
      <img src="@/assets/img/detail/icon_ensure.png" alt="" />
      <div class="text">弘源旅途, 永无止境!</div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, watch } from "vue";
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
const tabControRef = ref();
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
  if (!value) return;
  const name = value.$el.getAttribute("name");
  sectionEls.value[name] = value.$el;
};

let isClick = false;
let currentDistance = -1;
const tabItemClick = (index) => {
  let distance = sectionEls.value[titles.value[index]].offsetTop;
  if (index !== 0) {
    distance = distance - 44;
  }
  isClick = true;
  currentDistance = distance;
  detailRef.value.scrollTo({
    top: distance,
    behavior: "smooth",
  });
};

// 页面滚动时,匹配对应索引
watch(scrollTop, (newValue) => {
  if (newValue === currentDistance) {
    isClick = false;
  }
  if (isClick) return;
  // 1.获取所有区域的offsetTops
  const els = Object.values(sectionEls.value);
  const values = els.map((el) => el.offsetTop);

  // 2.根据newValue 匹配索引
  let index = values.length - 1;

  for (let i = 0; i < values.length; i++) {
    if (values[i] > newValue + 44) {
      index = i - 1;
      break;
    }
  }
  if (tabControRef.value) {
    tabControRef.value.currentIndex = index;
    isClick = false;
  }
});
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
.footer {
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  height: 120px;

  img {
    width: 123px;
  }

  .text {
    margin-top: 12px;
    font-size: 12px;
    color: #7688a7;
  }
}
</style>
