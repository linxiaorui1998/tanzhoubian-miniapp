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
    id:null,
    restaurantID:null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    let type = options.type
    let that = this
    wx.request({
      url: baseUrl + `search/${type}?id=${options.id}`,
      success:function(data){
        that.setData({
          message:data.data[0],
          type:type,
          id:options.id,
          restaurantID:options.restaurantID
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
    var now = new Date();
    var year = now.getFullYear(); //得到年份
    var month = now.getMonth()+1;//得到月份
    var date = now.getDate();//得到日期
    var hour= now.getHours();//得到小时数
    var minute= now.getMinutes();//得到分钟数
    var second= now.getSeconds();//得到秒数
    var time = year + '-' + month + '-' + date + ' ' + hour + ':' + minute + ':' + second
    wx.getStorage({
      key:'session',
      success:function(data) {
        openid = data.data.openid
        wx.request({
          url: baseUrl + `order/add`,
          method:"POST",
          data:{
            time: time,
            openid:openid,
            buy_type: that.data.type,
            buy_id: that.data.id,
            restaurantID:that.data.restaurantID,
            buy_price:1,
            status:1
          },
          success:function(data){
            wx.showToast({
              title:"购买成功"
            })
          }
       })
      },
      fail:function (err) {
          console.log(err,"我是错误");
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