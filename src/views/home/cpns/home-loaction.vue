<template>
  <div>
    <div class="location item">
      <div class="city" @click="cityChange">{{ currentCity.cityName }}</div>
      <div class="position" @click="positionClick">
        <span class="text">我的位置</span>
        <img src="@/assets/img/home/icon_location.png" alt="" />
      </div>
    </div>
    <!-- data range -->
    <div class="date-range item" @click="showCalendar = true">
      <div class="start">
        <span class="text">入住</span>
        <span class="date">{{ nowDate }}</span>
      </div>
      <div class="stay">共{{ stayCount }}晚</div>
      <div class="end">
        <span class="text">离店</span>
        <span class="date">{{ leaveDate }}</span>
      </div>
    </div>
    <van-calendar
      v-model:show="showCalendar"
      type="range"
      @confirm="onConfirm"
      :formatter="formatter"
      color="#ff9854"
      :round="false"
      :show-confirm="false"
    />
    <div class="price-counter bottom-gray-line item">
      <div class="start">价格不限</div>
      <div class="end">人数不限</div>
    </div>
    <div class="keywords bottom-gray-line item">关键字/位置/民宿名</div>

    <!-- 热门建议 -->
    <div class="hot-suggests">
      <template v-for="(item, index) in hotSuggests" :key="index">
        <div
          class="item"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color,
          }"
        >
          {{ item.tagText.text }}
        </div>
      </template>
    </div>

    <!-- 搜索按钮 -->
    <div class="item search-btn">
      <div class="btn" @click="searchBtnClick">开始搜索</div>
    </div>
  </div>
</template>

<script setup>
import useCity from "@/stores/modules/city";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import { ref } from "vue";
import { formatMonthDay, getDiffDate } from "@/utils/format_date";
import dayjs from "dayjs";
import useHome from "@/stores/modules/home";
const router = useRouter();
const cityChange = () => {
  router.push("/city");
};
// 位置/城市点击
const positionClick = () => {
  navigator.geolocation.getCurrentPosition(
    (res) => {
      console.log(res);
    },
    (err) => {
      console.log(err);
    }
  );
};

// 当前城市
const cityStore = useCity();
const { currentCity } = storeToRefs(cityStore);

// 日期范围处理
const nowDate = ref(formatMonthDay(new Date()));
const leaveDate = ref(formatMonthDay(dayjs(new Date()).add(1, "day")));
const stayCount = ref(getDiffDate(new Date(), dayjs(new Date()).add(1, "day")));
const showCalendar = ref(false);
const formatter = (day) => {
  if (day.type === "start") {
    day.bottomInfo = "入住";
  } else if (day.type === "end") {
    day.bottomInfo = "离店";
  }
  return day;
};
const onConfirm = (value) => {
  const selectStartDate = value[0];
  const selectEndDate = value[1];
  nowDate.value = formatMonthDay(selectStartDate);
  leaveDate.value = formatMonthDay(selectEndDate);
  showCalendar.value = false;
  stayCount.value = getDiffDate(selectStartDate, selectEndDate);
};

// const arr = [1, 2, 3, [1, 2, 3, 4, 5, 6, 7]];
// const newArr = Array.from(new Set(arr.flat(2))); // [1,2,3,4,5,6,7]
// const ArrA = [1, 2, 3];
// const ArrB = [1, 2, 3, 4, 5, 6];
// const newArr = ArrB.filter((item) => {
//   return !ArrA.includes(item);
// });

// 热门建议
const HomeStore = useHome();
HomeStore.fetchHomeSuggestsAction();
HomeStore.fetchHomeCategoryAction();
const { hotSuggests, categories } = storeToRefs(HomeStore);

// 搜索按钮
const searchBtnClick = () => {
  router.push({
    path: "/search",
    query: {
      startDate: nowDate.value,
      endDate: leaveDate.value,
      currentCity: currentCity.value.cityName,
    },
  });
};
</script>

<style lang="scss" scoped>
.item {
  padding: 0 20px;
  height: 44px;
}
.location {
  display: flex;
  justify-content: space-between;
  align-items: center;

  .city {
    flex: 1;
    color: #333;
    font-size: 15px;
  }
  .position {
    width: 74px;
    display: flex;
    justify-content: center;
    align-items: center;
    .text {
      position: relative;
      top: 2px;
      font-size: 12px;
      color: #666;
    }
    img {
      width: 18px;
      height: 18px;

      margin-left: 6px;
    }
  }
}

.date-range {
  display: flex;
  justify-content: space-between;
  height: 44px;
  margin-top: 10px;
  .text {
    font-size: 12px;
    color: #666;
    text-align: left;
  }
  .date {
    font-size: 15px;
    color: #333;
  }
  .start {
    display: flex;
    flex-direction: column;

    height: 44px;
  }
  .stay {
    flex: 1;
    text-align: center;
    line-height: 44px;
    font-size: 12px;
    color: #666;
  }
  .end {
    display: flex;
    flex-direction: column;
    min-width: 30%;
  }
}

.price-counter {
  display: flex;
  justify-content: space-between;
  height: 44px;
  margin-top: 10px;
  color: #999;
}
.keywords {
  height: 44px;
  margin-top: 10px;
  color: #999;
}
.hot-suggests {
  display: flex;
  flex-wrap: wrap;
  margin: 10px 0;
  padding: 0 20px;

  .item {
    height: auto;
    padding: 3px 8px;
    margin: 4px;
    font-size: 12px;
    border-radius: 4px;
  }
}
.search-btn {
  .btn {
    width: 342px;
    height: 38px;
    max-height: 50px;
    font-weight: 500;
    font-size: 18px;
    line-height: 38px;
    text-align: center;
    border-radius: 20px;
    color: #fff;
    background-image: var(--theme-linear-gradient),
      linear-gradient(90deg, #fa8c1d, #fcaf3f);
  }
}
</style>
