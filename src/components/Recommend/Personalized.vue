<template>
    <div class="personalized">
        <div class="personalized-top">
            <h3>{{title}}</h3>
        </div>
        <div class="personalized-list">
            <div class="item" v-for="value in personalizeds" :key="value.id" @click="selectItem(value.id)">
                <img v-lazy="value.picUrl" alt="">
                <p>{{value.name}}</p>
            </div>
        </div>
    </div>
</template>

<script>
    export default {
        name: "Personalized",
        props:{
            personalizeds: {
                type: Array,
                default: () => [],
                required: true
            },
            title: {
                type: String,
                default: '',
                required: true
            },
            type:{
                type: String,
                default: '',
                required: true
            }
        },
        methods: {
            selectItem (id) {
                // console.log(id)
                this.$emit('select', id, this.type);
            }
        }

    }
</script>

<style scoped lang="scss">
    @import "../../assets/css/variable";
    @import "../../assets/css/mixin";
    .personalized {
        @include bg_sub_color();
        .personalized-top {
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
        .personalized-list {
            width: 100%;
            display: flex;
            justify-content: space-around;
            flex-wrap: wrap;
            .item {
                /*position: fixed;*/
                /*bottom: 0;*/
                /*left: 0;*/
                
                width: 200px;
                height: 200px;
                margin-bottom: 80px;
                
                img {
                    border-radius: 20px;
                    height: 100%;
                    
                }
                p {
                    @include clamp(2);
                    @include font_color();
                    @include font_size($font_medium_s);
                    text-align: center;
                    margin-top: 10px;
                }

            }
        }
    }

</style>