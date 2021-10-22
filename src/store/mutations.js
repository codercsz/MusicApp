export default {
    changeFullScreen(state, flag) {
        state.isFullScreen = flag;
      state.isShowMiniPlayer = false;
      state.isShowListPlayer = false;
      
    },

    changeMiniPlayer(state, flag) {
        state.isShowMiniPlayer = flag;
    },
    changeIsPlaying(state, flag) {
        state.isPlaying = flag;
    },
    changeModeType(state, flag) {
        state.modeType = flag;
    },
    changeListPlayer(state, flag) {
        state.isShowListPlayer = flag;
    },
    setSongDetail(state, list) {
      state.songs = list;
      state.isPlaying = true;
    },
    setSongLyric(state, list) {
        state.currentLyric = list;
    },
    setDelSong(state, index) {
        if (index !== undefined) {
            state.songs.splice(index, 1);
        }else {
            state.songs = [];
        }
        if (index < state.currentIndex) {
            state.currentIndex = state.currentIndex - 1;
        }
        if (state.songs.length === 0) {
            state.isShowListPlayer = false;
            state.isShowMiniPlayer = false;
            state.isFullScreen = false;
        }
},
    setCurrentIndex(state, index) {
        if (index < 0) {
            index = state.songs.length - 1;
        } else if (index > this.state.songs.length - 1) {
            index = 0;
        }
        state.currentIndex = index;
    },
    setCurrentTime(state, time) {
        state.curTime = time;
    },
    setFavoriteList(state, song) {
        let result = state.favoriteList.find(function (currentValue) {
            return currentValue.id === song.id;
        });
        if (result === undefined) {
            state.favoriteList.push(song);
        }
    },
    setLikeList(state, list) {
        state.favoriteList = list;
    },
    setHistoryList(state, list) {
        state.historyList = list;
    },
    setHistorySong(state, song) {
        let result = state.historyList.find(function (currentValue) {
            return currentValue.id === song.id;  //判断id
        });
        //如果缓存的历史大于30，则删除第一首

        if (result === undefined) {
            if (state.historyList.length > 30) {
                state.historyList.splice(0, 1);
            }
            state.historyList.push(song);
        }
    },
    setLoading(state, flag) {
      state.loading = flag;
    }
  
}