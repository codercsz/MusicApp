import {getSongsDetail,getLyric,getSongUrl} from '../api/index';

export default {
    setFullScreen({commit}, flag) {
        commit('changeFullScreen', flag);
    },
    setMiniPlayer({commit}, flag) {
        commit("changeMiniPlayer",flag)
    },
    setIsPlaying({commit}, flag) {
        commit("changeIsPlaying",flag)
    },
    setModeType({commit}, flag) {
        commit("changeModeType",flag)
    },
    setListPlayer({commit}, flag) {
        commit("changeListPlayer",flag)
    },

    async setSongDetail({commit}, ids) {
        let result = await getSongsDetail({ids: ids.join(',')})
        let songUrls = await getSongUrl({id: ids.join(',')})
        let list = [];
        result.songs.forEach(function (value,i) {
            let obj = {};
            for (let j = 0; j < songUrls.data.length; j++) {
                let item = songUrls.data[j];
                if (value.id === item.id) {
                    obj.urls = item.url;
                }
            }
            obj.name = value.name;
            // obj.urls = songUrls.data[i].url;
            let singer = '';
            value['ar'].forEach(function (item, index) {
                if (index === 0) {
                    singer = item.name;   //判断是否只有一个演唱者
                } else {
                    singer += '-' + item.name;
                }
            });
            obj.singer = singer;
            obj.picUrl = value['al'].picUrl;
            obj.id = value.id;
            list.push(obj);
        });
        commit("setSongDetail", list);
    },
    async getSongLyric({commit}, id) {
        let result = await getLyric({id: id});
        // console.log(result.lrc.lyric);
        let obj = parseLyric(result.lrc.lyric);
        // obj.lyric = "暂时没有歌词";
        commit("setSongLyric",obj)
    },
    setDelSong({commit}, index) {
        commit("setDelSong", index);
    },
    setCurrentIndex({commit}, index) {
        commit("setCurrentIndex", index);
    },
    setCurrentTime({commit}, time) {
        commit("setCurrentTime", time);
    },
    setFavoriteList({commit}, song) {
        commit("setFavoriteList", song);
    },
    setLikeList({commit},list) {
        commit("setLikeList", list);
    },
    setHistoryList({commit},list) {
        commit("setHistoryList", list);
    },
    setHistorySong({commit},song) {
        commit("setHistorySong", song);
    },
};
function parseLyric (lrc) {
    let lyrics = lrc.split('\n')
    // [00:00.000] 作曲 : 林俊杰
    // 1.定义正则表达式提取[00:00.000]
    let reg1 = /\[\d*:\d*\.\d*\]/g
    // 2.定义正则表达式提取 [00
    let reg2 = /\[\d*/i
    // 3.定义正则表达式提取 :00
    let reg3 = /\:\d*/i
    // 4.定义对象保存处理好的歌词
    let lyricObj = {}
    lyrics.forEach(function (lyric) {
        // 1.提取时间
        let timeStr = lyric.match(reg1)
        if (!timeStr) { return }
        timeStr = timeStr[0]
        // 2.提取分钟
        let minStr = timeStr.match(reg2)[0].substr(1)
        // 3.提取秒钟
        let secondStr = timeStr.match(reg3)[0].substr(1)
        // 4.合并时间, 将分钟和秒钟都合并为秒钟
        let time = parseInt(minStr) * 60 + parseInt(secondStr)
        // 5.处理歌词
        let text = lyric.replace(reg1, '').trim()
        // 6.保存数据
        lyricObj[time] = text
    })
    return lyricObj
}
