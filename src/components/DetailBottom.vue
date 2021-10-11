<template>
    <div class="detail-bottom">
        <div class="top">
            <span>收藏</span>
            <span>|</span>
            <span>评论 {{comments}}</span>
            <span>|</span>
            <span>分享</span>
        </div>
        <div class="song-list">
            <ul>
                <li class="icon-title">
                    <div class="bottom-icon"></div>
                    <div class="bottom-title">播放全部</div>
                </li>
                <li v-for="value in songlist" :key="value.id" class="item">
                    <h3>{{value.name}}</h3>
                    <p>{{value.ar[0].name}} - {{value.al.name}}</p>
                </li>



            </ul>

        </div>
    </div>
</template>

<script>
    export default {
        name: "DetailBottom",
        data: function () {
            return{

            }
        },
        props:{
            songlist:{
                type: Array,
                default: () => [],
                required: true
            },
            comments:{
                type: "",
                default: 0,
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/css/variable";
    @import "../assets/css/mixin";
.detail-bottom{
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
        span:nth-child(2),span:nth-child(4){
            opacity: .5;
        }
    }
    .song-list {
        margin-top: 40px;
        display: flex;
        align-items: center;
        .icon-title{
            display: flex;
            justify-content: flex-start;
        }
        .bottom-icon {
            width: 60px;
            height: 60px;
            @include bg_img('../assets/images/small_play');
        }
        .bottom-title {
            @include font_color();
            @include font_size($font_large);
            font-weight: bold;
            line-height: 60px;
            margin-left: 20px;
        }
        ul{
            width: 100%;
            .item {
                @include font_color();
                h3{
                    @include font_size($font_medium)
                }
                p {
                    margin-top: 10px;
                    @include font_size($font_samll);

                    opacity: .6;
                }

            }
        }
        li{
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