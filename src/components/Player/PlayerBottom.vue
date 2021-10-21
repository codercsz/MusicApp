<template>
	<div class="player-bottom">
		<div class="progress">
			<span ref="eleCurrentTime">00:00</span>
			<div class="progress-bar" @click="progressClick" ref="progressBar">
				<div class="progress-line" ref="progressLine">
					<div class="progress-dot">
					</div>
				</div>
			</div>
			<span ref="eleTotalTime">05:00</span>
		</div>
		<div class="controller">
			<div class="mode" @click="mode" ref="mode"></div>
			<div class="prev" @click="prevMusic"></div>
			<div class="play" @click="play" ref="play"></div>
			<div class="next" @click="nextMusic"></div>
			<div class="like" @click="like" :class="{'active':isLike(currentSongs)}"></div>
		</div>
	</div>
</template>

<script>
    import {mapGetters,mapActions} from 'vuex';
    import modeType from "../../store/modeType";
    import {formartTime} from "../../tools/tools";

    export default {
			name: "PlayerBottom",
        methods: {
            ...mapActions([
                'setIsPlaying',
                'setModeType',
                "setCurrentIndex",
                "setCurrentTime",
                "setFavoriteList",
                "setLikeList"
            ]),
            play() {
                this.setIsPlaying(!this.isPlaying);
            },
            mode() {
                if (this.modeType === modeType.loop) {
                    this.setModeType(modeType.one);
                } else if (this.modeType === modeType.one) {
                    this.setModeType(modeType.random);
                } else if (this.modeType === modeType.random) {
                    this.setModeType(modeType.loop);
                }
            },
            nextMusic() {
                this.setCurrentIndex(this.currentIndex + 1);
            },
            prevMusic() {
                this.setCurrentIndex(this.currentIndex - 1);
            },
            like() {
                this.setFavoriteList(this.currentSongs);
            },
            isLike(song) {
                let result = this.favoriteList.find(function (currentValue) {
                    return currentValue === song;
                });
                return result !== undefined;
            },
            progressClick(e) {
                //1.计算进度条的位置
                // let normalLeft = e.target.offsetLeft;  // 获取元素到第一个定位祖先与元素之间的偏移位，如果没有祖先元素是定位的, 那么就是获取到body的偏移位
                let normalLeft = this.$refs.progressBar.offsetLeft;
                let eventLeft = e.pageX;  //定位鼠标距离body的x轴坐标
                let clickLeft = eventLeft - normalLeft;  //获得鼠标在进度条的x坐标的位置
                let progressWidth = this.$refs.progressBar.offsetWidth; //获得元素的宽度，取的宽高包含边框 + 内边距 + 元素宽高
                let value = clickLeft / progressWidth;
                this.$refs.progressLine.style.width = value * 100 + "%";

                //2.计算当前应该从什么地方开始播放
                let currentTime = this.totalTime * value;
                // console.log(currentTime);
                this.setCurrentTime(currentTime);
            }
        },
        computed: {
            ...mapGetters([
                'isPlaying',
                'modeType',
                "currentIndex",
                "currentSongs",
                "favoriteList"
            ])
        },
			watch:{
          isPlaying(newValue,oldValue) {
              if (newValue) {
								this.$refs.play.classList.add('active')
              } else {
								this.$refs.play.classList.remove('active')
              }
          },
          modeType(newValue,oldValue) {
              if (newValue === modeType.loop) {
                this.$refs.mode.classList.add("loop")
                this.$refs.mode.classList.remove("random")
		              
              }else if (newValue === modeType.one) {
                this.$refs.mode.classList.add("one")
                this.$refs.mode.classList.remove("loop")
              }else if (newValue === modeType.random) {
                this.$refs.mode.classList.add("random")
                this.$refs.mode.classList.remove("one")
              }
          },
          totalTime(newValue, oldValue) {
              let time = formartTime(newValue);
              this.$refs.eleTotalTime.innerHTML = time.minute + ':' + time.second;
          },
          currentTime(newValue, oldValue) {
              //格式化当前播放的时间
              let time = formartTime(newValue);
              this.$refs.eleCurrentTime.innerHTML = time.minute + ':' + time.second;
              //根据当前的播放时间计算比例
              let value = newValue / this.totalTime * 100;
              this.$refs.progressLine.style.width = value + '%';
          },
          
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
	@import "../../assets/css/mixin";
	@import "../../assets/css/variable";
	.player-bottom{
		position: fixed;
		bottom: 0;
		left: 0;
		width: 100%;
		.progress {
			display: flex;
			justify-content: space-between;
			width: 80%;
			margin: 0 auto;
			align-items: center;
			span {
				@include font_size($font_medium);
				@include font_color();
			}
			.progress-bar {
				border-radius: 5px;
				background: #CCC;
				height: 10px;
				width: 100%;
				margin: 0 10px ;
				.progress-line{
					width: 0%;
					background: #FFFFFF;
					height: 10px;
					border-radius: 5px;
					position: relative;
				}
				.progress-dot {
					position: absolute;
					top: 50%;
					transform: translateY(-50%);
					width: 20px;
					height: 20px;
					left: 97%;
					background: #FFFFFF;
					border-radius: 50%;
				}
			}
		}
		.controller {
			display: flex;
			justify-content: space-around;
			align-items: center;
			width: 80%;
			margin: 0 auto;
			padding: 50px 100px;
			div{
				width: 84px;
				height: 84px;
			}
			.mode {
				@include bg_img("../../assets/images/loop");
				&.loop {
					@include bg_img("../../assets/images/loop");
				}
				&.one {
					@include bg_img("../../assets/images/one");
				}
				&.random {
					@include bg_img("../../assets/images/shuffle");
				}
			}
			.prev {
				@include bg_img("../../assets/images/prev")
			}
			.play {
				@include bg_img("../../assets/images/play");
				&.active {
					@include bg_img("../../assets/images/pause")
					
				}
			}
			
			.next {
				@include bg_img("../../assets/images/next")
			}
			
			.like {
				@include bg_img("../../assets/images/un_favorite");
				&.active {
					@include bg_img("../../assets/images/favorite");
				}
			}
			
		}
	}

</style>