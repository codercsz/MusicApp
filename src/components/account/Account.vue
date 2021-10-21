<template>
	<transition appear>
		<div class="account">
			<AccountHeader @switchItem="switchItem"></AccountHeader>
			<AccountBottom :switchNum="switchNum"></AccountBottom>
		</div>
	</transition>
	
</template>

<script>
	import AccountHeader from "./AccountHeader";
	import AccountBottom from "./AccountBottom";
	import Player from "../../views/Player";
    export default {
        name: "Account",
		    components:{
            AccountHeader,
            AccountBottom,
            Player
		    },
        data() {
            return{
                switchNum: 0
            }
        },
		    methods:{
            switchItem(num){
                this.switchNum = num;
            }
		    }
    }
</script>

<style scoped lang="scss">
	@import "../../assets/css/variable";
	@import "../../assets/css/mixin";
	.account {
		position: fixed;
		left: 0;
		right: 0;
		top: 0;
		bottom: 0;
		@include bg_sub_color()
	}
	.v-enter{
		transform: translateX(100%);
	}
	.v-enter-to{
		transform: translateX(0%);
	}
	.v-enter-active{
		transition: transform .5s;
	}
	.v-leave{
		transform: translateX(0%);
	}
	.v-leave-to{
		transform: translateX(100%);
	}
	.v-leave-active{
		transition: transform .5s;
	}
	

</style>