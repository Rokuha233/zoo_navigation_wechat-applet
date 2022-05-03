
Page({
  data: {
    userInfo:{},
    nickName:"",
    islogin:"",
    ticket:"",//门票
    book:""//预约
  },

  getUserProfile(e) {
    wx.getUserProfile({  //使用wx.getUserProfile接口获取用户信息
      desc: '用于完善用户资料', // 声明获取用户个人信息后的用途，后续会展示在弹窗中，请谨慎填写
      success: (res) => {
        this.setData({
          userInfo: res.userInfo,
          islogin:1
        })
        wx.setStorageSync("islogin", 1);//保存已登录信息
        //wx.setStorageSync("ticket", 0);//   <<保存门票数量（测试用）>>
        //wx.setStorageSync("book", 0);//   <<保存预约数量（测试用）>>
        wx.setStorageSync("nickName", this.data.userInfo.nickName);//保存当前登录用户的名称

      }
    })
  },

 onLoad:function(options){ 
    var that=this;
    wx.request({   //向后端发送请求
      url: 'http://localhost:8080/Wechat_project_war_exploded/user',// 后端url
      data:{    //前端发送给后端的值
        nickName:that.data.userInfo.nickName
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
