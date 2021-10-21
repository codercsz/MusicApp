<template>
    <div class="header">
        <div class="header-left" @click="hiddenNormalPlayer"></div>
        <div class="header-title">
            <h3>{{currentSongs.name}}</h3>
            <p>{{currentSongs.singer}}</p>
        </div>
        <div class="header-right"></div>
    </div>
</template>

<script>
    import {mapActions, mapGetters} from 'vuex';
    export default {
        name: "PlayerHeader",
        methods: {
            ...mapActions([
                'setFullScreen',
                'setMiniPlayer',
            ]),
            hiddenNormalPlayer() {
                this.setFullScreen(false);
                this.setMiniPlayer(true);
            },
        },
		    computed:{
            ...mapGetters([
                'currentSongs'
            ])
		    }

    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/variable";
    @import "../../assets/css/mixin";
    .header {
        width: 100%;
        height: 100px;
        /*background: red;*/
        //@include bg_color();
        display: flex;
        justify-content: space-between;

        .header-left, .header-right {
            width: 84px;
            height: 84px;
            margin-top: 8px;
        }
        .header-title {
            text-align: center;
            color: #FFFFFF;
            @include font_size($font_medium);
            display: flex;
            justify-content: center;
            flex-direction: column;

        }
        .header-left{
            @include bg_img('../../assets/images/down')
        }
        .header-right{
            /*@include bg_img('../assets/images/account')*/
        }
    }

</style>