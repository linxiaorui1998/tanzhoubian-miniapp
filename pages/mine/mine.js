// pages/mine/mine.js
const app = getApp()
var baseUrl = require('../../utils/util').baseUrl
Page({
  data: {
    avatarUrl:'',
    name:'',
    user: false,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    let that = this
    wx.checkSession({
      success: (result)=>{
        wx.getStorage({
          key: 'session',
          success: (result)=>{
            that.setData({
              user:true
            })
          },
        });
      },
      fail:()=>{
        that.setData({
          user:false
        })
      }
    });
  },
  goto:function(){
    wx.navigateTo({
      url: '../test/test',
    })
  },
  login:function(){
    var that = this
    setTimeout(function(){
      wx.login({//首先调用微信官方登录接口获取用户信息，然后发动请求到后端，
        success:(result)=>{
          console.log(baseUrl + 'login','登录1');
          wx.request({
            url: baseUrl + 'login',
            data: {
              code: result.code
            },
            method: 'POST',
            success:(res)=>{
              console.log('登录2');
              wx.setStorage(
                {
                key: 'session',
                data: res.data,
                }
              );
              that.setData({
                user:true
              })
            },
            fail:function (err) {
                console.log(err,"错误");
            }
          })
        }
      })
    },2000)
  
  },
  to:function(){
    wx.navigateTo({
      url: '../myOrder/myOrder',
    });
  },
  isUse:function() {
    wx.navigateTo({
      url: '../isUse/isUse',
    });
  },
  Used:function() {
    wx.navigateTo({
      url: '../Used/Used',
    });
  },
  noCommend:function () {
    wx.navigateTo({
      url: '../noCommend/noCommend',
    });
  },
  refund:function () {
    wx.navigateTo({
      url: '../refund/refund',
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