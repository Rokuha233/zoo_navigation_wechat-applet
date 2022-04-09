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
        this.setData({islogin,nickName});
          
      },
  
      returnticket(){
        var islogin=this.data.islogin;
        if (islogin==1) {
            const ticket=wx.getStorageSync("ticket");
            //var ticket=this.data.ticket;
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
      }

})