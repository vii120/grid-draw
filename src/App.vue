<template>
  <div id="app">
    <Draw />
  </div>
</template>

<script>
import Draw from './components/Draw.vue';

export default {
  name: 'App',
  components: {
    Draw,
  },
};
</script>

<style>
#app {
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  margin-top: 60px;
}
</style>
