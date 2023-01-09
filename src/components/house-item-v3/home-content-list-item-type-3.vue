<template>
  <div class="type-3">
    <div class="item-inner">
      <div class="cover">
        <img :src="itemData.image.url" alt="" />
      </div>
      <div class="infos">
        <div class="location">
          <img src="@/assets/img/home/location.png" alt="" />
          <span class="address">{{ itemData.location }}</span>
        </div>
        <div class="summary">{{ itemData.summaryText }}</div>
        <div class="house-name">{{ itemData.houseName }}</div>
        <div class="price">
          <div class="new">¥{{ itemData.finalPrice }}</div>
          <div class="old">¥{{ itemData.productPrice }}</div>
          <div class="tips">{{ itemData.priceTipBadge.text }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { computed } from "vue";
const props = defineProps({
  itemData: {
    type: Object,
    default: () => ({}),
  },
});
const itemScore = computed(() => {
  return props.itemData.commentScore * 1;
});
</script>

<style lang="scss" scoped>
.type-3 {
  .item-inner {
    margin: 5px;
    background: #fff;
    border-radius: 5px;
    overflow: hidden;
    .cover {
      img {
        width: 100%;
      }
    }
    .infos {
      padding: 8px 10px;
      .location {
        img {
          position: relative;
          top: 3px;
          left: -6px;
          width: 10px;
          height: 10px;
        }
        .address {
          color: #666;
          font-size: 12px;
        }
      }

      .summary {
        color: #666;
        font-size: 12px;
      }
      .house-name {
        margin: 5px 0;
        overflow: hidden;
        text-overflow: ellipsis;
        display: -webkit-box;
        -webkit-line-clamp: 2;
        -webkit-box-orient: vertical;
      }
      .price {
        display: flex;
        justify-content: space-between;
        margin-top: 10px;
        .new {
          color: #ff9645;
          font-size: 14px;
        }
        .old {
          margin: 0 3px;
          color: #999;
          font-size: 12px;
          text-decoration: line-through;
        }
        .tips {
          background-image: linear-gradient(270deg, #f66, #ff9f9f);
          color: #fff;
          padding: 0 5px;
          border-radius: 14px;
        }
      }
    }
  }
}
</style>
