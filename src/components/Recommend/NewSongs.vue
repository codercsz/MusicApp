<template>
    <div class="song">
        <div class="son-top">
            <h3>为你推荐</h3>
        </div>
	    <SongListItem :newsonlists="newsonlists"></SongListItem>
	    
    </div>
</template>

<script>
    import SongListItem from "../SongListItem";
    export default {
        name: "NewSongs",
		    components:{
            SongListItem
		    },
        props: {
            newsonlists: {
                type: Array,
                default: () => [],
                required: true
            }
        },

    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/variable";
    @import "../../assets/css/mixin";
    .song {
        @include bg_sub_color();
        .son-top {
            width: 100%;
            height: 84px;
            line-height: 84px;
            @include bg_sub_color();
            padding-left: 20px;
            margin-bottom: 20px;
            border-bottom: #ccc solid 1px;
            border-top: #ccc solid 1px;
            h3 {
                @include font_size($font_large);
                @include font_color();

            }
        }
        .song-list {
            padding: 20px;
            @include font_color();
            img {
                width: 150px;
                height: 150px;
                border-radius: 20px;
                line-height: 150px;
            }
            li {
                display: flex;
                justify-content: flex-start;
                margin-bottom: 10px;


            }

            .song-info {
                width: 100%;
                height: 150px;
                align-items: center;
                display: flex;
                border-bottom: 1px solid #cccccc;
                margin-left: 10px;

                span:nth-child(1) {
                    @include font_size($font_medium)
                }

                span:nth-child(2),p {
                    @include font_size($font_samll);
                    opacity: 0.6;

                }
            }
        }
    }

</style>