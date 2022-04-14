
Page({

    data:{
        nickName:"",
        idcard:"",
        ticket:"",
        date:'2022-01-01'
      },

      onShow(){
        const nickName=wx.getStorageSync("nickName");      //在本地缓存中获取数据  
        this.setData({nickName});
          
      },

      bindDateChange: function(e) {
        console.log('picker发送选择改变，携带值为', e.detail.value)
        this.setData({
          date: e.detail.value
        })
      },

      onShow(){      //在本地缓存中获取数据  
        const nickName=wx.getStorageSync("nickName");
        this.setData({nickName});
          
      },

      inputid(e){
        //console.log(e.detail.value);
        this.setData({
            idcard:e.detail.value
        })

      },

      buyticket(){
          var idcard=this.data.idcard;
          var date=this.data.date;

            //const ticket=wx.getStorageSync("ticket");
            const ticket=this.data.ticket;
            var ticket0=ticket+1;
            this.setData({
              ticket:ticket0
            })

            wx.request({   //向后端发送请求
              url: 'url',// 后端url
              data:{    //前端发送给后端的值
                ticket:this.data.ticket
              },
              method:"GET",//请求方式
              success(res){
              
              }
            })
    
            //wx.setStorageSync("ticket",ticket0);
            wx.showToast({
              title: '购买成功',
              icon: 'success',
              duration: 2000//持续的时间
            })              
      },

      onLoad:function(options){ 
        var that=this;
        wx.request({   //向后端发送请求
          url: 'url',// 后端url
          data:{    //前端发送给后端的值
            nickName:that.data.nickName,
            idcard:that.data.idcard,
            date:that.data.date
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