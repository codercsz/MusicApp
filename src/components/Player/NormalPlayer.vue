<template>
<!--    <div class="normal-player" v-show="this.$store.getters.isFullScreen">-->
<!--    <div class="normal-player" v-show="this.isFullScreen">-->
<!--利用钩子函数实现动画 -->
	<transition
					:css="false"
					@enter ='enter'
					@leave=" leave"
	>
		<div class="normal-player" v-show="this.test">  <!--取别名-->
			<div class="player-warpper">
				<PlayerHeader></PlayerHeader>
				<PlayerMiddle :currentTime="currentTime"></PlayerMiddle>
				<PlayerBottom :totalTime="totalTime" :currentTime="currentTime"></PlayerBottom>
			</div>
			<div class="bg-img">
				<img :src="currentSong.picUrl" alt="">
			</div>
		</div>
	</transition>
	
</template>

<script>
    import PlayerHeader from "./PlayerHeader";
    import PlayerMiddle from "./PlayerMiddle";
    import PlayerBottom from "./PlayerBottom";
    import Velocity from 'velocity-animate'
		import 'velocity-animate/velocity.ui'
    import {mapGetters,mapActions} from "vuex";
    export default {
        name: "NormalPlayer",
        components: {
            PlayerHeader,
            PlayerMiddle,
            PlayerBottom
        },
        computed: {
            //在computed计算函数中将store中的getter函数中方法隐射成局部方法，也就是说不用this.$store.getter.XXX()获取数据
            // ，直接使用this.XXX(isFullScrent = 次方法名需要跟getters的方法对应，也可以取别名)
            /*...mapGetters([
								'isFullScreen'
						])*/
            //取别名
            ...mapGetters({
                    test: 'isFullScreen',
                    currentSong: "currentSongs"
                }
            )
        },
        methods: {
            ...mapActions([
                "getSongLyric"
            ]),
            enter(el, done) {
                Velocity(el, 'transition.shrinkIn', {duration: 500}, function () {
                    done();
                })
            },
            leave(el, done) {
                Velocity(el, 'transition.shrinkOut', {duration: 500}, function () {
                    done();//需要定义一个回调函数，并且调用done()函数告诉它动画已经执行完毕，如果没有这样的话，后面的动画将不会被执行
                })
            }
        },
		    watch:{
            currentSong(newValue, oldValue) {
                if (newValue.id === undefined) {
                    return;
                }
                this.getSongLyric(newValue.id);
            }
		    },
        props: {
            totalTime: {
                type: Number,
                default: 0,
                required: true    //是否为必传
            },
            currentTime: {
                type: Number,
                default: 0,
                required: true    //是否为必传
            }
        }
    }
</script>

<style scoped lang="scss">
	@import "../../assets/css/variable";
	@import "../../assets/css/mixin";
	.normal-player {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		@include bg_sub_color();
		.player-warpper {
			width: 100%;
			height: 100%;
			
		}
		.bg-img {
			z-index: -999;
			position: absolute;
			left: 0;
			top: 0;
			width: 100%;
			height: 100%;
			img{
				height: 100%;
				position: absolute;
				left: 50%;
				top: 50%;
				transform: translate(-50%, -50%);
				filter: blur(50px);
			}
		}
	}

</style>

