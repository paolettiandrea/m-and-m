Vue.component('audio-player', {
    template: `
    <div :align="contentData.pos">
        <b-button v-if="sharedState.audioPlaying" :style="buttonStyle" @click="stopSound"><b-icon icon="pause-fill"></b-icon></b-button>
        <b-button v-else :style="buttonStyle" @click="playSound"><b-icon icon="play-fill"></b-icon></b-button>
    </div>
    `,
    props: {
        contentData: {required: true },
        defaults: { required: true },
        sharedState: null
    },

    computed: {
        buttonStyle() {
            return buildButtonStyle(this.contentData.buttonData, this.defaults.buttonData, uberDefaults.buttonData);
        },
    },
    methods: {
        playSound () {
            if(this.contentData.audioResourceData.url) {
                if (!this.sharedState.audioPlaying) {
                    var audio = new Audio(this.contentData.audioResourceData.url);
                    this.sharedState.audioPlaying = audio;
                    Vue.set(this.sharedState, 'audioPlaying', audio);
                    audio.play();
                    audio.addEventListener('ended', () => {
                        console.log("Audio ended");
                        Vue.set(this.sharedState, 'audioPlaying',null);
                    })
                } else {
                    console.log("need to wait to play another audio")
                }
              
            }
        },

        stopSound() {
            if (this.sharedState.audioPlaying) {
                this.sharedState.audioPlaying.pause();
                Vue.set(this.sharedState, 'audioPlaying', null);
            }
        }
    }
})
