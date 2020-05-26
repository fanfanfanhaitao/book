//Page Object
import create from '../../utils/store/create'
import store from '../../store/index'
create.Page(store, {
    use: ['bookList'],
    data: {
        bookshelf: [],
        active: 0,
        msg: 0
    },
    goTo() {
        wx.navigateTo({
            url: '/pages/help/help',

        });

    },
    getTo(e) {
        let id = e.currentTarget.dataset.id
        let name = e.currentTarget.dataset.name
        wx.navigateTo({
            url: `../../pages/bookDetails/bookDetails?id=${id}&name=${name}`,

        });

    },
    //开启删除
    openDel() {
        if (this.data.bookshelf.length > 0) {
            this.setData({
                msg: 1,
                active: 1
            })
        }

    },
    //关闭删除
    closeDel() {
        this.setData({
            msg: 0,
            active: 0
        })
    },
    //删除收藏
    delete(e) {

        let title = e.currentTarget.dataset.title
        let arr = this.data.bookshelf.filter(item => {
            return item.title !== title
        })
        this.setData({
            bookshelf: arr
        })
        if (arr.length === 0) {
            this.setData({
                msg: 0,
            })
        }
        wx.setStorageSync('bookshelf', arr)
    },
    //获取收藏
    getBook() {
        if (wx.getStorageSync('bookshelf')) {
            // wx.removeStorageSync('bookshelf')
            let arr = wx.getStorageSync('bookshelf')
                // if (arr.length > 0) {

            //     let add = arr.filter(function(item, index, arr) {
            //         console.log(arr.indexOf(item));
            //         console.log(item);
            //         return arr.indexOf(item) === index;
            //     });
            //     console.log(add);
            // arr.filter(item => {
            //     return arr.indexOf(item) === item.index

            // })

            // }
            this.setData({
                bookshelf: arr,
            })
        }
    },

    //options(Object)
    onLoad: function(options) {

        wx.setNavigationBarTitle({
            title: '小爱书城',
        })
        this.getBook()

    },
    onReady: function() {

    },
    onShow: function() {
        this.getBook()
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