<template>
  <div class="time-line">
    <div class="mask"></div>
    <van-steps class="steps" direction="vertical" inactive-color="#f60" active-color="rgb(245 170 246)" :active="list.length - 1">
      <van-step v-for="(item, index) in list" v-bind:key="index">
        <TextCard v-if="item.type === CardType.Text" :data="item.data" />
      </van-step>
    </van-steps>
  </div>
</template>
<script lang="ts">
import { ref, onMounted } from 'vue';
import $ from 'jquery';
import TextCard from './components/TextCard.vue';
import dayjs from 'dayjs';

enum CardType {
  Text,
}

interface ListDataItem {
  type: CardType;
  data: TextCardData;
}

interface TextCardData {
  date: dayjs.Dayjs;
  title: string;
  text: string | Element;
  img?: string;
}

const listData: ListDataItem[] = [
  {
    type: CardType.Text,
    data: {
      date: dayjs('2021-7-19'),
      title: '认识de第一天',
      text: '这一天，很幸运认识你',
      img: require('../../assets/img/初识.jpg'),
    },
  },
  {
    type: CardType.Text,
    data: {
      date: dayjs('2021-7-21'),
      title: '第一次开始互道晚安',
      text: '第一次开始互道晚安',
      img: require('../../assets/img/晚安.jpg'),
    },
  },
  {
    type: CardType.Text,
    data: {
      date: dayjs('2021-7-26'),
      title: '第一次开始互道早安',
      text: '第一次开始互道早安',
      img: require('../../assets/img/早安.jpg'),
    },
  },
  {
    type: CardType.Text,
    data: {
      date: dayjs('2021-7-27'),
      title: '第一次主动约你',
      text: '第一次主动约你',
      img: require('../../assets/img/第一次约你.jpg'),
    },
  },
  {
    type: CardType.Text,
    data: {
      date: dayjs('2021-7-30'),
      title: '第一次透露心迹',
      text: '第一次透露心迹',
      img: require('../../assets/img/第一次表露心迹.jpg'),
    },
  },
  {
    type: CardType.Text,
    data: {
      date: dayjs('2021-8-1'),
      title: '第一次见面',
      text: '第一次见面',
      img: require('../../assets/img/第一次见面.jpg'),
    },
  },
  {
    type: CardType.Text,
    data: {
      date: dayjs('2021-8-3'),
      title: '第一次想见你',
      text: '第一次想见你',
      img: require('../../assets/img/第一次想见你.jpg'),
    },
  },
  {
    type: CardType.Text,
    data: {
      date: dayjs('2021-8-7'),
      title: '第一次表白',
      text: '第一次表白',
      img: require('../../assets/img/第一次表白.jpg'),
    },
  },
  {
    type: CardType.Text,
    data: {
      date: dayjs('2021-8-7'),
      title: '再次表白被拒',
      text: '再次表白被拒',
      img: require('../../assets/img/再次表白被拒.jpg'),
    },
  },
  {
    type: CardType.Text,
    data: {
      date: dayjs(),
      title: '故事未完待续！！！',
      text: '故事未完待续！！！',
    },
  },
];

export default {
  components: {
    TextCard,
  },
  setup() {
    const list = ref(listData);
    onMounted(() => {
      $('.mask').fadeOut(1000);
    });
    return { list, CardType };
  },
};
</script>
<style lang="less" scoped>
.time-line {
  height: 100%;
}
.steps {
  min-height: 100%;
  background-image: url('../../assets/bg2.jpg');
  background-size: 100%;
  background-repeat: repeat;
}
.bg {
  position: absolute;
  z-index: -1;
  left: 0;
  top: 0;
  height: 100%;
  width: 100%;
}
.mask {
  width: 100%;
  height: 100%;
  z-index: 98;
  position: absolute;
  top: 0;
  left: 0;
  background: #fff;
  opacity: 1;
}
</style>
