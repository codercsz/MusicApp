<template>
    <div class="singer">
	    <div class="singer-wrapper">
		    <ScrollView ref="ScrollView">
			    <ul class="list-wrapper">
				    <li class="list-group" v-for="(value,index) in list" :key="index" ref="group">
					    <h2 class="group-title">{{keys[index]}}</h2>
					    <ul>
						    <li class="group-item" v-for="obj in list[index]" :key="obj.id" @click="switchSinger(obj.id)">
							    <img v-lazy="obj.img1v1Url" alt="">
							    <p>{{obj.name}}</p>
						    </li>
					    </ul>
				    </li>
			    </ul>
		    </ScrollView>
		    <ul class="list-keys">
<!--			    <li v-for="(key,index) in keys" :key="key" @click.stop="keyDown(index)" :class="{'active':currentIndex ===index}">{{key}}</li>-->
			    <li v-for="(key,index) in keys"
			        :key="key"
			        :class="{'active':currentIndex ===index}"
			        :data-index="index"
			        @touchstart.stop.prevent="touchstart"
			        @touchmove.stop.prevent="touchmove"
			    >{{key}}</li>
		    </ul>
		    <div class="fix-title" v-show="fixTitle !== ''" ref="fixTitle">{{fixTitle}}</div>
	    </div>
	    <transition>
		    <router-view></router-view>
	    </transition>
    </div>
</template>

<script>
    import {getAllArtists} from "../api/index";
    import {getSingerDetail} from "../api/index";
    import ScrollView from "../components/ScrollView";
    import MetaInfo from "../../vue-meta-info";

    export default {
      name: "Singer",
	    metaInfo:MetaInfo.singer,
      data() {
        return {
          keys: [],
          list: [],
          groupsTop: [],
          currentIndex: 0,
          beginOffsetY: 0,
	        moveOffsetY:0,
          scrollY: 0
	        
        };
      },
	    methods:{
        _keyDown(index) {
          this.currentIndex = index;
          let offsetY = this.groupsTop[index]
           this.$refs.ScrollView.scrollTo(0, -offsetY);
        },
        touchstart(e) {
          let index = parseInt(e.target.dataset.index);
          this._keyDown(index);
          this.beginOffsetY = e.touches[0].pageY;
          
        },
        touchmove(e) {
          this.moveOffsetY = e.touches[0].pageY;
          let offsetY = (this.moveOffsetY - this.beginOffsetY) / e.target.offsetHeight;
          let index = parseInt(e.target.dataset.index) + Math.floor(offsetY);
          if (index < 0) {
            index = 0;
          }else if (index > this.keys.length - 1) {
            index = this.keys.length - 1;
          }
          this._keyDown(parseInt(index));
          
          
        },
        switchSinger(id) {
          this.$router.push(`/singer/detail/${id}/singer`);
        }
		    
	    },
	    computed:{
        fixTitle () {
          if (this.scrollY >= 0) {
            return ''
          } else {
            return this.keys[this.currentIndex]
          }
        }
	    },
      watch: {
        list() {
          //注意点：watch只能监听数据的变化，数据变化的时候不一定已经渲染完了
	        //      所以为了保证是渲染完成之后再去获取，我们可以借助Vue的￥nextTick方法来实现
	        //      也就是说在$nextTick回调函数中一定能拿到渲染完成所有的数据，因为$nextTick的回调函数只有渲染完成之后才会执行
          this.$nextTick(() => {  //渲染完了再加载数据
            // console.log(this.$refs.group);
            this.$refs.group.forEach(group => {
              this.groupsTop.push(group.offsetTop);
            });
          });
        }
      },
      created() {
        getAllArtists()
          .then((result) => {
            this.keys = result.keys
            this.list = result.list
          })
          .catch(function (err) {
            console.log(err)
          });
        
       
      },
      mounted() {
        this.$refs.ScrollView.scrolling((y) => {
          this.scrollY = y;
          //处理第一个区域
          if (y > 0) {
            this.currentIndex = 0;
            return;
          }
          //处理中间区域
          for (let i = 0;i<this.groupsTop.length - 1;i++) {
            let preTop = this.groupsTop[i];
            let nextTop = this.groupsTop[i + 1];
            if (-y >= preTop && -y <= nextTop) {
              this.currentIndex = i;
              return;
            }
          }
          //处理最后一个区域
          this.currentIndex = this.groupsTop.length - 1;
        });
      },
      components:{
        ScrollView
	    }
    };
</script>

<style scoped lang="scss">
	@import "../assets/css/variable";
	@import "../assets/css/mixin";
	.singer{
		width: 100%;
		height: 100%;
		.singer-wrapper{
			position: fixed;
			top: 184px;
			bottom: 0;
			left: 0;
			right: 0;
			overflow: hidden;
			@include bg_sub_color();
			.list-wrapper{
				.list-group{
					.group-title{
						@include bg_color();
						@include font_size($font_medium);
						color: #fff;
						padding: 10px 20px;
						box-sizing: border-box;
					}
					.group-item{
						display: flex;
						justify-content: flex-start;
						padding: 10px 20px;
						border-bottom: 1px solid #ccc;
						img{
							width: 100px;
							height: 100px;
							border-radius: 50%;
							overflow: hidden;
						}
						p{
							@include font_size($font_medium);
							@include font_color();
							display: flex;
							align-items: center;
							margin-left: 20px;
						}
					}
				}
			}
			.list-keys{
				position: fixed;
				right: 10px;
				top: 60%;
				transform: translateY(-50%);
				li{
					@include font_color();
					@include font_size($font_medium_s);
					padding: 3px 0;
					&.active{
						text-shadow: 0 0 10px #000;
					}
				}
			}
			.fix-title{
				position: absolute;
				left: 0;
				right: 0;
				top: 0;
				padding: 10px 20px;
				box-sizing: border-box;
				@include font_size($font_medium);
				color: #fff;
				@include bg_color();
			}
		}
	}
	.v-enter{
		transform: translateX(100%);
	}
	.v-enter-to{
		transform: translateX(0%);
	}
	.v-enter-active{
		transition: transform .5s;
	}
	.v-leave{
		transform: translateX(0%);
	}
	.v-leave-to{
		transform: translateX(100%);
	}
	.v-leave-active{
		transition: transform .5s;
	}

</style>