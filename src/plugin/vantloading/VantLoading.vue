<template>
	<div class="van-loading" v-show="loading">
		<Loading size="100px" type="spinner" vertical text-size="60px" color="#0094ff">加载中...</Loading>
	</div>
</template>

<script>
  import {Loading} from 'vant';
  import {mapState} from 'vuex';
  export default {
    name: "VantLoading",
	  components:{
      Loading
	  },
	  computed:{
      ...mapState([
        'loading'
      ])
	  }
	  
  }
</script>

<style scoped lang="scss">
	.van-loading {
		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;
		display: flex;
		justify-content: center;
	}

</style>