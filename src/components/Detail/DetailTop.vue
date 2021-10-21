<template>
    <div class="img-warp">

        <img v-lazy="path" alt="">
        <div class="mask" ref="mask"></div>
    </div>
</template>

<script>
    export default {
        name: "DetailTop",
        props: {
            path: {
                type: String,
                default: "",
                required: true
            }
        },
        methods:{
            changeMask(opacity) {
                this.$refs.mask.style.opacity = opacity;
            }
        }
    }
</script>

<style scoped lang="scss">
    .img-warp {
        width: 100%;
        height: 500px;
        overflow: hidden;
        position: relative;
        img {
            width: 100%;
        }
        .mask{
            width: 100%;
            height: 100%;
            background: #000;
            position: absolute;
            left: 0;
            top: 0;
            opacity: 0;
        }
    }

</style>