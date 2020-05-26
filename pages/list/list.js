import api from "../../http/api"
// pages/list/list.js
Page({

    /**
     * 页面的初始数据
     */
    data: {

        typeList: [{
                id: 'hot',
                name: '热门'
            },
            {
                id: 'new',
                name: '新书'
            },
            {
                id: 'reputation',
                name: '好评'
            },
            {
                id: 'over',
                name: '完结'
            },
            {
                id: 'monthly',
                name: 'VIP'
            }
        ],
        active: 0,
        active1: -1,
        male: [],
        gender: "",
        type: "hot",
        major: '',
        minor: '',
        start: 1,
        list: [],
        HOST: 'https://statics.zhuishushenqi.com'
    },
    //type标签栏切换
    clickItem(e) {
        let index = e.currentTarget.dataset.index
        let type = e.currentTarget.dataset.type
        this.setData({
            active: index,
            type: type,

        })
        this.getList()

    },
    //小类minor标签栏切换
    clickMinor(e) {
        let minor = e.currentTarget.dataset.minor
        let index1 = e.currentTarget.dataset.index1
        this.setData({
            active1: index1,
            minor: minor
        })
        this.getList()
    },
    //切换到全部
    clickTo() {
        let active1 = -1
        this.setData({
            active1: active1,
            minor: ''
        })
        this.getList()
    },
    //跳转到书籍详情e
    getTo(e) {
        let id = e.currentTarget.dataset.id
        let name = e.currentTarget.dataset.name
        wx.navigateTo({
            url: `../../pages/bookDetails/bookDetails?id=${id}&name=${name}`,

        });

    },

    getList() {
        let obj = {
            gender: this.data.gender,
            type: this.data.type,
            major: this.data.major,
            minor: this.data.minor,
            start: this.data.start
        }
        console.log(obj);
        api.getCatsBooks(obj).then(res => {
            let arr = res.books
            arr.map(item => {

                item.cover = this.data.HOST + item.cover
            })
            console.log(arr);
            this.setData({
                list: arr
            })
            console.log(this.data.list);
        }).catch(err => {
            console.log(err);
        })
    },
    onLoad: function(options) {
        wx.setNavigationBarTitle({
            title: options.name,
        })
        let major = options.name
        let gender = options.gender
        let male = options.minor.split(",")

        this.setData({
            major: major,
            male: male,
            gender: gender
        })
        console.log(this.data.major);
        console.log(options);
        this.getList()

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