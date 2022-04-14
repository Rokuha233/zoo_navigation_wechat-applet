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
      idcard:"",
      ticket:"",
      ticket_id:"",
      book:"",
      book_id:"",
      date:""
      //testlist:[{ticket_id:"0",idcard:"111",date:"222"},{ticket_id:"1",idcard:"333",date:"444"}]
      //testlist:[{bookt_id:"0",idcard:"111",date:"222",location:"000"},{ticket_id:"1",idcard:"333",date:"444",location:"000"}]
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

    returnticket(e){
      var ticketList=this.data.ticketList;

      var index=e.currentTarget.dataset.idx;
      //var ticket_id=ticketList[index].ticket_id;//退票id
      var idcard=ticketList[index].idcard;//需要退的门票与对应预约的idcard信息
      var date=ticketList[index].date;//需要退的门票与对应预约的date信息

      this.setData({
        idcard:idcard,
        date:date
      });

      //console.log(e.currentTarget.dataset.idx);

      wx.request({   //向后端发送请求
        url: 'url',// 后端url
        data:{    //前端发送给后端的值
          idcard:that.data.idcard,
          date:that.data.date,
        },
        method:"GET",//请求方式
        success(res){
          that.setData({       //从后端获取值
            ticketList:res.ticket,
            bookList:res.book,
            ticket:res.ticket,
            book:res.book
          });
        }
      })

    },
    cancelbook(e){
      var bookList=this.data.bookList;

      var index=e.currentTarget.dataset.idx;
      //var ticket_id=ticketList[index].ticket_id;//退票id
      var idcard=bookList[index].idcard;//需要退的门票与对应预约的idcard信息
      var date=bookList[index].date;//需要退的门票与对应预约的date信息

      this.setData({
        idcard:idcard,
        date:date
      });

      //console.log(e.currentTarget.dataset.idx);

      wx.request({   //向后端发送请求
        url: 'url',// 后端url
        data:{    //前端发送给后端的值
          idcard:that.data.idcard,
          date:that.data.date,
        },
        method:"GET",//请求方式
        success(res){
          that.setData({       //从后端获取值
            bookList:res.book,
            book:res.book
          });
        }
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
            ticketList:res.ticket,
            bookList:res.book
          });
        }
      })
    }

   
  })