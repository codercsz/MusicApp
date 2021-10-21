<template>
<!--    <div class="player" v-show="this.$store.getters.isFullScreen">-->
<!--    <div class="player" v-show="this.isFullScreen">-->
    <div class="player">  <!--使用别名-->
        <NormalPlayer :totalTime="totalTime" :currentTime="currentTime"></NormalPlayer>
        <MiniPlayer></MiniPlayer>
        <ListPlayer></ListPlayer>
	      <audio :src="currentSongs.urls" ref="audio" @timeupdate="timeupdate" @ended="end"></audio>
    </div>
</template>

<script>
    import NormalPlayer from "../components/Player/NormalPlayer";
    import MiniPlayer from "../components/Player/MiniPlayer";
    import ListPlayer from "../components/Player/ListPlayer";
    import mode from "../store/modeType";
    import {mapGetters,mapActions} from 'vuex'
    import {getRandomIntInclusive} from "../tools/tools";

    export default {
        name: "Player",
        components:{
            NormalPlayer,
            MiniPlayer,
            ListPlayer
        },
        methods: {
            ...mapActions([
                "setCurrentIndex",
                "setLikeList",
                "setHistorySong",
                'setHistoryList'
            ]),
            timeupdate(e) {
                this.currentTime = e.target.currentTime;
            },
            end() {
                if (this.modeType === mode.loop) {
                    this.setCurrentIndex(this.currentIndex + 1);
                } else if (this.modeType === mode.one) {
                    this.$refs.audio.play();  //重播
                } else if (this.modeType === mode.random) {
                    let index = getRandomIntInclusive(0, this.songs.length - 1);
                    this.setCurrentIndex(index);
                }
            }
        },
        computed: {
            //在computed计算函数中将store中的getter函数中方法隐射成局部方法，也就是说不用this.$store.getter.XXX()获取数据
            // ，直接使用this.XXX(isFullScrent = 次方法名需要跟getters的方法对应，也可以取别名)
            /*...mapGetters([
								'isFullScreen'
						])*/
            //取别名
            /* ...mapGetters({
										 test: 'isFullScreen'
								 }
						 )*/
            ...mapGetters([
                "currentSongs",
                "isPlaying",
                "currentIndex",
                "curTime",
                'modeType',
                "songs",
                "favoriteList",
		            "historyList"
            ])
        },
        watch: {
            isPlaying(newValue, oldVale) {
                if (newValue) {
                    this.setHistorySong(this.currentSongs);
                    this.$refs.audio.play();
                } else {
                    this.$refs.audio.pause();
                }
            },
            currentIndex() {
                /*
                * 注意点:在ios中系统不会自动加载歌曲,所以oncanplay不会自动执行
                *       在PC端和Android端，系统会自动加载歌曲，所以oncanplay会自动被执行
                *
                * 解决方案:如何监听ios中Audio的歌曲是否已经准备好了，通过ondurationchange时间来监听
                * ondurationchange事件什么时候执行；当歌曲加载完成之后执行，因为只有歌曲加载完成后才能获取到歌曲总时长
                * */
                
                // this.$refs.audio.oncanplay = () => {
                this.$refs.audio.ondurationchange = () => {
                    this.totalTime = this.$refs.audio.duration;
                    if (this.isPlaying) {
                        this.setHistorySong(this.currentSongs);
                        this.$refs.audio.play();
                    } else {
                        this.$refs.audio.pause();
                    }
                };


            },
            curTime(newValue, oldValue) {
                this.$refs.audio.currentTime = newValue;
            },
            favoriteList(newValue, oldValue) {
                //当收藏列表发生改变的时候，把值存到缓存中
                window.localStorage.setItem('favoriteList', JSON.stringify(newValue));
            },
            historyList(newValue, oldValue) {
                window.localStorage.setItem('historyList', JSON.stringify(newValue));
            }
        },
        mounted() {
            // this.$refs.audio.oncanplay = () => {
            this.$refs.audio.ondurationchange = () => {
                this.totalTime = this.$refs.audio.duration;  //获取音频总时长
            };
        },
        created() {
            let favoriteList = JSON.parse(window.localStorage.getItem('favoriteList'));
            if (favoriteList === null) {
                return;
            }
            this.setLikeList(favoriteList);  //将存到缓存中的数据，在页面创建的时候重新设置给收藏列表

            let historyList = JSON.parse(window.localStorage.getItem('historyList'));
            if (historyList === null) {
                return;
            }
            this.setHistoryList(historyList);  //将存到缓存中的数据，在页面创建的时候重新设置给收藏列表
        },
        data() {
            return{
                totalTime: 0,
                currentTime: 0
            }
        }
    }
</script>

<style scoped lang="scss">
	.player {
	
/*		position: fixed;
		top: 0;
		left: 0;
		right: 0;
		bottom: 0;*/
	}

</style>
