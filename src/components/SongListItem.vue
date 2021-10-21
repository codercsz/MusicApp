<template>
	<ul class="song-list">
		<li v-for="value in newsonlists" :key="value.id" v-on:click="showNormalPlayer(value.id)">
			<img v-lazy="value.picUrl" alt="">
			<div class="song-info">
				<div>
					<span>{{value.name}} - </span>
					<span>{{value.singer}}</span>
					<p>{{value.albumName}}</p>
				</div>
			
			</div>
		</li>
	</ul>
</template>

<script>
    import {mapActions} from "vuex";

    export default {
        name: "SongListItem",
        methods: {
            ...mapActions([
                "setFullScreen",
                'setSongDetail',
                "setMiniPlayer",
                "setIsPlaying"

            ]),
            showNormalPlayer(id) {
                this.setFullScreen(true);
                this.setSongDetail([id]);
                this.setMiniPlayer(false);
                this.setIsPlaying(true);
            }
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
	@import "../assets/css/variable";
	@import "../assets/css/mixin";
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

</style>