<template>
  <div class="home">
    <van-dialog v-model:show="show" title="请选择你的生日！" @confirm="onConfirm">
      <van-datetime-picker v-model="currentDate" :show-toolbar="false" type="date" :min-date="minDate" :max-date="maxDate" :visible-item-count="4" />
    </van-dialog>
    <p v-if="showDoor">sdfuigsdfibsdfbsi</p>
    <div class="flex">
      <svg class="heart left" viewBox="0 0 40 70" version="1.1">
        <path class="left-half-heart" stroke-width="2" fill="#f60" d="M60,30 a30,30 0 0,1 0,60 L0,90 0,30 a30,30 0 0,1 60,0"></path>
      </svg>
      <svg class="heart right" viewBox="0 0 40 70" version="1.1">
        <path class="right-half-heart" stroke-width="2" fill="#f60" d="M60,30 a30,30 0 0,1 0,60 L0,90 0,30 a30,30 0 0,1 60,0"></path>
      </svg>
    </div>
  </div>
</template>

<script lang="ts">
import { ref } from 'vue';
import $ from 'jquery';

export default {
  setup() {
    const currentDate = ref(new Date(1995, 0, 1));
    const show = ref(false);
    const minDate = ref(new Date(1990, 0, 1));
    const maxDate = ref(new Date());
    const showDoor = ref(false);

    const onConfirm = () => {
      const date = currentDate.value;
      const year = date.getFullYear();
      const month = date.getMonth();
      const day = date.getDate();
      if (year === 1996 && month === 2 && day === 4) {
        showDoor.value = true;
      }
    };

    let leftMove = true;
    let rightMove = true;
    const v = 1;
    let canTouch = true;
    const animo = () => {
      const leftTop = $('.heart.left').offset()?.top || 0;
      const leftLeft = $('.heart.left').offset()?.left || 0;
      const rightTop = $('.heart.right').offset()?.top || 0;
      const rightLeft = $('.heart.right').offset()?.left || 0;
      let nextLeftTop = leftTop;
      let nextLeftLeft = leftLeft;
      let nextRightTop = rightTop;
      let nextRightLeft = rightLeft;

      // debugger;

      const y = leftTop - rightTop;
      const topArrow = y > 0 ? 1 : -1;
      if (y > 2 * v || y < -2 * v) {
        nextLeftTop = leftTop - v * topArrow;
        nextRightTop = rightTop + v * topArrow;
      } else {
        nextLeftTop = leftTop - 0.5 * y;
        nextRightTop = rightTop + 0.5 * y;
      }

      const x = leftLeft - rightLeft + ($('.heart.left').width() || 0) / 2 + ($('.heart.right').width() || 0) / 2;
      const leftArrow = x > 0 ? 1 : -1;
      if (x > 2 * v || x < -2 * v) {
        nextLeftLeft = leftLeft - v * leftArrow;
        nextRightLeft = rightLeft + v * leftArrow;
      } else {
        console.log(x, leftArrow, leftLeft, rightLeft, $('.heart.left').width(), $('.heart.right').width());

        nextLeftLeft = leftLeft - 0.5 * x;
        nextRightLeft = rightLeft + 0.5 * x;
      }

      if (leftMove) {
        $('.heart.left').offset({
          top: nextLeftTop,
          left: nextLeftLeft,
        });
      }

      if (rightMove) {
        $('.heart.right').offset({
          top: nextRightTop,
          left: nextRightLeft,
        });
      }

      if (leftTop !== nextLeftTop || leftLeft !== nextLeftLeft || rightTop !== nextRightTop || rightLeft !== nextRightLeft) {
        requestAnimationFrame(animo);
      } else {
        canTouch = false;
        $('.heart.left').animate(
          {
            left: document.body.offsetWidth / 2 - ($('.heart.left').width() || 0),
            top: (document.body.offsetHeight - ($('.heart.left').height() || 0)) / 2,
          },
          1000
        );
        $('.heart.right').animate(
          {
            left: document.body.offsetWidth / 2,
            top: (document.body.offsetHeight - ($('.heart.right').height() || 0)) / 2,
          },
          1000
        );
      }
    };
    requestAnimationFrame(animo);

    setTimeout(() => {
      const touchmoveFn = (e: any) => {
        if (!canTouch) {
          return;
        }
        console.log(e);
        console.log(e.touches[0].pageX, e.touches[0].pageY);
        $(e.currentTarget).offset({
          top: e.touches[0].pageY,
          left: e.touches[0].pageX,
        });
      };

      $('.heart.left').on('touchstart', (e) => {
        leftMove = false;
      });
      $('.heart.left').off('touchmove', touchmoveFn).on('touchmove', touchmoveFn);
      $('.heart.left').on('touchend', () => {
        leftMove = true;
      });
      $('.heart.right').on('touchstart', (e) => {
        rightMove = false;
      });
      $('.heart.right').off('touchmove', touchmoveFn).on('touchmove', touchmoveFn);
      $('.heart.right').on('touchend', () => {
        rightMove = true;
      });
    });

    return {
      show,
      currentDate,
      minDate,
      maxDate,
      onConfirm,
      showDoor,
    };
  },
};
</script>
<style lang="less">
.home {
  height: 100%;
  width: 100%;
  display: flex;
}
.heart {
  width: 80px;
  height: 140px;
}
.left-half-heart {
  transform: rotate(-45deg) scale(0.7) translate(5px, 0);
  transform-origin: 50% 50%;
}
.right-half-heart {
  transform: rotate(-45deg) scale(0.7) translate(-36px, -40px);
  transform-origin: 50% 50%;
}
.flex {
  display: flex;
  flex: 1;
  width: 100%;
  position: relative;
}
.heart.left {
  position: absolute;
  left: 0;
  top: 50%;
  margin-top: -70px;
}
.heart.right {
  position: absolute;
  right: 0;
  top: 10%;
  margin-top: -70px;
}
</style>
