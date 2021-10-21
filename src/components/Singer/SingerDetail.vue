<template>
	<div class="singer-detail">
		我是歌手详情页
	</div>
</template>

<script>
  import {getSingerDetail} from "../../api/index";
  export default {
    name: "SingerDetail",
    created() {
      getSingerDetail({id: this.$route.params.id}).then(value => {
        console.log(value);
      });
    }
  }
</script>

<style scoped lang="scss">
	@import "../../assets/css/variable";
	@import "../../assets/css/mixin";
	.singer-detail {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		@include bg_color();
		
	}


</style>