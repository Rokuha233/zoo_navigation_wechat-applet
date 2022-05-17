// pages/mine/mine.js
Page({
 
    /**
     * 页面的初始数据
     */
    data: {
      currentIndex: 0,
      "bear": [{
           location:"熊山",
           name: 'bear1', 
           introduction: '1'
         },
         {
           location:"熊山",
           name: 'bear2', 
           introduction: '2'  
         }
        ],
        "elephant": [{
            location:"大象馆",
            name: 'elephant1', 
            introduction: '1'
          },
          {
            location:"大象馆",
            name: 'elephant2', 
            introduction: '2'  
          }
         ],
         "monkey": [{
            location:"猴房",
            name: 'monkey1', 
            introduction: '1'
          },
          {
            location:"猴房",
            name: 'monkey2', 
            introduction: '2'  
          }
         ],
         userInfo:{},
         nickName:"",
         islogin:"",
         ticket:"",
         book:"",
         location:""
    },

    onShow(){
        const islogin=wx.getStorageSync("islogin");      //在本地缓存中获取数据  
        const nickName=wx.getStorageSync("nickName");
        const ticket=wx.getStorageSync("ticket");
        const book=wx.getStorageSync("book");
        this.setData({islogin,nickName,ticket,book});
          
      },
   
    //swiper切换时会调用
    pagechange: function (e) {
      if ("touch" === e.detail.source) {
        let currentPageIndex = this.data.currentIndex
        currentPageIndex = (currentPageIndex + 1) % 3
        this.setData({
          currentIndex: currentPageIndex
        })
      }
    },
    //用户点击tab时调用
    titleClick: function (e) {
      let currentPageIndex =
        this.setData({
          //拿到当前索引并动态改变
          currentIndex: e.currentTarget.dataset.idx
        })
    },

    bookzoo(){
        var islogin=this.data.islogin;
      if (islogin==1) {
        wx.navigateTo({
          url: '../seltic/seltic',
        })
      }
      else{
        wx.showModal({
          title: '提示',
          content: '请先于个人中心登录！',
          showCancel: false,
          success (res) {
          }
        })

      }
      

    }
   
  })