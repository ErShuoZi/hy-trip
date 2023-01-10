<template>
  <div class="detail-infos">
    <div class="name">{{ topInfos.houseName }}</div>
    <div class="tags">
      <template v-for="(item, index) in topInfos.houseTags" :key="index">
        <span
          class="item"
          v-if="item.tagText"
          :style="{
            color: item.tagText.color,
            background: item.tagText.background.color,
          }"
          >{{ item.tagText.text }}</span
        >
      </template>
    </div>
    <div class="comment">
      <div class="left">
        <span class="score">{{ topInfos.commentBrief?.overall }}</span>
        <span class="title">{{ topInfos.commentBrief?.scoreTitle }}</span>
        <span class="brief">{{ topInfos.commentBrief?.commentBrief }}</span>
      </div>
      <div class="right">
        <span class="count">
          {{ topInfos.commentBrief?.totalCount }}条评论
          <van-icon name="arrow" />
        </span>
      </div>
    </div>

    <div class="position">
      <div class="left">
        {{ topInfos.nearByPosition?.address }}
      </div>
      <div class="right">地图·周边</div>
    </div>
  </div>
</template>

<script setup>
const props = defineProps({
  topInfos: {
    type: Object,
    default: () => ({}),
  },
});
</script>

<style lang="scss" scoped>
.detail-infos {
  padding: 10px;
  .name {
    font-weight: 700;
    font-size: 20px;
    color: #333;
    text-align: justify;
    line-height: 24px;
    overflow: hidden;
    margin-bottom: 6px;
  }
  .tags {
    font-size: 12px;

    .item {
      margin: 1px 2px;
      padding: 2px 3px;
    }
  }
  .comment {
    display: flex;
    justify-content: space-between;
    margin-top: 5px;
    height: 40px;
    line-height: 40px;
    background-color: #f3f6f9;
    .left {
      .score {
        font-size: 20px;
      }
      .title {
        margin-left: 3px;
        font-size: 12px;
      }
      .brief {
        color: #999;
        font-size: 12px;
        margin-left: 3px;
      }
    }
    .right {
      font-size: 12px;
      color: var(--primary-color);
    }
  }
  .position {
    display: flex;
    justify-content: space-between;
    margin-top: 10px;
    background-color: #f3f6f9;
    height: 40px;
    line-height: 40px;
    .left {
      font-weight: 500;
    }
    .right {
      font-size: 12px;
      color: var(--primary-color);
    }
  }
}
</style>
