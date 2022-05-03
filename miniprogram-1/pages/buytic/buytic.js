
Page({

    data:{
        nickName:"",
        idcard:"",
        ticket:"",
        date:'2022-01-01',
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
          var nickName=this.data.nickName;
            //const ticket=wx.getStorageSync("ticket");
            const ticket=this.data.ticket;
            var ticket0=ticket+1;
            this.setData({
              ticket:ticket0
            })
            wx.request({   //向后端发送请求
              url: 'http://localhost:8080/Wechat_project_war_exploded/buy',// 后端url
              data:{
                idcard,
                date,
                nickName
              },
              header:{
                'content-type':'application.json/x-www-form-urlencoded;charset=utf-8'
              },
              method:"get",//请求方式
              success:function(res){
                console.log(res.data);
              },
              fail: function(res) {
                console.log("失败");
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