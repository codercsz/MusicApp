<template>
    <div class="header" @click="toggleColor()">
        <div class="header-left" @click.stop="back"></div>

        <ul class="header-title">
	        <li  :class="{'active':switchNum === 0}" @click.stop="switchItem(0)">我喜欢的</li>
	        <li :class="{'active':switchNum === 1}" @click.stop="switchItem(1)">最近听过</li>
        </ul>
        <div class="header-right"></div>
    </div>
</template>

<script>
    export default {
        name: "AccountHeader",
        data: function () {
            return {
                theme: ['theme', 'theme1', 'theme2'],
                index: 0,
                switchNum: 0
            }
        },
        props: {
            title: {
                type: String,
                default: "Loading...",
                require: true
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
            back() {
                window.history.back();  //返回上一级
            },
            switchItem(switchNum) {
                this.switchNum = switchNum;
                this.$emit('switchItem', switchNum);
            }
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
        @include bg_color();
        display: flex;
        justify-content: space-between;

        .header-left, .header-right {
            width: 84px;
            height: 84px;
            margin-top: 8px;
        }
        .header-title {
	        display: flex;
	        height: 60px;
	        margin-top: 20px;
	        justify-content: center;
	        align-items: center;
	        border: 1px solid #fff;
	        color: #FFFFFF;
	        font-weight: bold;
	        border-radius: 10px;
	        @include no-wrap();
	        @include font_size($font_medium);
	        li {
		        height: 60px;
		        line-height: 60px;
		        padding: 0 20px;
		        &:nth-of-type(1) {
			        border-right: 1px solid #FFFFFF;
		        }
		        &.active {
			        background: rgba(255, 255, 255, .3);
			
		        }
	        }
	        
	
        }
        .header-left{
            @include bg_img('../../assets/images/back')
        }
        .header-right{
            @include bg_img('../../assets/images/more')
        }
    }

</style>