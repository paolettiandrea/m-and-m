Vue.component('img-displayer', {
    template: `<div><img :src="contentData.imgResData.url" style="width: 100%"></div>`,
    props: {
        contentData: null
    }
})
