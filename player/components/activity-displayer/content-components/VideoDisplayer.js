Vue.component('video-displayer', {
    template: `
    <div  :align="data.pos">
        <video :width="data.w"  controls>
            <source :src="data.url" type="video/mp4">
        </video>
    </div>
    `,
    props: {
        data: null
    }
})
