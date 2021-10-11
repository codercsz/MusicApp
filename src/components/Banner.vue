<template>
    <swiper
            :options="swiperOption"
            @swiper="onSwiper"
            @slideChange="onSlideChange"
            class="banner"
    >
        <swiper-slide class="item" v-for="value in banners">
            <a :href="value.url">
                <img :src="value.pic" alt="">
            </a>
        </swiper-slide>

        <div class="swiper-pagination" slot="pagination"></div>

    </swiper>
</template>

<script>
    import {Swiper,SwiperSlide} from 'vue-awesome-swiper'
    import 'swiper/css/swiper.css'
    export default {
        name: "Banner",
        components: {
            Swiper,
            SwiperSlide
        },
        data () {
            return {
                swiperOption: {
                    slidesPerView: 1,
                    // 设置分页器
                    pagination: {
                        el: '.swiper-pagination',
                        // 设置点击可切换
                        type: 'progressbar',
                        clickable: true
                    },
                    // 设置自动轮播
                    autoplay: {
                        delay: 1000 // 5秒切换一次
                    },
                    // 设置轮播可循环
                    loop: true
                }
            }
        },

        props:{
            banners:{
                type: Array,
                default: () => [],
                required: true
            }
        },
        methods: {
            onSwiper () {

            },
            onSlideChange () {

            }
        }
    }
</script>

<style scoped lang="scss">
    .banner{
        border-radius: 20px;
        margin: 20px;
        .item{
            img{
                width: 100%;
                height: 300px;
            }
        }
    }
</style>
<style lang="scss">
    @import "../assets/css/mixin";
    /*注意点: 如果想覆盖swiper的样式, 那么style标签不能是scoped的, 否则无法覆盖*/
    .banner{
        .swiper-pagination-progressbar-fill{
            @include bg_color();
            /*background: #f00;*/
        }
    }
</style>
