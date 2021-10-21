<template>
	<div class="account-bottom">
		<div class="bottom-play" @click="selectAllMusic">
			<span></span>
			<span>播放全部</span>
		</div>

		<div class="bottom-wrapper">
			<ScrollView>
				<SongListItem :newsonlists="switchNum===0?favoriteList:historyList"></SongListItem>
			</ScrollView>
		</div>

		
	</div>
</template>

<script>
    import ScrollView from "../ScrollView";
    import SongListItem from "../SongListItem";
    import {mapActions, mapGetters} from 'vuex';
    export default {
        name: "AccountBottom",
        components: {
            ScrollView,
            SongListItem
        },
        methods: {
            ...mapActions([
                'setFullScreen',
                'setMiniPlayer',
                "setSongDetail",
                "setIsPlaying",
		            "setCurrentIndex"
            ]),
            selectAllMusic() {
                console.log('selectAllMusic');
               
                // let ids = [];
                if (this.switchNum === 0) {

                    this.$store.commit('setSongDetail', this.favoriteList);
                    
                   /* ids = this.favoriteList.map(function (item) {
                        return item.id;
                    });*/
                } else {
                    this.$store.commit('setSongDetail', this.historyList);
                    
                    /*ids = this.historyList.map(function (item) {
                        return item.id;
                    });*/
                }
                // this.setSongDetail(ids)
                this.setIsPlaying(true)
                this.setFullScreen(true);
                this.setMiniPlayer(false);
                this.setCurrentIndex(0);
            }
            },
            computed: {
                ...mapGetters([
                    "favoriteList",
                    "historyList",
                    "isPlaying"
                ])
            },
            props: {
                switchNum: {
                    type: Number,
                    default: 0,
                    required: true
                }
            }
        
    }
</script>

<style scoped lang="scss">
	@import "../../assets/css/variable";
	@import "../../assets/css/mixin";
	.account-bottom {
		position: fixed;
		top: 100px;
		bottom: 0;
		left: 0;
		right: 0;
		
		.bottom-play {
			width: 260px;
			height: 60px;
			margin: 20px auto;
			display: flex;
			justify-content: center; //水平居中
			align-items: center; //垂直居中
			border: 1px solid #000;
			@include border_color();
			border-radius: 30px;
			
			span {
				display: inline-block;
				
				&:nth-of-type(1) {
					width: 46px;
					height: 46px;
					@include bg_img("../../assets/images/small_play");
					margin-right: 20px;
				}
			}
		}
		.bottom-wrapper {
			position: fixed;
			top: 200px;
			left: 0;
			right: 0;
			bottom: 0;
			overflow: hidden;
		}
	
	
	}

</style>