import api from "../../http/api";

// pages/rankInfo/rankInfo.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        id: '',
        id1: '',
        id2: '',
        id3: '',
        rank: [],
        HOST: 'https://statics.zhuishushenqi.com',
        active: 1,
    },
    getrank() {
        wx.showLoading({
            title: '加载中...'
        });
        let obj = {
            rank_id: this.data.id
        }

        api.rankInfo(obj).then(res => {
            if (res.ok === true) {
                wx.hideLoading()
                let arr = res.ranking.books
                arr.map(item => {
                    item.cover = this.data.HOST + item.cover
                })
                this.setData({
                    rank: arr
                })
                if (res.ranking.monthRank) {
                    this.setData({
                        id1: res.ranking._id,
                        id2: res.ranking.monthRank,
                        id3: res.ranking.totalRank,
                    })
                }
            } else {
                wx.hideLoading()
            }

        }).catch(err => {
            console.log(err);
            wx.hideLoading()
        })
    },
    clickItem1() {
        this.setData({
            active: 1,
            id: this.data.id1
        })
        this.getrank()

    },
    clickItem2() {
        this.setData({
            active: 2,
            id: this.data.id2
        })
        this.getrank()
    },
    clickItem3() {
        this.setData({
            active: 3,
            id: this.data.id3
        })
        this.getrank()
    },
    //跳转到书籍详情e
    getTo(e) {
        let id = e.currentTarget.dataset.id
        let name = e.currentTarget.dataset.name
        wx.navigateTo({
            url: `../../pages/bookDetails/bookDetails?id=${id}&name=${name}`,

        });

    },
    /**
     * 生命周期函数--监听页面加载
     */
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: options.name,
        })
        let id = options.id
        this.setData({
            id: id
        })
        this.getrank()
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