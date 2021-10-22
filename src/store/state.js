import mode from './modeType';

export default {
  isFullScreen: false,
  isShowMiniPlayer: false,
  isShowListPlayer: false,
  isPlaying: false,    //控制播放图标
  modeType: mode.loop,
  songs: [],
  currentSong: {},
  currentIndex: 0,
  currentLyric: {},
  curTime: 0,
  favoriteList: [],   //喜欢歌曲列表
  historyList: [], //历史列表
  loading: false  //控制加载动画
};