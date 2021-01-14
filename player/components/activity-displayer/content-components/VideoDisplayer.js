Vue.component('video-displayer', {
    template: `
    <div  :align="contentData.pos">
        <iframe style="width: 100%" :src="embedUrl">
        </iframe>
    </div>
    `,
    props: {
        contentData: null
    },

    computed: {
        embedUrl() {
            return this.contentData.url.replace("watch?v=", "embed/");
        }
    }
})
