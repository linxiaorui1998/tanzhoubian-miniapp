// pages/city/city.js
const base = require('../../utils/util').baseUrl
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotCity:["上海","北京","广州","深圳","杭州","成都","武汉","南京","天津"],
    city:[],
    english:[
      'A','B','C','D','E','F','G',
      'H','Y','J','K','L','M','N',
      'O','P','Q','R','S','T',
      'U','V','W','X','Y','Z'
    ],
    toView:null,
    nowCity:''
  },

  click:function(e){
    this.setData({
      toView:e.currentTarget.id
    })
    wx.showToast({title:e.currentTarget.id,icon:'none'})
  },
  sel:function(e){
    let that = this
    wx.request({
      url: base + `city/selCity?address=${e.currentTarget.dataset.nowcity}`,//获取小程序定位接口，base是定义的请求路径的基路径
      success: (result)=>{
        console.log(result);
        app.globalData.glo_nowCity = e.currentTarget.dataset.nowcity
        app.globalData.longitude = result.data.message.split(',')[0]
        app.globalData.latitude = result.data.message.split(',')[1]
        app.globalData.glo_nowCity = e.currentTarget.dataset.nowcity
        wx.switchTab({
          url:"../index/index"
        })
        console.log(app.globalData);
      },
      fail: ()=>{},
      complete: ()=>{}
    });
     
  },
  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let that = this
   wx.request({
      url: base + 'city',//获取小程序定位接口，base是定义的请求路径的基路径
      success: (result)=>{
        that.setData({
          city: result.data.city,
          nowCity: app.globalData.glo_nowCity
        })
        console.log(that.data.city);
      },
      fail: ()=>{},
      complete: ()=>{}
    });
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