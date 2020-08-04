Vue.component('audio-player', {
    template: `
    <div  :align="contentData.pos">
        <b-button @click="playSound">Play</b-button>
        
    </div>
    `,
    props: {
        contentData: null
    },

    methods: {
        playSound () {
            if(this.contentData.audioResourceData.url) {
                var audio = new Audio(this.contentData.audioResourceData.url);
                audio.play();
            }
        }
    }
})
