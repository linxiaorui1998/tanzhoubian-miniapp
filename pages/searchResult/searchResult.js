// pages/searchResult/searchResult.js
const baseUrl = require('../../utils/util').baseUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    active: 0,
    value:null,
    coupon:null,
    restaurant:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let value = options.value
    this.setData({
      value:value
    })
    this.init()
  },
  toRestaurant:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:`../restaurant/restaurant?id=${id}`
    })
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },
  init:function(){
    let that = this
    wx.request({
      url: baseUrl + `search/coupon?value=${this.data.value}`,
      success:function(data){
        that.setData({
          coupon: data.data
        })
      }
     })

     wx.request({
      url: baseUrl + `search/restaurant?value=${this.data.value}`,
      success:function(data){
        that.setData({
          restaurant: data.data
        })
      }
     })


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