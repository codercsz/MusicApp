//专门用于管理请求各种接口地址的
import Network from './network';

export const getBanner = () => Network.get("/banner?type=2");
export const getPersonalized = () => Network.get("/personalized?limit=6") //不指定limit，默认返回30条数据
export const getNewAlbum = () => Network.get("/album/newest")
export const getNewSong = () => Network.get("/personalized/newsong")

export const getSongDetail = (data) => Network.get("/playlist/detail",data)  //获取歌单详情
export const getAlbum = (data) => Network.get("/album",data)  //获取专辑详情

export const getComment = (data) => Network.get("/comment/playlist",data)  //获取歌单评论
export const getAlbumComment = (data) => Network.get("/comment/album",data)  //获取专辑评论