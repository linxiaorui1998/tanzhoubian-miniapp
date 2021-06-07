// pages/isUse/isUse.js
var QRCode = require('../../utils/weapp-qrcode')//引入生成二维码的插件
const baseUrl = require('../../utils/util').baseUrl
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcodePath:null,
    show:false,
    openid:null,
    list:[],
    time:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init()
  },
  init:function (params) {
    let that = this
    wx.getStorage({
      key: 'session',
      success: function(res){
        that.setData({
          openid:res.data.openid
        })
        wx.request({
          url: baseUrl + `order/canUseOrder?openid=${res.data.openid}&type=${2}`,
          success:function(data){
            that.setData({
              list:data.data
            })
          }
        })
      }
    })
    
  },
  reateQrcode(e) {
    var _id = e.currentTarget.dataset.id
    var that = this;
    that.setData({
      show:true,
      time: Date.parse(new Date()),
      id:_id
    })
    new QRCode(`${_id}${that.data.time}`, {
      text: _id,
      width: that.createRpx2px(400),
      height: that.createRpx2px(400),
      padding: 12, // 生成二维码四周自动留边宽度，不传入默认为0
      // correctLevel: QRCode.CorrectLevel.L, // 二维码可辨识度
    })
   
  },
  onClickHide() {
    this.setData({ show: false});
  },
  createRpx2px(rpx) {
    return wx.getSystemInfoSync().windowWidth / 750 * rpx
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