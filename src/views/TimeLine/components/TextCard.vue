<template>
  <div class="text-card" :style="{ background: bgColor }">
    <p class="title-row">
      <van-icon name="clock-o" />
      <span class="date">{{ data.date.format('YY年M月D日') }}</span>
      <span class="title">{{ data.title }}</span>
    </p>
    <div class="content">
      <p>{{ data.text }}</p>
      <my-image v-if="!!data.img" :src="data.img" />
    </div>
  </div>
</template>
<script lang="ts">
import { ref } from 'vue';
import MyImage from '@/components/MyImage/MyImage.vue';

export default {
  components: { MyImage },
  props: ['data'],
  setup() {
    const active = ref(1);
    const bgColor = `rgb(${255 - Math.floor(Math.random() * 50)}, ${255 - Math.floor(Math.random() * 50)}, ${255 - Math.floor(Math.random() * 50)})`;
    return { active, bgColor };
  },
};
</script>
<style lang="less" scoped>
.text-card {
  background: rgb(209, 233, 248);
  border-radius: 5px;
  color: #555;
  text-align: left;
  border: solid 1px #ccc;
  box-shadow: 1px 1px 5px #aaa;
  overflow: hidden;
}
p {
  margin: 0;
  padding: 0;
}
.title-row {
  text-align: left;
  padding: 5px;
  border-bottom: 1px solid rgb(180, 217, 247);
  display: flex;
  background-color: #fff;
  vertical-align: bottom;
}
.date {
  margin: 0 5px;
  font-size: 12px;
  flex: none;
}
.title {
  font-size: 18px;
  line-height: 24px;
  overflow: hidden;
  text-overflow: ellipsis;
  white-space: nowrap;
}
.content {
  padding: 12px;
}
</style>
