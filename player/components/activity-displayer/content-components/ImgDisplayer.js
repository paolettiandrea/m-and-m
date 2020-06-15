Vue.component('img-displayer', {
    template: `<div><img :src="contentData.url" :width="contentData.w" :height="contentData.h"></div>`,
    props: {
        contentData: null
    }
})
