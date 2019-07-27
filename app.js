App({
  onLaunch: function () {
    wx.getSystemInfo({
      success: e => {
        this.globalData.System = e;
        this.globalData.StatusBar = e.statusBarHeight;
        let custom = null;
        try{ 
          custom = wx.getMenuButtonBoundingClientRect ?wx.getMenuButtonBoundingClientRect() : {}
        } catch(e) { custom = {} }
        this.globalData.Custom = custom;
        this.globalData.CustomBar = (custom.bottom + custom.top - e.statusBarHeight)||60;
      }
    })
  },
  globalData: {}
})