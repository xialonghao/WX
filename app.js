//app.js
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs);

    // 登录
    wx.login({
      success: res => {
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 获取用户信息
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              // 可以将 res 发送给后台解码出 unionId
              this.globalData.userInfo = res.userInfo

              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
  },
  //ooc0D0Vd7gSYWbx9FFioD1zF3irQ  teacher
  globalData: {
    userInfo: null,   //用户信息
    openId:'ooc0D0Vd7gSYWbx9FFioD1zF3irQ',   //用户openid
    role:'teacher', //用户角色
    roleurl:'',   //用户跳转角色页面(老师&学生)
    teaphonse:'',   //忘了
    userstatus:false,  //忘了
    urlflag:false,    //网络有问题时设置为真 如果为真 则退出小程序
  }
})