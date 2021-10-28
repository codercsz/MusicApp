<script src="../../tools/tools.js"></script>
<template>
  <div class="comments-bottom">
    <div class="header">
      <h3>评论区</h3>
    </div>
    <ul class="comments-list">
      <li class="items" v-for="(value,index) in commentsList" :key="value.commentId">
        <img v-lazy="value.user.avatarUrl" alt="">
        <div class="comments-area">
          <h3>{{value.user.nickname}}</h3>
          <p class="date">{{getDate(value.time)}}</p>
          <p>{{value.content}}</p>
        </div>
      </li>
    </ul>
  </div>
</template>

<script>
  import {formartTime} from '../../tools/tools'
  export default {
    name: "CommentsBottom",
    data() {
      return{
      
      }
    },
    methods:{
      getDate(time) {
        let times = new Date(time);
        return `${times.getMonth()+1}月${times.getDate()}日`;
      }
    },
    props:{
      commentsList:{
        type: Array,
        default: () => [],
        required: true
      }
    }
  }
</script>

<style scoped lang="scss">
  @import "../../assets/css/variable";
  @import "../../assets/css/mixin";
  .comments-bottom {
    position: fixed;
    left: 0;
    right: 0;
    bottom: 0;
    top: 260px;
    @include bg_sub_color();
    @include font_color();
    .header {
      margin: 20px 0 0 20px;
    }
    .comments-list{
      padding: 20px;
      .items {
        display: flex;
        margin-bottom: 40px;
        img {
          width: 56px;
          height: 56px;
          border-radius: 50%;
        }
        .comments-area{
          margin-left: 20px;
          border-bottom: 1px solid #c9c9c9;
          padding-bottom: 20px;
          h3{
            @include font_size($font_large)
          }
          .date{
            @include font_size($font_samll)
          }
          p:last-child{
            @include font_size($font_medium)
          }
        }
        
        
      }
    }
  
  }

</style>