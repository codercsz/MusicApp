<template>
  <div id="app">
    <Header></Header>
    <Tabbar></Tabbar>
	  <!--include:指定的组件会被保存状态,其他的不会-->
	  <keep-alive include="Singer,Search">
      <router-view></router-view>
	  </keep-alive>
	  <Player></Player>
	  <VantLoading></VantLoading>
  </div>
</template>
<script>

  import Header from "./components/Header";
  import Tabbar from "./components/Tabbar";
  import Player from "./views/Player";
  import VantLoading from "./plugin/vantloading/VantLoading";
  export default {
      components: {
          Header,
          Tabbar,
          Player,
        VantLoading
	      
      },
    methods:{

    }

  }
</script>

<style scoped lang="scss">

</style>
