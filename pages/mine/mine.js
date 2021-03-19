// pages/mine/mine.js
var baseUrl = require('../../utils/util').baseUrl
Page({

  /**
   * 页面的初始数据
   */
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
  //获取用户信息
  getUser:function(){
    let that = this
    wx.getUserInfo({
      success(res){
        console.log(res,"用户数据");
        that.setData({
          avatarUrl : res.userInfo.avatarUrl,
          name : res.userInfo.nickName,
          user: true
        })
        console.log(res.userInfo.avatarUrl);
      },
      fail:function(error){
        console.log(error);
       
      }
    });
  },
  login:function(){
    var that = this
    setTimeout(function(){
      wx.login({
        success:(result)=>{
          var reqTask = wx.request({
            url: baseUrl + 'login',
            data: {
              code: result.code
            },
            method: 'POST',
            success:(res)=>{
              wx.setStorage(
                {
                key: 'session',
                data: res.data,
                }
              );
              that.getUser()
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