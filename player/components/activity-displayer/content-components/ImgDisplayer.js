Vue.component('img-displayer', {
    template: `<div><img :src="contentData.imgResData.url" :width="contentData.w" :height="contentData.h"></div>`,
    props: {
        contentData: null
    }
})
