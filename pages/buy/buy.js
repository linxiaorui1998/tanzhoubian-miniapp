// pages/buy/buy.js
var baseUrl = require('../../utils/util')
Page({
  data: {
    timeList:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  getApi(){
    let that = this
    wx.request({
      url:baseUrl + `search/couponList`,
      success:function(data){
        that.setData({
          timeList:data.data
        })
        console.log('触发');
      }
  })
  },
  onLoad: function () {
    // console.log(111);
    
  console.log('大傻逼')
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