<template>
    <div>
        <swiper :options="swiperOption" class="playermiddle">
            <swiper-slide class="item">
                <div class="bg-img" ref="bgImg">
                    <img v-lazy="currentSongs.picUrl" alt="">
                </div>
                <p>{{getFirstLyric()}}</p>
            </swiper-slide>
	        
            <swiper-slide class="item" ref="lyric">
                <ScrollView ref="scrollView">
                    <ul class="lyric">
                        <li  v-for="(value,index) in currentLyric" :key="index" :class="{'active':currentLineNum === index}">{{value}}</li>
                    </ul>
                </ScrollView>
            </swiper-slide>
            <div class="swiper-pagination" slot="pagination"></div>
        </swiper>


    </div>
</template>

<script>
    import ScrollView from "../ScrollView";
    import {Swiper,SwiperSlide} from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    import {mapGetters, mapActions} from 'vuex';
    export default {
        name: "PlayerMiddle",
        data () {
            return {
                swiperOption: {
                    // 设置分页器
                    pagination: {
                        el: '.swiper-pagination',
                        bulletClass: 'my-bullet',//需设置.my-bullet样式
                        bulletActiveClass: 'my-active-bullet'
                    },
                    observer: true,
                    observeParents: true,
                    observeSlideChildren: true
                },
                currentLineNum: '0'
            }
        },
        methods: {
            ...mapActions([
                "getSongLyric"
            ]),
            getFirstLyric() {
                for (let key in this.currentLyric) {
                    return this.currentLyric[key];
                }
            },
            getActiveLineNum (lineNum) {
                if (lineNum < 0) {
                    return this.currentLineNum
                }
                let result = this.currentLyric[lineNum + '']
                if (result === undefined || result === '') {
                    lineNum--
                    return this.getActiveLineNum(lineNum)
                } else {
                    return lineNum + ''
                }
            }
        },
        components: {
            Swiper,
            SwiperSlide,
            ScrollView,

        },
        computed: {
            ...mapGetters([
                'isPlaying',
                'currentSongs',
                "currentLyric"
            ])
        },
        watch:{
            isPlaying(newValue, oldValue) {
                if (newValue) {
                    this.$refs.bgImg.classList.add('active');
                } else {
                    this.$refs.bgImg.classList.remove('active');
                }

            },
            currentTime(newValue, oldValue) {
               /* //1.高亮歌词同步
                let lineNum = Math.floor(newValue) + ''; //向下取整 +''变成字符串
                let res = this.currentLyric[lineNum];
                if (res !== undefined && res !== "") {
                    this.currentLineNum = lineNum;
                    //2.歌词滚动同步
                    let currentLyricTop = document.querySelector("li.active").offsetTop;  //元素距离定位祖先元素的距离，没有定位的祖先就获取到body的距离
                    let lyricHeight = this.$refs.lyric.$el.offsetHeight;  //  获取的高度包含 边框 + 内边距 + 元素宽高
                    if (currentLyricTop > lyricHeight / 2) {
                        this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100);
                    }
                }*/
                // 1.高亮歌词同步
                let lineNum = Math.floor(newValue)
                this.currentLineNum = this.getActiveLineNum(lineNum)
                // 2.歌词滚动同步
                let currentLyricTop = document.querySelector('.lyric .active').offsetTop
                let lyricHeight = this.$refs.lyric.$el.offsetHeight
                if (currentLyricTop > lyricHeight / 2) {
                    this.$refs.scrollView.scrollTo(0, lyricHeight / 2 - currentLyricTop, 100)
                } else {
                    this.$refs.scrollView.scrollTo(0, 0, 100)  //没有达到滚动条件就按照原来的位置显示
                }
            },
            currentLyric(newValue, oldValue) {
                for (let key in newValue) {
                    this.currentLineNum = key;
                    return;
                }
            }
        },
		    props:{
            currentTime: {
                type: Number,
                default: 0,
                required: true    //是否为必传
            }
		    }

    };
</script>

<style scoped lang="scss">
    @import "../../assets/css/variable";
    @import "../../assets/css/mixin";
    .playermiddle {
        position: fixed;
        left: 0;
        top: 150px;
        right: 0;
        bottom: 250px;
        .bg-img {
	        display: block;
	        margin: 0 auto;
	        width: 500px;
	        height: 500px;
	        background: #dcdfe6;
	        border-radius: 50%;
	        overflow: hidden;
	        border: 20px solid #ccc;
	        animation: sport 3s linear infinite; //linear:线性  infinite:无限循环
	        animation-play-state: paused; //设置默认状态为停止
	        &.active {
		        animation-play-state: running;  //激活后设置为循环转动
	        }
	
	        img {
		        width: 100%;
		        height: 100%;
	        }
        }
        .item{
            p {
                @include font_color();
                text-align: center;
                margin-top: 20px;
            }
	        .lyric {
		        /*margin: 0 auto;*/
		        li {
			        margin-top: 20px;
			        text-align: center;
			        @include font_color();
			        @include font_size($font_medium);
			        &:last-child {
				        padding-bottom: 50%;
				
			        }
			        &.active {
				        color: #FFFFFF;
				
			        }
			        
			        
		        }
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
<style lang="scss">
    /*my-bullet my-active-bullet*/
    @import "../../assets/css/variable";
    @import "../../assets/css/mixin";
.my-bullet {
    display: inline-block;
    width: 20px;
    height: 20px;
    border-radius: 50%;
    background: #fff;
    margin: 0 20px;
}
    .my-active-bullet {
        width: 40px;
        @include bg_color();
        border-radius: 10px;
    }
</style>