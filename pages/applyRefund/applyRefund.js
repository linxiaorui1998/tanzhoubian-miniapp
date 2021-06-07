// pages/applyRefund/applyRefund.js
const baseUrl = require('../../utils/util').baseUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    message:null,
    show:false,
    actions: [
      { name: '计划有变'},
      { name: '不想要了'},
      { name: '商品问题'},
      { name: '其他原因'},
    ],
    form:{
      reason:'',
    },
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      this.init(options.id)
  },
  open:function () {
    console.log('a');
      this.setData({
        show:true
      })
  },
  onSelect:function (params) {
    this.setData({
      show:false,
      'form.reason':params.detail.name
    })
  },
  init:function (id) {
    var that = this
    wx.request({
      url:  baseUrl + `order/orderById?id=${id}`,
      method: "GET",//指定请求方式，默认get
      success: function (res) {
        that.setData({
          message: res.data
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