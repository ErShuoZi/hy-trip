<template>
  <div class="swipe">
    <van-swipe class="swipe-list" :autoplay="3000" indicator-color="white">
      <template v-for="(item, index) in swiperData" :key="index">
        <van-swipe-item class="item">
          <img :src="item.url" alt="" />
        </van-swipe-item>
      </template>
      <template #indicator="{ active }">
        <div class="indicator">
          <template v-for="(value, key) in swiperGroup" :key="key">
            <span
              class="item"
              :class="{
                active: swiperData[active]?.enumPictureCategory == key,
              }"
            >
              <span class="text"> {{ getName(value[0].title) }}</span>
              <span
                class="count"
                v-if="swiperData[active]?.enumPictureCategory == key"
              >
                {{ getCategoryIndex(swiperData[active]) }} / {{ value.length }}
              </span>
            </span>
          </template>
        </div>
      </template>
    </van-swipe>
  </div>
</template>

<script setup>
const props = defineProps({
  swiperData: {
    type: Array,
    default: () => [],
  },
});

// 对数据进行转换
// {
//   2:[],
//   3:[],
//   4:[],
// }

// 思路一:
const swiperGroup = {};
for (const item of props.swiperData) {
  swiperGroup[item.enumPictureCategory] = [];
}
for (const item of props.swiperData) {
  const valueArr = swiperGroup[item.enumPictureCategory];
  valueArr.push(item);
}

// 思路二:
// const swiperGroup = {};
// for (const item of props.swiperData) {
//   let valueArr = swiperGroup[item.enumPictureCategory];
//   if (!valueArr) {
//     valueArr = [];
//     swiperGroup[item.enumPictureCategory] = valueArr;
//   } else {
//     valueArr.push(item);
//   }
// }

// 定义转换数据方法一
// const getName = (name) => {
//   return name.replace("：", "").replace("【", "").replace("】", "");
// };
// 定义转换数据方法二
const nameReg = /【(.*?)】/i;
const getName = (name) => {
  const results = nameReg.exec(name);
  return results[1];
};

// {
//   "2":[],
//   "3":[]
// }

const getCategoryIndex = (item) => {
  const valueArray = swiperGroup[item.enumPictureCategory];
  return valueArray.findIndex((data) => data === item) + 1;
};
</script>

<style lang="scss" scoped>
.swipe {
  position: relative;
  .swipe-list {
    .item {
      img {
        width: 100%;
      }
    }
    .indicator {
      position: absolute;
      bottom: 5px;

      right: 0;
      display: flex;
      background: rgba(0, 0, 0, 0.5);
      color: #fff;
      border-radius: 5px;
      .item {
        margin: 0 3px;
        &.active {
          padding: 0 3px;
          border-radius: 5px;
          background-color: #fff;
          color: #333;
        }
      }
    }
  }
}
</style>
