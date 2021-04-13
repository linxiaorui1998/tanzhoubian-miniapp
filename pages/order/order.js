// pages/order/order.js
const baseUrl = require('../../utils/util').baseUrl
const  app =  getApp();
Page({
  /**
   * 页面的初始数据
   */
  data: {
    message:null,
    type:null,
    id:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options.id);
    let type = options.type
    let that = this
    wx.request({
      url: baseUrl + `search/${type}?id=${options.id}`,
      success:function(data){
        that.setData({
          message:data.data[0],
          type:type,
          id:options.id
        })
      }
    })
  },
  back:function(){
    wx.navigateBack({
      delta: 1
    });
  },
  buy:function(){
    let openid=null
    let that = this
    wx.getStorage({
      key:'session',
      success:function(data) {
          openid = data.data.openid
      }
    })
    wx.request({
      url: baseUrl + `order/add`,
      method:"POST",
      data:{
        time:new Date(),
        openid:openid,
        buy_type: that.data.type,
        buy_id: that.data.id,
      },
      success:function(data){
        wx.showToast({
          title:"购买成功"
        })
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