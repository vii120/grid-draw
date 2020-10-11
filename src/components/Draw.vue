<template>
  <div>
    <div class="draw-btn" @click="drawLighting">DRAW!</div>
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
  </div>
</template>

<script>
export default {
  name: 'Draw',
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
      this.timer = setInterval(this.checkNext, 800);
    },
    drawLighting() {
      let count = 0;
      clearInterval(this.timer);
      const target = Math.floor(Math.random() * (this.listLen - 1));
      this.timer = setInterval(() => {
        count += 1;
        this.randomNext();
        if (this.currentIdx === target && count >= this.listLen * 2) {
          // this.defaultLighting();
          clearInterval(this.timer);
        }
      }, 300);
    },
  },
  mounted() {
    this.defaultLighting();
  },
};
</script>
<style lang="scss" scoped>
.draw-btn {
  width: 100px;
  margin: 12px auto;
  padding: 12px;
  border-radius: 24px;
  background-color: #ffcc33;
}
.grid-wrapper {
  @include flexCenter;
  flex-wrap: wrap;
  width: 600px;
  margin: auto;
  background-color: wheat;
}
.grid-item {
  width: 180px;
  height: 180px;
  margin: 10px;
  @include flexCenter;
  background-color: #fcfcfc;
  &.active {
    background-color: teal;
    color: #fff;
  }
}
</style>
