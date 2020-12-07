Vue.component('img-displayer', {
    template: `<div><img :src="contentData.imgResData.url" width="100%" :height="contentData.h"></div>`,
    props: {
        contentData: null
    }
})
