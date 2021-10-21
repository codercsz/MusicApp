<template>
    <div class="detail-bottom">
        <div class="top">
            <span>收藏</span>
            <span>|</span>
            <span @click="selectComments">评论 {{comments}}</span>
            <span>|</span>
            <span>分享</span>
        </div>
        <div class="song-list">
            <ul>
                <li class="icon-title" @click="selectAllMusic">
                    <div class="bottom-icon"></div>
                    <div class="bottom-title">播放全部</div>
                </li>
                <li v-for="value in songlist" :key="value.id" class="item" @click="selectMusic(value.id)">
                    <h3>{{value.name}}</h3>
                    <p>{{value.ar[0].name}} - {{value.al.name}}</p>
                </li>
            </ul>

        </div>
    </div>
</template>

<script>
    import {mapActions,mapGetters} from 'vuex';

    export default {
        name: "DetailBottom",
        data: function () {
            return {}
        },
        methods: {
            selectComments() {
                this.$emit("fatherSelectComments", this.songlist.id)
                console.log(this.songlist);
            },
 

            /*
            * 你在组件中使用 this.$store.dispatch('xxx') 分发 action，
            * 或者使用 mapActions 辅助函数将组件的 methods 映射为 store.dispatch 调用（需要先在根节点注入 store）：
            * */
            ...mapActions([
                'setFullScreen',
                'setMiniPlayer',
                "setSongDetail",
		            "setIsPlaying"
            ]),
            selectMusic(id) {
                // this.$store.dispatch("setFullScreen", true);  #使用dispatch方法调用共享数据
                // this.$store.commit('tese');  也可以通过此方法修改state的值，但是没办法传参数
                this.setFullScreen(true);  //此方法是利用mapActions将setFullScreen映射成this.$store.dispatch
                this.setMiniPlayer(false);
                this.setSongDetail([id])
                this.setIsPlaying(true);
            },
            selectAllMusic() {
                this.setFullScreen(true);
                this.setMiniPlayer(false);
                let ids = this.songlist.map(function (item) {
                    return item.id;
                });
                this.setSongDetail(ids)
                this.setIsPlaying(true);
            }
        },
        watch: {
            ...mapGetters([
                "isPlaying"
		            
            ])
        },
        props: {
            songlist: {
                type: Array,
                default: () => [],
                required: true
            },
            comments: {
                type: "",
                default: 0,
                required: true
            }
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/css/variable";
    @import "../../assets/css/mixin";
.detail-bottom {
	overflow: hidden;

	.top {
		width: 70%;
		height: 40px;
		margin: 0 auto;
		background: gray;
		opacity: .8;
		color: #FFFFFF;
		padding: 20px;
		display: flex;
		justify-content: space-around;
		border-radius: 80px;
		@include font_size($font_samll);
		
		span:nth-child(2), span:nth-child(4) {
			opacity: .5;
		}
	}
	
	.song-list {
		margin-top: 40px;
		display: flex;
		align-items: center;
		
		.icon-title {
			display: flex;
			justify-content: flex-start;
		}
		
		.bottom-icon {
			width: 60px;
			height: 60px;
			@include bg_img('../../assets/images/small_play');
		}
		
		.bottom-title {
			@include font_color();
			@include font_size($font_large);
			font-weight: bold;
			line-height: 60px;
			margin-left: 20px;
		}
		
		ul {
			width: 100%;
			
			.item {
				@include font_color();
				
				h3 {
					@include font_size($font_medium)
				}
				
				p {
					margin-top: 10px;
					@include font_size($font_samll);
					
					opacity: .6;
				}
				
			}
		}
		
		li {
			width: 100%;
			height: 120px;
			padding: 20px;
			box-sizing: border-box;
			@include bg_sub_color();
			border-bottom: 1px solid #ccc;
		}
		
	}
}

</style>