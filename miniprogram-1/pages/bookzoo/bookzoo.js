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
      checkedList:[]
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


      inputid(e){
        //console.log(e.detail.value);
        this.setData({
            idcard:e.detail.value
        })

      },
      HandelItemChange(e){
        // 1 获取被选中的复选框的值
        const checkedList = e.detail.value;
        console.log(e.detail.value);
        // 2 进行赋值
        this.setData({
          checkedList:checkedList
        })
      },
      

      bookzoo(){
          var ticket_id=this.data.ticket_id;
          var book=this.data.book;
          var checkedList=this.data.checkedList;

          if(ticket_id!=null){
              var book0=book+1;
              wx.request({   //向后端发送请求
                url: 'url',// 后端url
                data:{    //前端发送给后端的值
                  book:book0,
                  checkedList:checkedList
                },
                method:"GET",//请求方式
                success(res){
                  that.setData({       //从后端获取值
                  });
                }
              })
          }
          else{
            wx.showToast({
              title: '未持有对应的门票',
              icon: 'erro',
              duration: 2000//持续的时间
            })     

          }
         
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
              ticket_id:res.ticket_id,
              book:res.book
            });
          }
        })
      }
      
})