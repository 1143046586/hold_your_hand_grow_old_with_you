<template>
  <div class="image-box">
    <img :src="src" alt="" />
  </div>
</template>

<script>
export default {
  props: ['src'],
};
</script>

<style lang="less" scoped>
.image-box,
img {
  max-width: 100%;
}
.image-box {
  margin-top: 10px;
}
</style>
