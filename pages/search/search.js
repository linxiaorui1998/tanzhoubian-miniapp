// pages/search/search.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    hotSearch:['火锅','自助餐','寿司','韩料'],
    input:''
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  select:function(e){
    this.setData({
      input:e.currentTarget.dataset.item
    })
    this.search()
  },
  input:function(event){
    this.setData({
      input:event.detail.value
    })
  },
  search:function(){
    wx.navigateTo({
      url:'../searchResult/searchResult?value=' + this.data.input
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