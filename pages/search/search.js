import api from "../../http/api";

// pages/search/search.js
Page({

    /**
     * 页面的初始数据
     */
    data: {
        value: '',
        hotWords: [],
        search: [],
        HOST: 'https://statics.zhuishushenqi.com',
        history: [],
        number: 1

    },
    //搜索
    goTo(e) {
        console.log(e);
        let value = e.detail
        this.setData({
            value: value
        })
        let history = []
        if (wx.getStorageSync('history')) {
            history = wx.getStorageSync('history')
        }
        history.push(value)
        wx.setStorageSync('history', history)

        api.bookSearch(this.data.value).then(res => {
            let arr = res.books
            arr.map(item => {
                item.cover = this.data.HOST + item.cover
            })
            this.setData({
                search: arr
            })
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    },
    //清除搜索
    clear() {
        this.setData({
            number: 1,
            search: []
        })
        this.getHistory()
    },
    //跳转到书籍详情e
    getTo(e) {
        let id = e.currentTarget.dataset.id
        let name = e.currentTarget.dataset.name
        wx.navigateTo({
            url: `../../pages/bookDetails/bookDetails?id=${id}&name=${name}`,

        });

    },
    //获取搜索热词
    getHotWord() {
        api.hotWord().then(res => {
            let arr = res.newHotWords
            let num = Math.floor(Math.random() * arr.length)
            let num1 = arr.length + num
            let hotWords = arr.slice(num, num1)
            this.setData({
                hotWords: hotWords
            })

        }).catch(err => {
            console.log(err);
        })
    },

    //换一换
    click() {
        this.getHotWord()
    },
    //点击搜索历史
    clickItem(e) {
        let value = e.currentTarget.dataset.value
        this.setData({
            value: value,
            number: 2
        })
        api.bookSearch(value).then(res => {
            let arr = res.books
            arr.map(item => {
                item.cover = this.data.HOST + item.cover
            })
            this.setData({
                search: arr
            })

        }).catch(err => {
            console.log(err);
        })

    },
    //删除搜索历史
    clickTo() {
        wx.showModal({

            content: '您确定删除搜索记录吗?',
            success: (result) => {

                if (result.confirm) {
                    wx.removeStorageSync('history')
                    this.setData({
                        history: [],
                    })
                } else {

                }
            }
        })

    },
    getHistory() {
        let add = wx.getStorageSync('history')

        if (add.length > 0) {
            let bdd = add.filter(function(item, index, add) {
                return add.indexOf(item) === index;
            });
            this.setData({
                history: bdd,
            })
        }
    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: '搜索',
        })
        this.getHotWord()
        this.getHistory()


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