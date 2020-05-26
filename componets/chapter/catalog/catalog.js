// componets/chapter/catalog/catalog.js
Component({
    /**
     * 组件的属性列表
     */
    properties: {
        chapters: {
            type: Array,
            value: []
        }
    },

    /**
     * 组件的初始数据
     */
    data: {
        number: 0
    },
    options: { addGlobalClass: true },
    /**
     * 组件的方法列表
     */
    methods: {
        send() {
            this.triggerEvent('send', this.data.number)
        }
    }
})