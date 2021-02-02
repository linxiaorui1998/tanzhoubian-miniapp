//index.js
//获取应用实例
const app = getApp()
var baseUrl = require('../../utils/util')
baseUrl = baseUrl.baseUrl
Page({
  data: {
      banner:[],//轮播图数据
      nowCity:'',
      iconLists:[ 
        {'icon':'icon iconfont icon-huoguo','text':'火锅'},
        {'icon':'icon iconfont icon-shousi','text':'寿司'},
        {'icon':'icon iconfont icon-xia','text':'泰国料理'},
        {'icon':'icon iconfont icon-youxi','text':'休闲娱乐'},
        {'icon':'icon iconfont icon-kouhong','text':'美容美妆'},
        {'icon':'icon iconfont icon-shaokao','text':'烧烤'},
        {'icon':'icon iconfont icon-cake','text':'甜品'},
        {'icon':'icon iconfont icon-naicha','text':'奶茶'}
      ],
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
        {
        url:'../../image/restaurant1.jpg',
        title:'太二酸菜鱼',
        star: 4,
        avarage:78,
        type:'川湘菜',
        distance:'1.02km'
       },
       {
        url:'../../image/restaurant1.jpg',
        title:'太二酸菜鱼',
        star: 5,
        avarage:78,
        type:'川湘菜',
        distance:'1.02km'
       }
    ]
  },
  //事件处理函数
  bindViewTap: function() {
   
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
  onLoad: function () {
    this.getBanner()
    this.getCity()
  },
  getUserInfo: function(e) {
   
  },
  toPage:function(){
    wx.navigateTo({
      url:"../city/city"
    })
    console.log(111);   
  },
})
