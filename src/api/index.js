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

export const getSongsDetail = data => Network.get('/song/detail', data);   //获取歌曲详情

export const getLyric = data => Network.get('/lyric', data);   //获取歌词

export const getSongUrl = data => Network.get('/song/url', data);   //获取歌曲播放地址
export const getSingerDetail = data => Network.get('/artists', data);   //获取歌曲播放地址
export const getSearchList = data => Network.get('/cloudsearch?type', data);   //获取搜索列表
export const getHotList = () => Network.get('/search/hot');   //获取热门搜索列表





//获取热门歌手
export const getHotArtists = ()=> {
    return new Promise(function (resolve, reject) {
        Network.get('/top/artists?offset=0&limit=5').then((result) => {
            resolve(result.artists);
        }).catch(err => {
            reject(err);
        });

    });
}

export const getLetterArtists = (letter)=> {
  return new Promise(function (resolve, reject) {
    let lettersArtists = [];
    Network.all([
      Network.get(`/artist/list?offset=0&limit=5&area=7&initial=${letter}`),
      Network.get(`/artist/list?offset=0&limit=5&area=96&initial=${letter}`),
      Network.get(`/artist/list?offset=0&limit=5&area=0&initial=${letter}`),
      Network.get(`/artist/list?offset=0&limit=5&area=8&initial=${letter}`),
      Network.get(`/artist/list?offset=0&limit=5&area=16&initial=${letter}`),
    ]).then((result) => {
      result.forEach(item => {
        lettersArtists.push(...item.artists);  //解构
      });
      resolve(lettersArtists);
    }).catch(err => {
      reject(err);
    });
    
  });
}

export const getAllArtists = (letter) => {
  return new Promise(function (resolve,reject) {
    let keys = ['热']
    let list = [getHotArtists()];
    for (let i = 65; i < 91; i++) {  //A-Z
      let char = String.fromCharCode(i);
      keys.push(char);
      list.push(getLetterArtists(char));
    }
    Network.all(list)
      .then(function(result){
        let obj = {};
        obj.keys = keys;
        obj.list = result;
        resolve(obj);
      }).catch(err => {
      console.log(err);
    });
  })

};


//获取排行榜数据

export const getTopListDetail = () => {
  return new Promise(function (resolve, reject) {
    let category = {
      officialList: [
        {name: '飙升榜', id: 3},
        {name: '新歌榜', id: 0},
        {name: '原创榜', id: 2},
        {name: '热歌榜', id: 1},
        
      ],
      recList: [
        { name: '云音乐说唱榜', id: 23 },
        { name: '云音乐电音榜', id: 25 },
        { name: '云音乐欧美新歌榜', id: 32 },
        { name: '云音乐古典榜', id: 24 }
      ],
      globalList: [
        { name: '美国Billboard榜', id: 6 },
        { name: 'UK排行榜周榜', id: 5 },
        { name: 'Beatport全球电子舞曲榜', id: 21 },
        { name: '日本Oricon榜', id: 10 },
        { name: '云音乐欧美热歌榜', id: 8 },
      ],
      otherList: [
        { name: 'KTV唛榜', id: 7 },
        { name: '法国 NRJ Vos Hits 周榜', id: 19 },
        { name: '云音乐韩语榜', id: 28 },
        { name: '云音乐国电榜', id: 30 },
      ],
      titles: { officialList: '官方榜', recList: '推荐榜', globalList: '全球榜', otherList: '更多榜单' }
    }
    Network.get('/toplist/detail').then(data => {
      console.log(data);
      data.list.forEach((obj => {
        let flag = false;
        for (let key in category) {
          for (let i = 0; i < category[key].length; i++) {
            if (category[key][i].name === obj.name) {
              category[key][i].rank = obj;
              flag = true;
              break;
            }
          }
          if (flag) {
            break;
          }
        }
    
      }));
      resolve(category);
    }).catch(err => {
      reject(err);
    });
  });
};

