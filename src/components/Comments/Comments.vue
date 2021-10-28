<template>
  <div class="comments">
    <CommentsHeader :title="title"></CommentsHeader>
    <CommentsTop :playList="playList"></CommentsTop>
    <ScrollView>
        <CommentsBottom :commentsList="commentsList"></CommentsBottom>
    </ScrollView>
    
  </div>
</template>

<script>
  import {getSongDetail, songsListComments} from '../../api/index';
  import CommentsHeader from "./CommentsHeader";
  import CommentsTop from "./CommentsTop";
  import CommentsBottom from "./CommentsBottom";
  import ScrollView from "../ScrollView";
  export default {
    name: "Comments",
    data() {
      return{
        title: "",
        commentsList: [],
        playList:{
          name:"",
          picUrl:"",
          singer: ""
        }
      }
    },
    components: {
      CommentsHeader,
      CommentsTop,
      CommentsBottom,
      ScrollView
    },
    created() {
      songsListComments({id:this.$route.params.id}).then(value => {
        console.log(value);
        this.title = value.total.toString();
        this.commentsList = value.comments;
        console.log(value);
      });
      getSongDetail({id:this.$route.params.id}).then(value => {
        this.playList = {
          'name': value.playlist.name,
          'picUrl': value.playlist.coverImgUrl,
          'singer': value.playlist.creator.nickname
        }
      });
    }
  }
</script>

<style scoped lang="scss">
  .comments{
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 0;
  }

</style>