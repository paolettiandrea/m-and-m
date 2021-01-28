Vue.component('video-displayer', {
    template: `
    <div  :align="contentData.pos">
        <iframe style="width: 100%" :style="{'height': contentData.height}" :src="embedUrl">
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
