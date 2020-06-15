Vue.component('video-displayer', {
    template: `
    <div  :align="contentData.pos">
        <video :width="contentData.w"  controls>
            <source :src="contentData.url" type="video/mp4">
        </video>
    </div>
    `,
    props: {
        contentData: null
    }
})
