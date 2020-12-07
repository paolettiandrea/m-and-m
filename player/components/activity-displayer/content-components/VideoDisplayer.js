Vue.component('video-displayer', {
    template: `
    <div >
        <iframe :src="embedLink" style="width: 100%">
        </iframe>
    </div>
    `,
    props: {
        contentData: null
    },

    computed: {
        baseEmbedLink() { return "https://www.youtube.com/embed/" },
        baseYoutubeLink() { return "https://www.youtube.com/watch?v="},
        // Checks if the given url is playable (it needs to be a youtube video link
        isPlayable() {
            return this.contentData.url.startsWith(this.baseYoutubeLink);
        },
        embedLink() {
            return this.contentData.url.replace(this.baseYoutubeLink, this.baseEmbedLink)
        }
    }
})
