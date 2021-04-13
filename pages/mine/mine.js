// pages/mine/mine.js
const app = getApp()
var baseUrl = require('../../utils/util')
Page({
  data: {
    avatarUrl:'',
    name:'',
    user: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo')
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) { 
    let that = this
    wx.getSetting({
      success (res){
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称
          wx.getUserInfo({
            success: function(res) {
              console.log(res.userInfo)
            }
          })
        }
      }
    }),
    wx.checkSession({
      success: (result)=>{
        wx.getStorage({
          key: 'session',
          success: (result)=>{
            that.getUser()
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
  bindGetUserInfo (e) {
    console.log(e.detail.userInfo)
  },
  //获取用户信息
  getUserInfo:function(){
    let that = this
    wx.getUserInfo({
      success(res){
        console.log(res,"成功");
        that.setData({
          avatarUrl : res.userInfo.avatarUrl,
          name : res.userInfo.nickName,
          user: true
        })
      },
      fail:function(error){
        console.log(error,"失败");
      }
    });
  },
  // getNoUseOrder:function (params) {
  //   let openid = null
  //   wx.getStorage({
  //     key:'session',
  //     success:function (params) {
  //       openid = params.data.openid
  //     }
  //   })
  //   wx.request({
  //     url: baseUrl + `order/nouse?openid=${openid}`,
  //     success:function(data){
  //       console.log(data);
  //     }
  //    })
  // },
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
          var reqTask = wx.request({
            url: baseUrl + 'login',
            data: {
              code: result.code
            },
            method: 'POST',
            success:(res)=>{
              console.log(res);
              wx.setStorage(
                {
                key: 'session',
                data: res.data,
                }
              );
              that.getUserInfo()
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