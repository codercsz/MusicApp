<template>
    <div class="detail">
        <SubHeader :title="detailList.name"></SubHeader>
        <DetailTop :path="detailList.coverImgUrl" ref="top"></DetailTop>
        <div class="bottom">
            <ScrollView ref="scrollview">
                <div>
                    <DetailBottom :songlist="detailList.tracks" :comments="comments.total" @fatherSelectComments="selectComments"></DetailBottom>
                </div>
            </ScrollView>
        </div>
    </div>
</template>

<script>
    import SubHeader from "./DetailHeader";
    import DetailTop from "./DetailTop";
    import DetailBottom from "./DetailBottom";
    import ScrollView from "../ScrollView";
    import {getSongDetail, getAlbum, getComment, getAlbumComment, getSingerDetail,getTopListDetail} from '../../api';
    export default {
        name: "Detail",
        components: {
            SubHeader,
            DetailTop,
            DetailBottom,
            ScrollView
        },
        data: function () {
            return {
                detailList: {},
                comments: {
                    total: ''
                }
            }
        },
        methods: {
            selectComments(id) {
                this.$router.push({
                    path: `/recommend/detail/${id}`
                })

            }
        },
        created() {
            // console.log(this.$route.params.type)
            if(this.$route.params.type === 'personalizeds' || this.$route.params.type === 'rank'){
                //获取歌单列表
                getSongDetail({id: this.$route.params.id}).then(data => {
                    this.detailList = data.playlist
                    this.imgPath = data.playlist;
                    // console.log(this.detailList)
                });
                //获取歌单评论
                getComment({id:this.$route.params.id}).then(data => {
                    this.comments = {
                        total: data.total
                    }

                }).catch(err=>{
                    console.log(err);
                })

            }else if (this.$route.params.type === 'albums') {
                //获取专辑列表
                getAlbum({id: this.$route.params.id}).then(data => {
                    // console.log(data);
                    this.detailList = {
                        name: data.album.name,
                        coverImgUrl: data.album.picUrl,
                        tracks: data.songs

                    }
                })
                //获取专辑评论
                getAlbumComment({id:this.$route.params.id}).then(data => {
                    this.comments = {
                        total: data.total
                    }
                }).catch(err=>{
                    console.log(err);
                })
            }
            else if (this.$route.params.type === 'singer') {
              //获取歌手详情
              getSingerDetail({id:this.$route.params.id}).then(value => {
                this.detailList = {
                  name: value.artist.name,
                  coverImgUrl: value.artist.picUrl,
                  tracks: value.hotSongs
                }
              });
            }
          


        },
        mounted() {
            let defaultHeight = this.$refs.top.$el.offsetHeight;
            this.$refs.scrollview.scrolling((offsetY) => {
                if (offsetY > 0) {
                    let scale = Math.abs(offsetY) / defaultHeight
                    this.$refs.top.$el.style.transform = `scale(${1 + scale})`;

                }else{
                    /*let scale = 20 * Math.abs(offsetY) / defaultHeight
                    this.$refs.top.$el.style.filter = `blur(${scale}px)`;*/
                    let scale = Math.abs(offsetY) / defaultHeight
                    this.$refs.top.changeMask(scale);
                }
            });
        }
    };
</script>

<style scoped lang="scss">
    @import "../../assets/css/mixin";
    .detail {
	    overflow: hidden;
	    position: fixed;
	    top: 0;
	    left: 0;
	    right: 0;
	    bottom: 0;
	    @include bg_sub_color();
	
	    .bottom {
		    position: fixed;
		    top: 500px;
		    bottom: 0;
		    left: 0;
		    right: 0;
		
	    }
    }
</style>