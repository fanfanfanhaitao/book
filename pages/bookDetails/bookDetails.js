import api from "../../http/api";
import create from '../../utils/store/create'
import store from '../../store/index'
// pages/bookDetails/bookDetails.js
create.Page(store, {
    use: ['bookList'],
    /**
     * 页面的初始数据
     */
    data: {
        id: '',
        arr: [],
        HOST: 'https://statics.zhuishushenqi.com',
        active: 0,
        msg: 0,
        intro: '',
        evaluate: [],
        related: [],
        number: 2,
        bookChapters: []
    },

    /**
     * 生命周期函数--监听页面加载
     */
    // 书籍详情
    getData() {
        wx.showLoading({
            title: '加载中...'
        });
        api.bookInfo(this.data.id).then(res => {
            wx.hideLoading()
            let arr = Array(res)
            arr.map(item => {
                item.cover = this.data.HOST + item.cover
            })
            this.setData({
                arr: arr,
                intro: res.longIntro
            })
            console.log(this.data.arr);
        }).catch(err => {
            wx.hideLoading()
            console.log(err);
        })
    },
    //获取评价
    getEvaluate() {
        api.shortReviews(this.data.id).then(res => {
            let arr = res.docs
            arr.map(item => {

                item.author.avatar = this.data.HOST + item.author.avatar
            })
            this.setData({
                evaluate: arr
            })
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    },
    //获取相关推荐
    getRelated() {
        api.relatedRecommendedBooks(this.data.id).then(res => {
            let add = res.books
            add.map(item => {
                item.cover = this.data.HOST + item.cover
            })
            let num = Math.floor(Math.random() * add.length)
            let num1 = num + 3

            let arr = add.slice(num, num1)
            this.setData({
                related: arr
            })

        }).catch(err => {
            console.log(err);
        })
    },
    //获取章节
    getbookChapters() {
        api.bookChaptersBookId(this.data.id).then(res => {
            this.setData({
                bookChapters: res.mixToc.chapters
            })
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    },
    //打开图片页面
    image(e) {
        let imgList = []
        imgList.push(e.currentTarget.dataset.src)
        let currentUrl = e.currentTarget.dataset.src
        wx.previewImage({
            current: currentUrl, // 当前显示图片的http链接
            urls: imgList // 需要预览的图片http链接列表
        })

    },
    //加入书架
    clickTo(e) {
        this.setData({
            number: 1
        })
        let obj = {
            cover: e.currentTarget.dataset.cover,
            title: e.currentTarget.dataset.title,
            id: e.currentTarget.dataset.id
        }

        let cotion = []
        if (wx.getStorageSync('bookshelf')) {
            cotion = wx.getStorageSync('bookshelf')
        }
        cotion.unshift(obj)
        wx.setStorageSync('bookshelf', cotion)


    },
    //换一换
    click() {

        this.getRelated()
    },
    //跳转到章节
    goChapter(e) {
        let id = e.currentTarget.dataset.id
        let name = e.currentTarget.dataset.title
        wx.navigateTo({
            url: `../../pages/chapter/chapter?id=${id}&name=${name}`,

        });


    },
    //跳转到书籍详情
    clickItem(e) {
        let id = e.currentTarget.dataset.id
        let name = e.currentTarget.dataset.name
        wx.navigateTo({
            url: `../../pages/bookDetails/bookDetails?id=${id}&name=${name}`,

        });
    },
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: options.name,
        })

        this.setData({
            id: options.id
        })
        this.getData()
        this.getEvaluate()
        this.getRelated()
        this.getbookChapters()
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