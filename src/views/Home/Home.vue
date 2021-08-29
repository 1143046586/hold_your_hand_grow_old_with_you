<template>
  <div class="home-page">
    <van-dialog v-model:show="show" title="请选择你的生日！" @confirm="onConfirm">
      <van-datetime-picker v-model="currentDate" :show-toolbar="false" type="date" :min-date="minDate" :max-date="maxDate" :visible-item-count="4" />
    </van-dialog>
    <div class="flex" v-show="showHeart">
      <svg class="heart left" viewBox="0 0 40 70" version="1.1">
        <path class="left-half-heart" stroke-width="2" fill="#f7d7f3" d="M60,30 a30,30 0 0,1 0,60 L0,90 0,30 a30,30 0 0,1 60,0"></path>
      </svg>
      <svg class="heart right" viewBox="0 0 40 70" version="1.1">
        <path class="right-half-heart" stroke-width="2" fill="#f7d7f3" d="M60,30 a30,30 0 0,1 0,60 L0,90 0,30 a30,30 0 0,1 60,0"></path>
      </svg>
    </div>
    <img class="bg" src="../../assets/bg1.jpg" alt="" />
  </div>
</template>

<script lang="ts">
import { ref, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import $ from 'jquery';
import md5 from 'blueimp-md5';
export default {
  setup() {
    const currentDate = ref(new Date(1995, 0, 1));
    const show = ref(true);
    const minDate = ref(new Date(1990, 0, 1));
    const maxDate = ref(new Date());
    const showHeart = ref(false);
    const router = useRouter();

    const onConfirm = () => {
      const date = currentDate.value;
      console.log();
      if (md5(date.toLocaleDateString('en')) === 'dd3caf35e0f61e6823f7286454458289') {
        showHeart.value = true;

        // 吸引动画
        let leftMove = true;
        let rightMove = true;
        const v = 2;
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

          const y = leftTop - rightTop;
          const x = leftLeft - rightLeft + ($('.heart.left').width() || 0) / 2 + ($('.heart.right').width() || 0) / 2;
          let vX = 1;
          let vY = 1;
          if (Math.abs(y) > Math.abs(x)) {
            vY = v;
            vX = (Math.abs(x) * v) / Math.abs(y);
          } else {
            vX = v;
            vY = (Math.abs(y) * v) / Math.abs(x);
          }
          const topArrow = y > 0 ? 1 : -1;
          if (y > 2 * vY || y < -2 * vY) {
            nextLeftTop = leftTop - vY * topArrow;
            nextRightTop = rightTop + vY * topArrow;
          } else {
            nextLeftTop = leftTop - 0.5 * y;
            nextRightTop = rightTop + 0.5 * y;
          }

          const leftArrow = x > 0 ? 1 : -1;
          if (x > 2 * vX || x < -2 * vX) {
            nextLeftLeft = leftLeft - vX * leftArrow;
            nextRightLeft = rightLeft + vX * leftArrow;
          } else {
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

          if (Math.abs(leftTop - nextLeftTop) < 1 || Math.abs(leftLeft - nextLeftLeft) < 1 || Math.abs(rightTop - nextRightTop) < 1 || Math.abs(rightLeft - nextRightLeft) < 1) {
            requestAnimationFrame(animo);
          } else {
            canTouch = false;
            console.log((document.body.offsetHeight - ($('.heart.left').height() || 0)) / 2);

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
              1000,
              () => {
                router.push('/time');
              }
            );
          }
        };
        requestAnimationFrame(animo);

        // 拖拽功能
        $('.heart.left').on('touchstart', (e) => {
          leftMove = false;
          const leftTop = $('.heart.left').offset()?.top || 0;
          const leftLeft = $('.heart.left').offset()?.left || 0;
          const startX = e.touches[0].pageX;
          const startY = e.touches[0].pageY;
          const touchmoveFn = (e: any) => {
            if (!canTouch) {
              return;
            }
            const moveX = e.touches[0].pageX - startX;
            const moveY = e.touches[0].pageY - startY;
            $(e.currentTarget).offset({
              top: leftTop + moveY,
              left: leftLeft + moveX,
            });
          };
          const touchEndFn = (e: any) => {
            leftMove = true;
            $('.heart.left').off('touchmove', touchmoveFn);
            $('.heart.left').off('touchend', touchEndFn);
          };
          $('.heart.left').on('touchmove', touchmoveFn);
          $('.heart.left').on('touchend', touchEndFn);
        });

        $('.heart.right').on('touchstart', (e) => {
          rightMove = false;
          const rightTop = $('.heart.right').offset()?.top || 0;
          const rightLeft = $('.heart.right').offset()?.left || 0;
          const startX = e.touches[0].pageX;
          const startY = e.touches[0].pageY;
          const touchmoveFn = (e: any) => {
            if (!canTouch) {
              return;
            }
            const moveX = e.touches[0].pageX - startX;
            const moveY = e.touches[0].pageY - startY;
            $(e.currentTarget).offset({
              top: rightTop + moveY,
              left: rightLeft + moveX,
            });
          };
          const touchEndFn = (e: any) => {
            rightMove = true;
            $('.heart.right').off('touchmove', touchmoveFn);
            $('.heart.right').off('touchend', touchEndFn);
          };
          $('.heart.right').on('touchmove', touchmoveFn);
          $('.heart.right').on('touchend', touchEndFn);
        });
      }
    };

    onMounted(() => {
      $('.bg').offset({
        left: 0,
        top: (document.body.offsetHeight - ($('.heart.right').height() || 0) - 700) / 2,
      });
    });

    return {
      show,
      currentDate,
      minDate,
      maxDate,
      onConfirm,
      showHeart,
    };
  },
};
</script>
<style lang="less">
.home-page {
  height: 100%;
  width: 100%;
  display: flex;
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
    overflow: hidden;
  }
  .heart.left {
    position: absolute;
    left: 0;
    top: 50%;
    margin-top: -70px;
    z-index: 99;
  }
  .heart.right {
    position: absolute;
    right: 0;
    top: 10%;
    margin-top: -70px;
    z-index: 99;
  }
  img.bg {
    position: absolute;
    left: 0;
    top: -15%;
    z-index: 98;
    width: 100%;
  }
}
</style>
