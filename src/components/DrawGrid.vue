<template>
  <div :class="{ mask: isPlaying }">
    <div class="btn-box">
      <div
        class="btn draw-btn"
        :class="{ disabled: isPlaying }"
        @click="drawLighting"
      >
        <span>d</span>
        <span>r</span>
        <span>a</span>
        <span>w</span>
      </div>
    </div>
    <div class="grid-wrapper">
      <div
        class="grid-item"
        :class="{ active: currentIdx === key }"
        v-for="(item, key) in gridList"
        :key="`grid_${key}`"
      >
        {{ item.content }}
      </div>
    </div>
    <div class="result-box" v-if="resultValue">
      LATEST RESULT: {{ resultValue }}
    </div>
  </div>
</template>

<script>
import { delay } from '@/utils';

const speed = {
  default: 800,
  active: 180,
};
export default {
  name: 'DrawGrid',
  data() {
    return {
      currentIdx: 0,
      gridList: [
        { content: '柳丁綠茶' },
        { content: '百香QQ' },
        { content: '珍珠奶綠' },
        { content: '冬瓜檸檬' },
        { content: '多多綠茶' },
        { content: '鳳梨冰茶' },
        { content: '黑糖珍奶' },
        { content: '鮮柚綠茶' },
        { content: '可可鮮奶' },
      ],
      timer: null,
      resultValue: null,
      isPlaying: false,
    };
  },
  computed: {
    listLen() {
      return this.gridList.length;
    },
  },
  methods: {
    checkNext() {
      this.currentIdx += 1;
      if (!this.gridList[this.currentIdx]) {
        this.currentIdx = 0;
      }
    },
    randomNext() {
      const randomDelta = Math.floor(Math.random() * (this.listLen - 2)) + 1;
      this.currentIdx = (this.currentIdx + randomDelta) % this.listLen;
      console.log(this.currentIdx);
    },
    defaultLighting() {
      clearInterval(this.timer);
      this.timer = setInterval(this.checkNext, speed.default);
    },
    drawLighting() {
      this.isPlaying = true;
      let count = 0;
      clearInterval(this.timer);
      const target = Math.floor(Math.random() * (this.listLen - 1));
      this.timer = setInterval(async () => {
        count += 1;
        this.randomNext();
        if (this.currentIdx === target && count >= this.listLen) {
          clearInterval(this.timer);
          this.resultValue = this.gridList[target].content;
          await delay(3000);
          this.isPlaying = false;
          this.checkNext();
          this.defaultLighting();
        }
      }, speed.active);
    },
  },
  mounted() {
    this.defaultLighting();
  },
};
</script>
<style lang="scss" scoped>
$main-color: #fff2d6;
$shadow-color: #ffaf00;

.mask {
  pointer-events: none;
}
.btn-box {
  @include flexCenter;
  .btn {
    padding: 0.1rem;
    cursor: pointer;
    font-family: 'Pacifico', cursive;
  }
  .draw-btn {
    font-size: 0.7rem;
    color: $main-color;
    text-shadow: 0 0 12px $shadow-color, 0 0 20px $shadow-color,
      0 0 50px $main-color;
    &:not(.disabled) span:nth-child(2) {
      animation: blink 3s linear both infinite;
    }
    &.disabled {
      filter: grayscale(1) brightness(0.7);
      cursor: not-allowed;
    }
  }
}
.grid-wrapper {
  @include flexCenter;
  justify-content: space-between;
  flex-wrap: wrap;
  width: 4.5rem;
  height: 4.5rem;
  margin: 0.1rem auto;
}
.grid-item {
  width: calc(30% - 6px);
  height: calc(30% - 6px);
  margin: 1%;
  color: $main-color;
  font-weight: bold;
  text-shadow: 2px 2px #000, 0 0 8px $shadow-color;
  @include flexCenter;
  border-radius: 12px;
  border: 3px solid;
  box-shadow: 0 0 10px 2px $shadow-color, inset 0 0 10px 2px $shadow-color;
  &.active {
    color: #f8b3b3;
    text-shadow: 2px 2px #000, 0 0 8px indianred;
    box-shadow: 0 0 10px 2px indianred, inset 0 0 10px 2px indianred;
  }
}
.result-box {
  margin-top: 0.2rem;
  font-weight: bold;
}
</style>
