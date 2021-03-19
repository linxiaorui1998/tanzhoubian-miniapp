// pages/restaurant/restaurant.js
const baseUrl = require('../../utils/util').baseUrl
const  app =  getApp();
let amapFile = require("../../libs/amap-wx");
// 高德开发者key
let key = '6325483d7a196109808539ae8bf3f732';
let myAmapFun = new amapFile.AMapWX({ key:'高德key' })
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:null,
    imageNUm:1260 + "rpx",
    latitude: '23.42817',
    longitude: '113.251281',
    name: '大龙燚火锅',
    desc: '大龙燚火锅',
    active: 0,
    discounts:[],
    menus:[],
    openid:'',
    supported:[],
    class:'supported'
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let id = options.id
    this.init(id)
    
  },
  clickAddress() {
    let { latitude, longitude, name, desc } = this.data;
    wx.openLocation({
      latitude: +latitude,
      longitude: +longitude,
      name,
      address: desc
    })
  },
  tellPhone:function(){
    wx.makePhoneCall({
      phoneNumber: '17876659083'
    })
  },
  init: function(id){
    let that = this
    let longitude = app.globalData.longitude
    let latitude = app.globalData.latitude
    wx.getStorage({
      key: 'session',
      success: function(res){
        // success
        that.setData({
          openid:res.data.openid
        })
        that.getSupport()
          //获取饭店菜单
          wx.request({
            url: baseUrl + `restauranMessage/menus?id=${id}&openid=${res.data.openid}`,
            success:function(data){
              that.setData({
                menus: data.data
              })
            }
          })
      }
    })
    wx.request({
      url: baseUrl + `restaurantList?longitude=${longitude}&latitude=${latitude}&id=${id}`,
      success:function(data){
        that.setData({
          message: data.data[0]
        })
        console.log(data.data[0].backGroundColor);
        wx.setNavigationBarColor({
          frontColor: "#ffffff",
          backgroundColor: data.data[0].backGroundColor,     
          })
      }
     })
     
     //获取优惠列表
     wx.request({
      url: baseUrl + `restauranMessage/?id=${id}`,
      success:function(data){
        that.setData({
          discounts: data.data
        })
      }
     })

   
  },
  // 获取用户所有点赞菜
  getSupport:function(){
    let that = this
    wx.request({
      url: baseUrl + `restauranMessage/supported?openid=${this.data.openid}`,
      success:function(data){
        console.log(data);
        that.setData({
          supported:data.data.menus
        })
      }
     })
  },
  back:function(){
    wx.navigateBack({
      delta: 1
    });
  },
  //点赞
  support:function(e){
    var num = e.currentTarget.dataset.ids
    var index = e.currentTarget.dataset.index
    var that = this
    wx.request({
      url:  baseUrl + `restauranMessage/changeSupport`,
      method: "POST",//指定请求方式，默认get
      data: { id: num,openid:this.data.openid},
      header: {
        //默认值'Content-Type': 'application/json'
        // 'content-type': 'application/x-www-form-urlencoded' //post
      },
      success: function (res) {
          if(res == 'ok') {
            wx.request({
              url: baseUrl + `restauranMessage/menus?id=${num}&openid=${this.data.openid}`,
              success:function(data){
                that.setData({
                  menus: data.data
                })
              }
            })
          }
      }
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  }
})