// pages/buy/buy.js
Page({

    data: {
        userInfo:{},
        nickName:"",
        islogin:"",
        ticket:""

    },


    onShow(){
      const islogin=wx.getStorageSync("islogin");      //在本地缓存中获取数据  
      this.setData({islogin});
        
    },

    tobuyticket(){
      var islogin=this.data.islogin;
      if (islogin==1) {
        wx.navigateTo({
          url: '../buytic/buytic',
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
            ticket:res.ticket
          });
        }
      })
    }


   

  
})