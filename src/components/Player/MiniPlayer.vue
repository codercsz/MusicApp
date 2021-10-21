<template>
	<transition
					:css="false"
					@enter ='enter'
					@leave=" leave"
	>
			<div class="mini-player" v-show="this.isShowMiniPlayer">
				<div class="player-wrapper">
					<div class="player-left" @click="showNormalPlayer" >
						<img :src="currentSongs.picUrl" alt="" ref="imgTrans">
						<div class="player-title">
							<h3>{{currentSongs.name}}</h3>
							<p>{{currentSongs.singer}}</p>
						</div>
					</div>
					<div class="player-right">
						<div class="play" @click="play" ref="play"></div>
						<div class="list" @click.stop="showListPlayer"></div>
					</div>
				</div>
			</div>
	</transition>
</template>

<script>
    import {mapActions,mapGetters} from 'vuex';
    import Velocity from 'velocity-animate'
    import 'velocity-animate/velocity.ui'
    export default {
        name: "MiniPlayer",
        methods: {
            
            ...mapActions([
                'setFullScreen',
                'setMiniPlayer',
                'setIsPlaying',
                "setListPlayer"

            ]),
            showNormalPlayer() {
                this.setFullScreen(true);
                this.setMiniPlayer(false);
            },
            showListPlayer() {
                this.setListPlayer(true);
            },
            enter(el, done) {
                Velocity(el, 'transition.bounceUpIn', {duration: 500}, function () {
                    done();
                })
            },
            leave(el, done) {
                Velocity(el, 'transition.bounceDownOut', {duration: 500}, function () {
                    done();//需要定义一个回调函数，并且调用done()函数告诉它动画已经执行完毕，如果没有这样的话，后面的动画将不会被执行
                })
            },
            play() {
                this.setIsPlaying(!this.isPlaying);
            }

        },
        computed: {
            ...mapGetters([
                'isShowMiniPlayer',
                'isPlaying',
                "currentSongs"
            ])
        },
		    watch:{
            isPlaying(newValue, oldValue) {
                if (newValue) {
                    this.$refs.play.classList.add('active');
                    this.$refs.imgTrans.classList.add('active')
                } else {
                    this.$refs.play.classList.remove('active');
                    this.$refs.imgTrans.classList.remove('active');
                }

            }
		    }
    }
</script>

<style scoped lang="scss">
	@import "../../assets/css/variable";
	@import "../../assets/css/mixin";
	.mini-player {
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		box-sizing: border-box;
		height: 150px;
		display: flex;
		align-items: center;
		justify-content: space-between;
		padding: 0 30px;
		@include bg_color();
		.player-wrapper{
			width: 100%;
			height: 100%;
			@include bg_color();
			display: flex;
			align-items: center;
			justify-content: space-between;
		}
		img {
			width: 120px;
			height: 120px;
			border-radius: 50%;
			animation: sport 3s linear infinite; //linear:线性  infinite:无限循环
			animation-play-state: paused; //设置默认状态为停止
			&.active {
				animation-play-state: running;  //激活后设置为循环转动
			}
		}
		.player-left{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			.player-title {
				display: flex;
				flex-direction: column;
				margin-left: 10px;
				@include font_color();
				h3{
					@include clamp(1);
				}
				p {
					margin-top: 10px;
				}
			}
		}
		.player-right{
			display: flex;
			justify-content: flex-start;
			align-items: center;
			div{
				width: 80px;
				height: 80px;
			}
			.play {
				@include bg_img("../../assets/images/play");
				&.active {
					@include bg_img("../../assets/images/pause");
				}
			}
			.list{
				width: 120px;
				height: 120px;
				@include bg_img("../../assets/images/list")
			}
		
		}
	}
	@keyframes sport {
		from{
			transform: rotate(0deg);
		}
		to{
			
			transform: rotate(360deg);
		}
	}

</style>