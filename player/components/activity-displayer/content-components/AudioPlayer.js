Vue.component('audio-player', {
    template: `
    <div  :align="contentData.pos">
        <b-button :style="buttonStyle" @click="playSound"><b-icon icon="play-fill"></b-icon></b-button>
        
    </div>
    `,
    props: {
        contentData: {required: true },
        defaults: { required: true }
    },

    computed: {
        buttonStyle() {
            return buildButtonStyle(this.contentData.buttonData, this.defaults.buttonData, uberDefaults.buttonData);
        }
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
