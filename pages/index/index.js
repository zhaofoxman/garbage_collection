const app = getApp();
const db = require('../../utils/garbage.js');
Page({
  data: {
    StatusBar: app.globalData.StatusBar,
    CustomBar: app.globalData.CustomBar,
    garbageList: [],
    name: null,
    cateShow: 0
  },
  onLoad(o) {
  },
  focusInput(e){
    this.setData({ ui: 1 })
  },
  tapCamera(e){
    this.setData({ ui: 2, garbageList: null })
  },
  takePhoto(){
    let _t = this;
    const ctx = wx.createCameraContext()
    wx.showLoading({title:'识别...',mask:true})
    ctx.takePhoto({
      quality: 'normal',
      success: rs => {
        let img64 = wx.getFileSystemManager().readFileSync(rs.tempImagePath,"base64")
        
        wx.request({
          url: "", //可自行申请百度AI识别，如需要可联系作者，有偿提供接口直接调用
          data: { img64: img64 },
          method: 'POST',
          success: function (r) {
            _t.setData({
              ui: 1,
              aipList: r.data,
              photo: rs.tempImagePath,
              photoShow: 1
            })
          }
        })
      }
    })
  },
  takePhotoInput(e) {
    let dt = e.currentTarget.dataset;
    this.setData({ ui: 1, photoShow: 0, name: dt.keyword})
    queryGarbageList(this, this.data.name)
  },
  hidePhotoModal() {
    this.setData({ photoShow: 0 })
  },
  showCateModal(e) {
    let dt = e.currentTarget.dataset;
    this.setData({ cateShow: dt.categroy })
  },
  hideCateModal() {
    this.setData({ cateShow: 0 })
  },
  queryGarbage(e){
    if (!e.detail.value) return this.setData({ ui: 0, garbageList: null })
    queryGarbageList(this, e.detail.value)
  },
  onShareAppMessage(e){
    return { title: "你好！", 
      path: "/pages/tool/exgarbage?isshare=1", 
      imageUrl:"/images/ex/garbage/categroy0.jpg"}
  }
})

function queryGarbageList(_t, name) {
  /*
  wx.request({
    url: "", //分类查询接口
    data: { name: name },
    method: 'POST',
    success: function (r) {
      _t.setData({
        garbageList: r.data
      })
    }
  })*/
  //本地库查询
  let list = []
  for (let i = 0; i < db.garbages.length; i++){
    if (db.garbages[i].name.indexOf(name) > -1){
      list.push(db.garbages[i])
    }
  }
  _t.setData({
    garbageList: list
  })
}