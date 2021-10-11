<template>
    <div class="img-warp">
        <img v-lazy="path" alt="">
    </div>
</template>

<script>
    export default {
        name: "DetailTop",
        props:{
            path:{
                type:String,
                default: "",
                required: true
            }
        }
    }
</script>

<style scoped lang="scss">
    .img-warp {
        width: 100%;
        height: 500px;
        overflow: hidden;
        img {
            width: 100%;

        }
    }

</style>