<template>
  <div id="app">
    <router-view></router-view>
  </div>
</template>

<script>

export default {
  name: 'app',
}
</script>

<style>
#app {
  font-family: "Lantinghei SC","Open Sans",Arial,"Hiragino Sans GB","Microsoft YaHei","微软雅黑",STHeiti,"WenQuanYi Micro Hei",SimSun,sans-serif!important;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
table{
  border: 1px solid #ccc;
  text-align: center;
  width: 100%;
}
table th,table td{
  padding: 6px 4px;
}
</style>
