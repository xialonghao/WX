// pages/admin_classbackhome/admin_classbackhome.js
var searchtxt = '';
Page({

  showInfo: function (e) {
    // console.log(e.currentTarget.dataset.id);
    var classe = e.currentTarget.dataset.class;
    var week = e.currentTarget.dataset.week;
    var year = this.data.year;
    wx.navigateTo({
      url: `../admin_classcheckhome/admin_classcheckhome?class=${classe}&week=${week}&year=${year}`,
    })
  },
  //分页
  page: function (e) {
    
    var button = '';
    if (e !== undefined) {
      if (e.target.dataset.id == 1) {
        if (this.data.page + 1 == this.data.pages && this.data.pages != 0) {
          wx.showToast({
            title: '没有下一页了',
            image: '../../sources/images/error.png',
            duration: 1500,
          });
          return;
        }
        button = 1;
        this.setData({
          page: ++this.data.page
        })
      } else {
        if (this.data.page == 0) {
          wx.showToast({
            title: '没有上一页了',
            image: '../../sources/images/error.png',
            duration: 1500,
          });
          return;
        }

        button = 0;
        this.setData({
          page: --this.data.page
        })
      }
    }
    wx.showLoading({
      title: '加载中......',
      mask: true,
    })

    var week = '';
    if (this.data.week !== undefined) {
      week = this.data.week
    }
    // console.log(this.data.page);
    var _this = this;
    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/weekHomeConfirm',
      data: {
        page: _this.data.page,
        week: week,
        year:_this.data.year,
      },
      success: function (e) {
        console.log(e.data);
        // return;
        
        if (e.data.msg !== undefined) {
          if (e.data.msg == 0) {
            wx.showToast({
              title: '抱歉 暂时没有信息',
              image: '../../sources/images/error.png',
              duration: 1500,
            })
            return;
          } else if (e.data.msg == 1) {
            wx.showToast({
              title: '没有上一页了',
              image: '../../sources/images/error.png',
              duration: 1500,
            })
            return;
          } else {
            wx.showToast({
              title: '没有下一页了',
              image: '../../sources/images/error.png',
              duration: 1500,
            })
            return;
          }
        }
        _this.setData({
          classhome_list: e.data[0],
          page: e.data.page,
          pages: e.data.pages,
          flag: true,
        })
        wx.hideLoading();
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
  /**
   * 页面的初始数据
   */
  data: {
    classhome_list: [],
    page:0,
    pages:0,
    flag:'a',
    week: '',
    search: true,
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
      //获取日期是本年的第几周
      var time, weekofyear, checkDate = new Date(new Date());
      checkDate.setDate(checkDate.getDate() + 4 - (checkDate.getDay() || 7));
      time = checkDate.getTime();
      checkDate.setMonth(0);
      checkDate.setDate(1);
      weekofyear = Math.floor(Math.round((time - checkDate) / 86400000) / 7) + 1;
      var year = new Date().getFullYear();
      this.setData({
        week: options.week ? options.week : weekofyear,
        year: options.year ? options.year : year,
      });
    this.page();
    
  },

  searchBtnstatus1: function () {
    if (this.data.search) {
      this.setData({
        search: false,
      })
    }
  },

  searchBtnstatus2: function () {
    if (!this.data.search && !searchtxt) {
      this.setData({
        search: true,
      })
    }
  },
  /*按钮按下触发函数*/
  bindinput: function (e) {
    searchtxt = e.detail.value;
  },


  /*搜索*/
  search: function (e) {
    console.log(searchtxt);
    var _this = this;
    wx.showLoading({
      title: '搜索中...',
      mask: true,
    })
    wx.request({
      url: 'https://shop.linyidz.cn/wechat/index.php/api/wxapi/weekHomeConfirm',
      data: {
        week: _this.data.week,
        content: searchtxt,
      },
      success: function (res) {
        wx.hideLoading();
        if (res.data[0] == '') {
          wx.showModal({
            title: '提示',
            content: '查询不到此信息',
            showCancel: false,
          });
          return;
        }
        console.log(res);
        _this.setData({
          classhome_list: res.data[0],
          page: res.data.page,
          pages: res.data.pages,
        })
      },
      fail: function (err) {
        wx.hideLoading();
        console.log(err);
        if (err.errMsg.indexOf('request:fail') >= 0) {
          wx.hideLoading();
          wx.showModal({
            title: '提示',
            content: '网络不畅通哦',
            showCancel: false,
            success: function () {
            }
          })
        }
      }
    })
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