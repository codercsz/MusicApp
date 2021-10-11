<template>
  <div id="app">
    <Header></Header>
    <Tabbar></Tabbar>
    <router-view></router-view>
  </div>
</template>
<script>

  import Header from "./components/Header";
  import Tabbar from "./components/Tabbar";
  export default {
    components:{
      Header,
      Tabbar
    },
    methods:{

    }

  }
</script>

<style scoped lang="scss">

</style>
