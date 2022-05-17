// pages/mine/mine.js
Page({
 
    /**
     * 页面的初始数据
     */
    data: {
      currentIndex: 0,
      ticketList: [],
      bookList: [],
      nickName:"",
      book:"",
      book_id:"",
      location:"",//园区名字字符串
      location_e:[]//每个园区经纬度
     //testlist:[{book_id:"0",idcard:"111",date:"222",location:[
     //        {longitude: 120.131971,latitude: 30.212256},
     //        {longitude: 120.133352,latitude: 30.212731}
     //         ]},
     //         {book_id:"0",idcard:"333",date:"33",location:[
     //         {longitude: 120.131971,latitude: 30.212256},
     //         {longitude: 120.13321,latitude: 30.21364}
     //         ]
     //         }
     //         ]
     //testlist的location仅用于测试，与data的location意义不同
    },
   
    onShow(){
      const nickName=wx.getStorageSync("nickName");      //在本地缓存中获取数据  
      this.setData({nickName});
        
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

    bookLine(e){//选择指定预约规划路线

        var bookList=this.data.bookList;

        var index=e.currentTarget.dataset.idx;
        //var location=JSON.parse(bookList[index].location);//选择的园区，将location字符串转数组
        var location=bookList[index].location;//选择的园区，不转数组
        this.setData({
          location:location
        });

        var that=this;
        wx.request({   //向后端发送请求
          url: 'url',// 后端url
          data:{    //前端发送给后端的值
          location:that.data.location   //location字符串进行模糊查询
          },
          method:"GET",//请求方式
          success(res){
            that.setData({       //从后端获取值
              location_e:res.location_e   //获得每个园区经纬度
            });
          }
        })

        var pages = getCurrentPages();
        var prevPage = pages[pages.length - 2];//上一个页面
        //直接调用上一个页面的setData()方法，把数据存到上一个页面中去
        prevPage.setData({
          location_e:location_e
        }),
        //console.log(location);
    

        wx.navigateBack({
           url: '../index/index',
        })

    },  
   
    onLoad:function(options){ 
      var that=this;
      wx.request({   //向后端发送请求
        url: 'url',// 后端url
        data:{    //前端发送给后端的值
          nickName:that.data.nickName
        },
        method:"GET",//请求方式
        success(res){
          that.setData({       //从后端获取值
            bookList:res.book
          });
        }
      })
    }

   
  })