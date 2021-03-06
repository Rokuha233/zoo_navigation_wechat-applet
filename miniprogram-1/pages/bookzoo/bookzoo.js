Page({

    data:{
        nickName:"",
        idcard:"",
        ticket_id:"",
        ticket:"",
        book:"",
        date:'2022-01-01',
        location:[{
          id:0,
          name:"熊山"
        },
        {
          id:1,
          name:"大象馆"
        },
        {
          id:2,
          name:"猴房"
        }
      ],
      checkedList:[],
      numbercheckedList:[]
      },
      onShow(){
        const nickName=wx.getStorageSync("nickName");      //在本地缓存中获取数据  
        this.setData({nickName}); 
      },
     
      HandelItemChange(e){
        //  获取被选中的复选框的值
         const checkedList = e.detail.value;
        //  进行赋值
        this.setData({
          checkedList:checkedList
        })
      },
      bookzoo(){
          var ticket_id=this.data.ticket_id;
          var book=this.data.book;
          var checkedList=this.data.checkedList;
          var location=JSON.stringify(checkedList) ;//预约园区字符串

              var book0=book+1;
              wx.request({   //向后端发送请求
                url: 'http://localhost:8080/Wechat_project_war_exploded/user',// 后端url
                data:{    //前端发送给后端的值
                  ticket_id:ticket_id,
                  book:book0,
                  location:location
                },
                method:"GET",//请求方式
                success(res){
                  that.setData({       //从后端获取值
                  });
                }
              })
 
         
      },

      onLoad:function(options){ 
        var that=this;
        that.ticket_id=options.ticket_id,
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
              ticket_id:res.ticket_id,
              book:res.book
            });
          }
        })
      }
      
})