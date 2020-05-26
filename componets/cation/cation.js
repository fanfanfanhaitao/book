// componets/cation/cation.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        male: {
            type: Array,
            value: []
        },
        female: {
            type: Array,
            value: []
        },
        press: {
            type: Array,
            value: []
        },
        male1: {
            type: Array,
            value: []
        },
        female1: {
            type: Array,
            value: []
        },
        press1: {
            type: Array,
            value: []
        },
    },

    /**
     * 组件的初始数据
     */
    data: {

        minor: [],
        gender: '',


    },

    options: { addGlobalClass: true },
    /**
     * 组件的方法列表
     */
    methods: {
        //点击事件
        goTo(e) {
            console.log(e);
            let name = e.currentTarget.dataset.name
            this.properties.male1.map(item => {
                if (item.major === e.currentTarget.dataset.name) {
                    let arr = item.mins
                    this.setData({
                        minor: arr
                    })
                }
            })
            console.log(this.data.minor);
            wx.navigateTo({
                url: `/pages/list/list?name=${name}&gender=${"male"}&minor=${this.data.minor}`,
            });
        },
        goTo1(e) {
            let name = e.currentTarget.dataset.name
            this.properties.female1.map(item => {
                if (item.major === e.currentTarget.dataset.name) {
                    let arr = item.mins
                    this.setData({
                        minor: arr
                    })
                }
            })
            console.log(this.data.minor);
            wx.navigateTo({
                url: `/pages/list/list?name=${name}&gender=${"female"}&minor=${this.data.minor}`,
            });
        },
        goTo2(e) {
            let name = e.currentTarget.dataset.name
            this.properties.press1.map(item => {
                if (item.major === e.currentTarget.dataset.name) {
                    let arr = item.mins
                    this.setData({
                        minor: arr
                    })
                }
            })
            console.log(this.data.minor);
            wx.navigateTo({
                url: `/pages/list/list?name=${name}&gender=${"press"}&minor=${this.data.minor}`,
            });
        },

    },

})