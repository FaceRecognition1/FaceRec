// pages/FaceRec/FaceRec.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
      src:null,
      picPaths:[]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {

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

  },
  chooseImage: function () {
    var that = this;
    wx.showActionSheet({
        itemList:['从相册中选择','拍照'],
        itemColor :"#00000",
        success:function(res){
            if(!res.cancel){
              if(res.tapIndex==0){
                that.chooseWxImage('album')
              }
              else if(res.tapIndex==1){
                that.chooseWxImage('camera')
              }
            }
        }
    })
  },

  chooseWxImage:function(type){
    var that=this;
    var imgsPaths=that.data.imgs;
    wx.chooseImage({
      count:1,
      sizeType:['original','compressed'],
      sourceType:[type],
      success: function(res) {
        that.setData({
          src:res.tempFilePaths
        })
        console.log(res.tempFilePaths[0]);
        /*that.upImgs(res.tempFilePaths[0],0)*/
      },
    })
  },

  upImgs:function(imgurl,index){
    var that=this;
    wx.uploadFile({
      url: '',
      filePath: 'imgurl',
      name: 'file',
      header:{
        'content-type':'multipart/form-data'
      },
      formData:null,
      success:function(res){
        console.log(res)
        var data=JSON.parse(res.data)
          that.data.picPaths.push(data['msg'])
          that.setData({
            picPaths:that.data.picPaths
          })
          console.log(that.data.picPaths)
      }
    })
  },
  previewImage: function (e) {
    wx.previewImage({
      current: e.currentTarget.id, // 当前显示图片的http链接
      urls: this.data.src // 需要预览的图片http链接列表
    })
  }
});