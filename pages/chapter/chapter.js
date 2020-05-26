import api from '../../http/api'
// pages/chapter/chapter.js
var WxParse = require('../../wxParse/wxParse.js')
Page({

    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        link: '',
        title: '',
        body: '',
        msg: 0,
        fontSize: 28,
        active: 0,
        color: 'white',
        active1: 0,
        number: 0,
        chapters: []

    },
    //获取章节内容
    getchapterContent() {
        api.bookChaptersBookId(this.data.id).then(res => {
            let link = res.mixToc.chapters[this.data.msg].link
            this.setData({
                chapters: res.mixToc.chapters,
                title: res.mixToc.chapters[this.data.msg].title
            })
            api.chapterContent(link).then(res => {

                const that = this;
                var article = res.chapter.body
                WxParse.wxParse('article', 'md', article, that, 5);
                console.log(this.data.body);
            }).catch(err => {
                console.log(err);
            })
            console.log(res);
        }).catch(err => {
            console.log(err);
        })

    },
    //上一章
    up() {
        if (this.data.msg > 0) {
            this.setData({
                msg: this.data.msg - 1
            })
        }
        this.getchapterContent()
    },
    //下一章
    next() {

        this.setData({
            msg: this.data.msg + 1
        })

        this.getchapterContent()
    },
    //字体变大
    big() {
        this.setData({
            fontSize: this.data.fontSize + 10
        })
    },
    //字体变小
    small() {
        this.setData({
            fontSize: this.data.fontSize - 10
        })
    },
    //开启背景
    openbg() {
        this.setData({
            active: 1
        })
    },
    //背景
    backgd() {

        this.setData({
            active1: 1
        })
    },
    //改变背景颜色
    bgcolor(e) {
        console.log(e);
        let color = e.currentTarget.dataset.color
        this.setData({
            active1: 0,
            active: 0,
            color: color
        })
    },
    //打开目录
    openCatalog() {
        this.setData({
            number: 1
        })
    },
    //关闭目录
    send(e) {
        console.log(e.detail)
        this.setData({
            number: e.detail,
            active: 0
        })
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: options.name,
        })
        this.setData({
            id: options.id
        })
        this.getchapterContent()


        //  * WxParse.wxParse(bindName , type, data, target,imagePadding)
        //  * 1.bindName绑定的数据名(必填)
        //  * 2.type可以为html或者md(必填)
        //  * 3.data为传入的具体数据(必填)
        //  * 4.target为Page对象,一般为this(必填)
        //  * 5.imagePadding为当图片自适应是左右的单一padding(默认为0,可选)
        //  */
        console.log(this.data.body);

    },

    /**
     * 生命周期函数--监听页面初次渲染完成
     */
    onReady: function() {

    },

    /**
     * 生命周期函数--监听页面显示
     */
    onShow: function() {

    },

    /**
     * 生命周期函数--监听页面隐藏
     */
    onHide: function() {
        wx.setStorageSync('msg', this.data.msg)
    },

    /**
     * 生命周期函数--监听页面卸载
     */
    onUnload: function() {

    },

    /**
     * 页面相关事件处理函数--监听用户下拉动作
     */
    onPullDownRefresh: function() {

    },

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {

    },

    /**
     * 用户点击右上角分享
     */
    onShareAppMessage: function() {

    }
})