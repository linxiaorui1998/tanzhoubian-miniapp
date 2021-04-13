// pages/isUse/isUse.js
var QRCode = require('../../utils/weapp-qrcode')//引入生成二维码的插件
Page({

  /**
   * 页面的初始数据
   */
  data: {
    qrcodePath:null,
    show:false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

  },
  reateQrcode() {
    var that = this;
    that.setData({
      show:true
    })
      new QRCode('myQrcode', {
        text:'生成二维码要显示的内容',
        width: that.createRpx2px(200),
        height: that.createRpx2px(200),
        padding: 12, // 生成二维码四周自动留边宽度，不传入默认为0
        correctLevel: QRCode.CorrectLevel.L, // 二维码可辨识度
        callback: (res) => {
          // 接下来就可以直接调用微信小程序的api保存到本地或者将这张二维码直接画在海报上面去，看各自需求
          that.data.qrcodePath = res.path;
        }
      })
  },
  //用户二维码保存到本地相册
  saveQrcode: function () {
    var that = this;
    wx.getImageInfo({
      src: that.data.qrcodePath,
      success: function (ret) {
        var path = ret.path;
        wx.saveImageToPhotosAlbum({
          filePath: path,
          success(result) {
            if (result.errMsg === 'saveImageToPhotosAlbum:ok') {
              wx.showToast({
                title: '保存成功',
              })
            }
          }
        })
      }
    })
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