Page({
  data: {
  locationname:"",
  introduction:"",
  imagesrc:"",
  polyline: [],
  location_e:[],
  showModal: false,
   marks:[{
    locationname:"杭州动物园",
    introduction:"杭州动物园，是中国七大动物园之一，动物园位于杭州西湖之南，大慈山的白鹤峰下，园区占地20公顷是一座集野生动物保护、科研、科普、教育和游览于一体的山林式动物园。",
    imagesrc:"../../image/symbol.png",
    longitude:"120.13294", //杭州动物园
    latitude:"30.21242",
    iconPath:"../../icons/marker.png",
    width:30,
    height:30
   },
   {
    locationname:"熊山",
    introduction:"杭州动物园建有三个熊圈，也饲养着三种熊：黑熊、棕熊和马熊，黑熊每年一月份都会产仔。如果大家能仔细的观察熊山的石头摆放方法，会发现熊山有很多“熊石雕”，真的很美哟!",
    imagesrc:"../../image/bear.png",
    longitude:"120.131971", //熊山
    latitude:"30.212256",
    iconPath:"../../icons/marker.png",
    width:30,
    height:30
   },
   {
    locationname:"大象馆",
    introduction:"杭州动物园象房座落于动物园中心位置，内室有3间，外活动场2个，可以同时饲养3只大象。杭州动物园的目前饲养有2头亚洲象，它们于1982年来自云南省个旧市动物园，是两只野生亚洲象。",
    imagesrc:"../../image/elephant.png",
    longitude:"120.13321", //大象馆
    latitude:"30.21364",
    iconPath:"../../icons/marker.png",
    width:30,
    height:30
   },
   {
    locationname:"猴房",
    introduction:"珍猴馆位于熊猫馆、猴山附近。这里所居住的都是一些珍贵、稀有的灵长类动物，有和人类有98%以上相似基因的黑猩猩，国家一级保护动物川金丝猴、白颊长臂猿，还有原产地在非洲的山魈、赤猴、黑白疣猴等非常美丽的动物。",
    imagesrc:"../../image/monkey.png",
    longitude:"120.133352", //猴房
    latitude:"30.212731",
    iconPath:"../../icons/marker.png",
    width:30,
    height:30
   }],


  },

  checkdetials(e){
    console.log(this.data.marks[e.detail.markerId-900000000]);
    var location=this.data.marks[e.detail.markerId-900000000];
    //wx.showModal({
    //  title:location.locationname,
    //  content:location.introduction,
    //  showCancel:false
    //})
    this.setData({
      showModal:true,
      locationname:location.locationname,
      introduction:location.introduction,
      imagesrc:location.imagesrc
    })
  },

  hideModal: function () {
    this.setData({
      showModal: false
    });
  },
  onCancel: function () {
    this.hideModal();
  },
  onConfirm: function () {
    this.hideModal();
  },
  checkLogin:function(){

  },

  onLoad:function(options){ 
    
  },

  onShow(){
    var pages = getCurrentPages();
    var currPage = pages[pages.length - 1];
    //console.log(currPage.__data__.location_e);//此处既是上一页面传递过来的值

    var that=this;
    var location_e=currPage.__data__.location_e;
    that.setData({
      polyline: [{
        points:location_e,
        color: "#FFA500",
        width: 5,
        dottedLine: true
      }],
    })
  },
    gotoRelease:function(){//点击清除路线
      this.onLoad()
      this.setData({
        polyline:null
      })
  }


})