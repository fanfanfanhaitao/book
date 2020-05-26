// componets/ranking/ranking.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        rank: {
            type: Object,
            value: {}
        }
    },

    /**
     * 组件的初始数据
     */
    data: {

    },
    options: { addGlobalClass: true },
    /**
     * 组件的方法列表
     */
    methods: {
        clickItem(e) {
            console.log(e);
            let id = e.currentTarget.dataset.id
            let name = e.currentTarget.dataset.name
            wx.navigateTo({
                url: `../../pages/rankInfo/rankInfo?id=${id}&name=${name}`,
            });
        }

    }
})