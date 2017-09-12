<template>
  <router-view></router-view>
</template>

<script>
export default {
  name: 'app'
}
</script>

<style>
@import 'assets/material-icon.css';
body, html {
  height: 100%;
  overflow: hidden;
}
body {
  min-height: 100%;
  margin: 0;
  position: relative;
  -webkit-tap-highlight-color: transparent;
  -webkit-touch-callout: none;
  -webkit-text-size-adjust: 100%;
  -ms-text-size-adjust: 100%;
  -moz-osx-font-smoothing: grayscale;
  -webkit-font-smoothing: antialiased;
  color: rgba(0,0,0,.87);
  font-family: Roboto,Noto Sans,Noto,sans-serif;
}
</style>
