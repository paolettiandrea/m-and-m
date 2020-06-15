Vue.component('img-displayer', {
    template: `<div><img :src="data.url" :width="data.w" :height="data.h"></div>`,
    props: {
        data: null
    }
})
