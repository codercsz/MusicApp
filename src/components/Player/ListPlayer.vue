<template>
	<transition
					:css="false"
					@enter ='enter'
					@leave=" leave"
	>
		<div class="list-player" v-show="this.isShowListPlayer">
		<div class="player-warpper">
			<div class="player-top">
				<div class="left">
					<div class="mode" @click="mode" ref="mode"></div>
					<p v-if="this.modeType===0">顺序播放</p>
					<p v-else-if="this.modeType===1">单曲播放</p>
					<p v-else>随机播放</p>
				</div>
				<div class="right">
					<div class="del" @click="delAll"></div>
				</div>
			</div>
			<div class="player-middle">
				<ScrollView ref="scrollView">
					<ul class="item" ref="play">
						<li v-for="(value,index) in songs" :key="value.id" @click="selectMusic(index)">
							<div class="item-left">
								<div class="play" @click.stop="play" v-show="currentIndex===index"></div>
								<p>{{value.name}}</p>
							</div>
							<div class="item-right">
								<div class="like" @click.stop="like(value)" :class="{'active':isLike(value)}"></div>
								<div class="close" @click.stop="del(index)"></div>
							</div>
						</li>
					</ul>
				</ScrollView>
				
			</div>
			<div class="player-bottom" >
				<h3 @click="closeListPlayer">关闭</h3>
			</div>
		</div>
</div>
	</transition>
</template>

<script>
	import ScrollView from "../ScrollView";
  import Velocity from "velocity-animate";
  import {mapGetters, mapActions} from 'vuex';
  import modeType from "../../store/modeType";
    export default {
        name: "ListPlayer",
        components: {
            ScrollView
        },
        methods: {
            ...mapActions([
                'setIsPlaying',
                'setModeType',
                "setListPlayer",
                "setDelSong",
                "setCurrentIndex",
		            "setFavoriteList"
            ]),
            closeListPlayer() {
                this.setListPlayer(!this.isShowListPlayer)
            },
            enter(el, done) {
                Velocity(el, 'transition.slideUpIn', {duration: 500}, function () {
                    done();
                })
            },
            leave(el, done) {
                Velocity(el, 'transition.slideDownOut', {duration: 500}, function () {
                    done();//需要定义一个回调函数，并且调用done()函数告诉它动画已经执行完毕，如果没有这样的话，后面的动画将不会被执行
                })
            },
            play() {
                this.setIsPlaying(!this.isPlaying);
            },
            mode() {
                if (this.modeType === modeType.loop) {
                    this.setModeType(modeType.one)
                } else if (this.modeType === modeType.one) {
                    this.setModeType(modeType.random);
                } else if (this.modeType === modeType.random) {
                    this.setModeType(modeType.loop);
                }
            },
            del(index) {
                this.setDelSong(index);
            },
            like(value) {
                this.setFavoriteList(value);
            },
            isLike(song) {
                let result = this.favoriteList.find(function (currentValue) {
                    return currentValue === song;   //绝对相等
                });
                return result !== undefined;
            },
            delAll() {
                this.setDelSong();
            },
            selectMusic(index) {
                this.setCurrentIndex(index);

            }
        },
        computed: {
            ...mapGetters([
                'isPlaying',
                'modeType',
                'isShowListPlayer',
                "songs",
                "currentIndex",
		            "currentSongs",
		            "favoriteList"
		            
		            
            ])
        },
		    watch:{
            isPlaying(newValue, oldValue) {
                if (newValue) {
                    this.$refs.play.classList.add('active');
                } else {
                    this.$refs.play.classList.remove('active');
                }
            },
            modeType(newValue, oldValue) {
                if (newValue === modeType.loop) {
                    this.$refs.mode.classList.add('loop');
                    this.$refs.mode.classList.remove('random');
                }else if (newValue === modeType.one) {
                    this.$refs.mode.classList.add('one');
                    this.$refs.mode.classList.remove('loop');
                }else if (newValue === modeType.random) {
                    this.$refs.mode.classList.add('random');
                    this.$refs.mode.classList.remove('one');
                    
                }
            },
            isShowListPlayer(newValue, oldValue) {
                if (newValue) {
                    this.$refs.scrollView.refresh();
                }
            },
		    }
    }
</script>


<style scoped lang="scss">
	@import "../../assets/css/variable";
	@import "../../assets/css/mixin";
	.list-player {
		position: fixed;
		top: 0;
		left: 0;
		bottom: 0;
		right: 0;
		background: rgb(0,0,0,.5);
		.player-warpper {
			position: fixed;
			left: 0;
			bottom: 0;
			width: 100%;
			@include bg_sub_color();
			
			.player-top {
				display: flex;
				justify-content: space-between;
				padding: 0 20px;
				
				.left {
					display: flex;
					justify-content: flex-start;
					align-items: center;
					@include font_color();
					
					p {
						margin-left: 20px;
					}
					
					.mode {
						width: 56px;
						height: 56px;
						@include bg_img("../../assets/images/small_loop");
						
						&.one {
							@include bg_img("../../assets/images/small_one");
						}
						
						&.loop {
							@include bg_img("../../assets/images/small_loop");
						}
						
						&.random {
							@include bg_img("../../assets/images/small_shuffle");
						}
						
					}
				}
				
				.right {
					.del {
						width: 80px;
						height: 80px;
						@include bg_img("../../assets/images/small_del");
					}
				}
				
			}
			
			.player-middle {
				padding: 0 20px;
				height: 700px;
				overflow: hidden;
				ul{
					&.active {
						li {
							.item-left {
								.play {
									@include bg_img("../../assets/images/small_pause");
								}
							}
							
						}
					}
				}
				.item {
					@include font_color();
					
					li {
						border-top: 1px solid #ccc;
						padding: 20px 0;
						display: flex;
						justify-content: space-between;
					}
					
					.item-left {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						
						p {
							margin-left: 20px;
						}
						
						.play {
							width: 56px;
							height: 56px;
							@include bg_img("../../assets/images/small_play");
							
							
						}
					}
					
					.item-right {
						display: flex;
						justify-content: flex-start;
						align-items: center;
						
						div {
							width: 56px;
							height: 56px;
						}
						
						.like {
							@include bg_img("../../assets/images/small_un_favorite");
							&.active{
							@include bg_img("../../assets/images/small_favorite");
							
							}
						}
						
						.close {
							margin-left: 20px;
							@include bg_img("../../assets/images/small_close")
							
						}
					}
				}
			}
			
			.player-bottom {
				height: 80px;
				@include bg_color();
				
				h3 {
					@include font_size($font_large);
					color: white;
					line-height: 80px;
					text-align: center;
				}
			}
		}
	}

</style>