<template>
  <div :class="{ mask: isPlaying }">
    <div class="btn-box">
      <div
        class="btn draw-btn"
        :class="{ disabled: isPlaying }"
        @click="drawLighting"
      >
        DRAW
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
.mask {
  pointer-events: none;
}
.btn-box {
  @include flexCenter;
  margin-bottom: 0.1rem;
  .btn {
    width: 1rem;
    padding: 0.1rem;
    margin: 0 0.1rem;
    border-radius: 0.2rem;
    color: #fff;
    cursor: pointer;
    &.disabled {
      background-color: grey;
      cursor: not-allowed;
    }
  }
  .draw-btn {
    background-color: #ffaf00;
  }
}
.grid-wrapper {
  @include flexCenter;
  flex-wrap: wrap;
  width: 4.5rem;
  height: 4.5rem;
  margin: auto;
}
.grid-item {
  width: 30%;
  height: 30%;
  margin: 1%;
  @include flexCenter;
  background-color: #fcfcfc;
  &.active {
    background-color: teal;
    color: #fff;
  }
}
.result-box {
  margin-top: 0.2rem;
  font-weight: bold;
}
</style>
