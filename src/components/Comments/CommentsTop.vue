<template>
  <div class="comments-top">
    <img v-lazy="playList.picUrl" alt="">
    <div class="right">
      <h3 class="title">{{playList.name}}</h3>
      <p>by{{playList.singer}}</p>
    </div>
    
  </div>
</template>

<script>
  import {getSongDetail} from '../../api/index';
  export default {
    name: "CommentsTop",
    data() {
      return {};
    },
    props:{
      playList:{
       type:Object,
        default: () => {},
        required: true
      }
    },
    created() {
    
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
  .comments-top {
    position: fixed;
    top: 100px;
    left: 0;
    right: 0;
    display: flex;
    padding: 20px;
    align-items: center;
    @include bg_sub_color();
    @include font_color();
    img {
      width: 120px;
      height: 120px;
      border-radius: 20px;
      margin-right: 20px;
    }
  }

</style>