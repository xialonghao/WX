// pages/dz_10/dz_10.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    staySchoolList:[],
    flag:'a',
    checknum:[],

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options);
    if(options.find == 'all') {
      this.setData({
        find:'all',
      })
    }
    wx.showLoading({
      title: '获取中...',
      mask:true,
    });
    var _this = this;
    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/weekShoolList',
      data:{
        find: 'class',
        openid:getApp().globalData.openId,
        classs: options.class ? options.class : '',
        week: options.week ? options.week : '',
        year: options.year ? options.year : '',
      },
      success:function(res){
        console.log(res.data);
        wx.hideLoading();
        if (res.data == 'not') {
          _this.setData({
            flag: false,
          });
          return;
        }
        var num = {};
        num['check'] = 0;
        num['notcheck'] = 0;
        var sex={};
        sex['boy'] = [];
        sex['girl'] = [];
        for(var i = 0 ;i<res.data.length ; i++) {
          if (res.data[i]['sex'] == '男'){
            sex['boy'].push(res.data[i]);
          }
          if (res.data[i]['sex'] == '女') {
            sex['girl'].push(res.data[i]);
          }
          if(res.data[i]['checkshool'] == 0){
            num['notcheck']++;
          }
          if (res.data[i]['checkshool'] == 1) {
            num['check']++;
          }
        }
        _this.setData({
          staySchoolList:sex,
          checknum:num,
          flag:true,
        });
        console.log(_this.data.staySchoolList);
      },
      fail:function(err){
        wx.hideLoading();
        console.log(err);
        if (err.errMsg.indexOf('request:fail') >= 0) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '网络不畅通哦',
            showCancel: false,
            success: function () {
              wx.navigateBack({
                delta: 1,
              })
            }
          })
        }
      }
    })
  },

  bindTouchStart: function (e) {
    this.startTime = e.timeStamp;
  },

  bindTouchEnd: function (e) {
    this.endTime = e.timeStamp;
  },

  /*长按学生姓名*/
  changeLongSchoolStatus:function(e) {
    if(this.data.find == 'all') {
      return;
    }
    console.log(e);
    wx.navigateTo({
      url: '../dz_16/dz_16?id=' + e.currentTarget.dataset.id,
    });
  },

  /*点击学生姓名*/
  changeSchoolStatus: function (e) {
    console.log(e);
    if (this.endTime - this.startTime < 350) {
      wx.navigateTo({
        url: e.currentTarget.dataset.url,
      });
    }
   
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {
   // this.onLoad('3434');
  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {
  
  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {
  
  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {
  
  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {
  
  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {
  
  }
})