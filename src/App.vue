<template>
  <div id="app">
    <Header></Header>
    <Tabbar></Tabbar>
	  <keep-alive>
      <router-view></router-view>
	  </keep-alive>
	  <Player></Player>
  </div>
</template>
<script>

  import Header from "./components/Header";
  import Tabbar from "./components/Tabbar";
  import Player from "./views/Player";
  export default {
      components: {
          Header,
          Tabbar,
          Player
      },
    methods:{

    }

  }
</script>

<style scoped lang="scss">

</style>
