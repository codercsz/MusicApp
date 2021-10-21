<template>
    <div class="header" @click="toggleColor()">
        <div class="header-left"></div>
        <div class="header-title">Slag Music</div>
        <div class="header-right" @click.stop="accountClick"></div>
    </div>
</template>

<script>
    export default {
        name: "Header",
        data: function () {
            return {
                theme: ['theme', 'theme1', 'theme2'],
                index: 0
            }
        },
        methods:{
            toggleColor() {
                this.index++;
                if (this.index >= this.theme.length) {
                    this.index = 0;
                }
                document.documentElement.setAttribute('data-theme', this.theme[this.index]);
            },
            accountClick() {
                this.$router.push("./account");
            }
        }
    }
</script>

<style scoped lang="scss">
    @import "../assets/css/variable";
    @import "../assets/css/mixin";
    .header {
        width: 100%;
        height: 100px;
        /*background: red;*/
        @include bg_color();
        display: flex;
        justify-content: space-between;

        .header-left, .header-right {
            width: 84px;
            height: 84px;
            margin-top: 8px;
        }
        .header-title {
            text-align: center;
            line-height: 100px;
            color: #FFFFFF;
            font-weight: bold;
            @include font_size($font_medium);

        }
        .header-left{
            @include bg_img('../assets/images/logo')
        }
        .header-right{
            @include bg_img('../assets/images/account')
        }
    }

</style>