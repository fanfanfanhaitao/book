import api from "../../http/api"
//Page Object
Page({
    data: {
        arr: [
            { name: '分类' },
            { name: '排行' },
        ],
        active: 0,
        male: [],
        male1: [],
        female: [],
        female1: [],
        press: [],
        press1: [],
        rank: [],
        HOST: 'https://statics.zhuishushenqi.com'


    },
    clickItem(e) {
        console.log(e);
        let index = e.currentTarget.dataset.index
        this.setData({
            active: index
        })
    },
    getData() {
        wx.showLoading({
            title: '加载中...'
        });
        api.getCats().then(res => {
            if (res.ok === true) {
                wx.hideLoading()
                this.setData({
                    male: res.male,
                    female: res.female,
                    press: res.press
                })
            } else {
                wx.hideLoading()
            }
            console.log(res);
        }).catch(err => {
            wx.hideLoading()
            console.log(err);
        })
    },
    //排行详情
    getRank() {
        api.getRankCategory().then(res => {
            let arr = res
            arr.female.map(item => {
                item.cover = this.data.HOST + item.cover
            })
            arr.male.map(item => {
                item.cover = this.data.HOST + item.cover
            })
            arr.epub.map(item => {
                item.cover = this.data.HOST + item.cover
            })
            this.setData({
                rank: arr
            })
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    },
    //获取小类
    getMinor() {
        api.getMinor().then(res => {
            this.setData({
                male1: res.male,
                female1: res.female,
                press1: res.press

            })
            console.log(res);
        }).catch(err => {
            console.log(err);
        })
    },
    //options(Object)
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: '书城',
        })
        this.getData()
        this.getMinor()
        this.getRank()
    },
    onReady: function() {

    },
    onShow: function() {

    },
    onHide: function() {

    },
    onUnload: function() {

    },
    onPullDownRefresh: function() {

    },
    onReachBottom: function() {

    },
    onShareAppMessage: function() {

    },
    onPageScroll: function() {

    },
    //item(index,pagePath,text)
    onTabItemTap: function(item) {

    }
});