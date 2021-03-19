//index.js
//获取应用实例
const app = getApp()
var baseUrl = require('../../utils/util')
baseUrl = baseUrl.baseUrl
Page({
  data: {
      banner:[],//轮播图数据
      nowCity:'',
      iconLists:[],
      option1: [
        { text: '全部商品', value: 0 },
        { text: '新款商品', value: 1 },
        { text: '活动商品', value: 2 },
      ],
      value:0,
      restaurantList:[
        {url:'../../image/restaurant1.jpg',name:'小龙坎火锅'},
        {url:'../../image/restaurant2.jpg',name:'城门口老火锅'},
        {url:'../../image/restaurant3.jpg',name:'潮发牛肉火锅'},
        {url:'../../image/restaurant4.jpg',name:'外婆家'},
        {url:'../../image/restaurant5.jpg',name:'又一间茶点轩'},
        {url:'../../image/restaurant6.jpg',name:'文通冰室'},
      ],
      timeList:[
        {url:'../../image/restaurant1.jpg',name:'9.9元抢100元代金券'},
        {url:'../../image/restaurant2.jpg',name:'9.9元抢100元代金券'},
        {url:'../../image/restaurant3.jpg',name:'9.9元抢100元代金券'},
        {url:'../../image/restaurant4.jpg',name:'9.9元抢100元代金券'},
      ],
      restaurant:[
      //   {
      //   url:'../../image/restaurant1.jpg',
      //   title:'太二酸菜鱼',
      //   star: 4,
      //   avarage:78,
      //   type:'川湘菜',
      //   distance:'1.02km'
      //  },
      //  {
      //   url:'../../image/restaurant1.jpg',
      //   title:'太二酸菜鱼',
      //   star: 5,
      //   avarage:78,
      //   type:'川湘菜',
      //   distance:'1.02km'
      //  }
    ]
  },
  onLoad: function () {
    this.getBanner()
    this.getCity()
    this.getRestaurant()
    this.geticonList()
  },
  getUserInfo: function(e) {
   
  },
  toPage:function(){
    wx.navigateTo({
      url:"../city/city"
    })
  },
  toIconPage:function(e){
    console.log(e);
    let type = e.currentTarget.dataset.type
    wx.navigateTo({
      url:`../type/type?type=${type}`
    })
  },
  toRestaurant:function(e){
    let id = e.currentTarget.dataset.id;
    wx.navigateTo({
      url:`../restaurant/restaurant?id=${id}`
    })
  },
   //获取当前城市
   getCity:function(){
    const that = this
    wx.getLocation({
      success:function(value){
        wx.request({
          url:baseUrl + `city/local?key=6325483d7a196109808539ae8bf3f732&location=${value.longitude},${value.latitude}`,
          success:function(data){
            that.setData({
              nowCity: data.data
            })
            app.globalData.glo_nowCity = data.data
            app.globalData.longitude = value.longitude
            app.globalData.latitude = value.latitude
          }
      })
      }
    })
    
  },
  //获取首页轮播图
  getBanner:function(){
    var that =this
    console.log(111);
    wx.request({
      url: 'http://127.0.0.1:3000/banner',
      success:function(data){
        let  data1 = data.data.map((item)=>{ return item.url = baseUrl + item.url})
        console.log(data1);
        that.setData({
          banner:data1
        })
      }
    })
  },
  //获取iconList列表
  geticonList:function(){
    let that = this
    wx.request({
      url: baseUrl + `city/iconList`,
      success: (result)=>{
        that.setData({
          iconLists: result.data 
        })
        console.log(result.data);
      }
    });
  },
  //获取餐厅列表
  getRestaurant:function(){
    let that = this
    wx.getLocation({
      success:function(value){
        wx.request({
          url: baseUrl + `restaurantList?longitude=${value.longitude}&latitude=${value.latitude}`,
          success: (result)=>{
            that.setData({
              restaurant: result.data 
            })
            console.log(result.data);
          },
          fail: ()=>{},
          complete: ()=>{}
        });
      }
    })
  }
})
