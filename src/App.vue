<template>
  <div id="app">
    <DrawGrid />
  </div>
</template>

<script>
import DrawGrid from './components/DrawGrid.vue';

export default {
  name: 'App',
  components: {
    DrawGrid,
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin: 24px 0;
}
</style>
