// pages/deal/deal.js
Page({

   
    data: {
        userinfo:{},
        nickName:"",
        islogin:"",
        ticket:"",
        book:""

    },
    onShow(){
        const islogin=wx.getStorageSync("islogin");      //在本地缓存中获取数据    
        const nickName=wx.getStorageSync("nickName");
        const ticket=wx.getStorageSync("ticket");
        const book=wx.getStorageSync("book");
        this.setData({islogin,nickName,ticket,book});
          
      },
  
      returnticket(){//退票
        var islogin=this.data.islogin;
        var ticket=wx.getStorageSync("ticket");
        if (islogin==1) {
            if(ticket!=0){  
                var ticket0=ticket-1;
                wx.setStorageSync("ticket",ticket0);
            //    wx.request({
            //      url: 'url',
            //      data:{
            //        ticket:ticket0
            //      }
            //    })
                wx.showToast({
                  title: '退票成功',
                  icon: 'success',
                  duration: 2000//持续的时间
                })
            }
            else {
              wx.showToast({
                title: '您还未购票',
                icon: 'error',
                duration: 2000//持续的时间
              })
            }
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
              ticket:res.ticket,
              book:res.book
            });
          }
        })
      },

      cancelbook(){//取消预约
        var islogin=this.data.islogin;
        var book=wx.getStorageSync("book");
        if (islogin==1) {
            if(book!=0){  
                var book0=book-1;
                wx.setStorageSync("book",book0);
            //    wx.request({
            //      url: 'url',
            //      data:{
            //        ticket:ticket0
            //      }
            //    })
                wx.showToast({
                  title: '取消预约成功',
                  icon: 'success',
                  duration: 2000//持续的时间
                })
            }
            else{
              wx.showToast({
                title: '您还未预约',
                icon: 'error',
                duration: 2000//持续的时间
              })
            }
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