<template>
    <div class="recommend">
       <div class="recommend-warp">
           <ScrollView>
               <div>
                   <Banner :banners="banners"></Banner>
                   <Personalized :personalizeds="personalizeds" :title="'最新歌单'" @select="fatherSelectItem" :type="'personalizeds'"></Personalized>
                   <Personalized :personalizeds="albums" :title="'最新专辑'" @select="fatherSelectItem" :type="'albums'"></Personalized>
                   <new-songs :newsonlists="newsonlists"></new-songs>
               </div>
           </ScrollView>
	       
       </div>
        <transition>
            <router-view></router-view>
        </transition>
	    
    </div>
</template>

<script>
    import {getBanner, getPersonalized,getNewAlbum ,getNewSong} from "../api/index";
    import Banner from "../components/Recommend/Banner";
    import Personalized from "../components/Recommend/Personalized";
    import NewSongs from "../components/Recommend/NewSongs";
    import ScrollView from "../components/ScrollView";
    import Player from "./Player";
    import MetaInfo from "../../vue-meta-info";

    export default {
      name: "Recommend",
      metaInfo: MetaInfo.recommend,
      components: {
        Banner,
        Personalized,
        NewSongs,
        ScrollView,
        Player
      },
      methods: {
        fatherSelectItem(id, type) {
          this.$router.push({
            path: `/recommend/detail/${id}/${type}`
          })
        }
      },
      data: function () {
        return {
          banners: [],
          personalizeds: [],
          albums: [],
          titles1: '',
          newsonlists: []
        }
      },
      created() {
        getBanner().then(data => {
          // console.log(data);
          this.banners = data.banners;
          // console.log(this.banners);
        });
        getPersonalized().then(data => {
          this.personalizeds = data.result;
          // console.log(data.result[0].copywriter);
          // console.log(this.personalizeds);
          this.titles1 = data.result[0].copywriter;
        });
        getNewAlbum().then(data => {
          // this.personalizeds = data.result;
          // console.log(data);
          this.albums = data.albums.splice(0, 6);
      
        });
        getNewSong().then(data => {
          let list = [];
          data.result.forEach(value => {
            let obj = {};
            obj.id = value.id;
            obj.name = value.name;
            obj.picUrl = value.song.album.picUrl;
            let singer = '';
            obj.albumName = value.song.album.name
            //判断是否只有一个演唱者
            for (let i = 0; i < value.song['artists'].length; i++) {
              if (i === 0) {
                singer = value.song['artists'][i].name;
              } else {
                singer += '-' + value.song['artists'][i].name;
              }
            }
            obj.singer = singer;
            list.push(obj);
          });
          this.newsonlists = list;
      
        });
      }
    };
</script>

<style scoped lang="scss">
    .recommend{
        position: fixed;
        top: 184px;
        left: 0;
        right: 0;
        bottom: 0;
        .recommend-warp{
            width: 100%;
            height: 100%;
            overflow: hidden;
        }
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