//index.js
//获取应用实例
const app = getApp()
var baseUrl = require('../../utils/util')
baseUrl = baseUrl.baseUrl
Page({
  data: {
      banner:[],//轮播图数据
      nowCity:'',
      iconLists:[],
      option1: [
        { text: '粤菜', value: '粤菜' },
        { text: '闽菜', value: '闽菜' },
        { text: '苏菜', value: '苏菜' },
        { text: '浙菜', value: '浙菜' },
        { text: '徽菜', value: '徽菜' },
        { text: '川菜', value: '川菜' },
        { text: '鲁菜', value: '鲁菜' },
        { text: '湘菜', value: '湘菜' },
      ],
      option3:[
        { text: '距离远近', value: 1 },
        { text: '价格高低', value: 2 },
        { text: '评分大小', value: 3 },
      ],
      restaurantList:[
        {url:'../../image/restaurant1.jpg',name:'小龙坎火锅'},
        {url:'../../image/restaurant2.jpg',name:'城门口老火锅'},
        {url:'../../image/restaurant3.jpg',name:'潮发牛肉火锅'},
        {url:'../../image/restaurant4.jpg',name:'外婆家'},
        {url:'../../image/restaurant5.jpg',name:'又一间茶点轩'},
        {url:'../../image/restaurant6.jpg',name:'文通冰室'},
      ],
      timeList:[],
      restaurant:[]
  },
  onLoad: function () {
    this.getBanner()
    this.getCity()
    this.geticonList()
    this.getTime()
  },
  onShow: function () {
    // this.getCity()
   
  },
  toPage:function(){
    wx.navigateTo({
      url:"../city/city"
    })
  },
  select:function(change){
    let that = this
    wx.request({
      url: baseUrl + `restaurantList?longitude=${app.globalData.longitude}&latitude=${app.globalData.latitude}&cuisine=${change.detail}`,
        success: (result)=>{
          that.setData({
            restaurant: result.data 
          })
          console.log(result.data);
        },
        fail: ()=>{},
        complete: ()=>{}
      });
  },
  select1:function(change){
      if(change.detail === 1) {
        this.setData({
          restaurant: this.data.restaurant.sort((a,b)=>{return parseFloat(b.distance) - parseFloat(a.distance)})
        })
      }else if(change.detail === 2){
        this.setData({
          restaurant: this.data.restaurant.sort((a,b)=>{return a.average - b.average})
        })
      }else if(change.detail === 3) {
        this.setData({
          restaurant: this.data.restaurant.sort((a,b)=>{return b.score - a.score})
        })
      }
  },
  buy:function(e){
    wx.navigateTo({url:`../order/order?id=${e.currentTarget.dataset.id}&type=coupons&restaurantID=${e.currentTarget.dataset.restaurantid}`})
  },
  topage1:function(){
    wx.navigateTo({
      url:"../search/search"
    })
  },
  toIconPage:function(e){
    console.log(e);
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url:`../type/type?type=${type}`
    })
  },
  toRestaurant:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:`../restaurant/restaurant?id=${id}`
    })
  },
  getTime:function(){
    let that = this
    wx.request({
      url:baseUrl + `search/couponList`,
      success:function(data){
        console.log(data,"限时");
        that.setData({
          timeList:data.data
        })
      }
  })
  },
   //获取当前城市
   getCity:function(){
     if(app.globalData.glo_nowCity === null) {
      const that = this
      wx.getLocation({
        success:function(value){
          console.log(value,"当前位置");
          wx.request({
            url:baseUrl + `city/local?key=6325483d7a196109808539ae8bf3f732&location=${value.longitude},${value.latitude}`,
            success:function(data){
              app.globalData.glo_nowCity = data.data
              app.globalData.longitude = value.longitude
              app.globalData.latitude = value.latitude
              that.setData({
                nowCity: app.globalData.glo_nowCity 
              })
              that.getRestaurant()
            }
        })
        }
      })
     }else {
      this.setData({
        nowCity: app.globalData.glo_nowCity 
      })
      this.getRestaurant()
      // wx.request({
      //   url: baseUrl + `restaurantList?longitude=${app.globalData.longitude}&latitude=${app.globalData.latitude}`,
      //     success: (result)=>{
      //       this.setData({
      //         restaurant: result.data 
      //       })
      //       console.log(result.data);
      //     },
      //     fail: ()=>{},
      //     complete: ()=>{}
      //   });
     }
     
  },
  //获取首页轮播图
  getBanner:function(){
    var that =this
    console.log(111);
    wx.request({
      url: 'http://127.0.0.1:3000/banner',
      success:function(data){
        that.setData({
          banner:data.data
        })
        console.log(data.data,"我是轮播图");
      }
    })
  },
  //获取iconList列表
  geticonList:function(){
    let that = this
    wx.request({
      url: baseUrl + `city/iconList`,
      success: (result)=>{
        that.setData({
          iconLists: result.data 
        })
        console.log(result.data);
      }
    });
  },
  //获取餐厅列表
  getRestaurant:function(){
    let that = this
    wx.request({
      url: baseUrl + `restaurantList?longitude=${app.globalData.longitude}&latitude=${app.globalData.latitude}`,
        success: (result)=>{
          that.setData({
            restaurant: result.data 
          })
          console.log(result.data);
        },
        fail: ()=>{},
        complete: ()=>{}
      });

  }
})
