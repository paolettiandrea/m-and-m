Vue.component('mission-displayer', {
    template: `
        <div id="mission-displayer-main">
            <score-displayer align="right" :score="this.missionScore" style="position: absolute; top: 0px; right: 20px"></score-displayer>
            <transition name="content-slide" mode="out-in">
                    <div v-if="this.pointedActivity" :key="this.pointedActivity.uuid" style="height: 100%">
                        <activity-displayer :activityContent="this.pointedActivity" :defaults="this.missionData.defaults" style="height: 100%"
                                                @next:activity="handleNextActivity"></activity-displayer>
                    </div>
            </transition>
            <div v-if="missionEnded">
                <lastScreen-displayer :score="missionScore"></lastScreen-displayer>
            </div>
            <chat></chat>

        </div>
    `,

    data() {
        return {
            missionData: null,

            pointedActivity: null,
            pointedIndex: 0,
            stile: 'test',
            missionScore: 0,
            missionEnded: false
            /*stile: {
                'background-color': 'black',
                'opacity': '0.8',
                'text-align': 'center'
            }*/
        }
    },
    methods: {
        nextActivity() {
            // Funzione temporanea che cambia la pointedActivity a quella successiva nella lista contenuta in missionData
            this.pointedIndex++;
            if (this.pointedIndex >= this.missionData.activities.length) { this.pointedIndex = 0; }
            this.pointedActivity = this.missionData.activities[this.pointedIndex];

        },

        handleNextActivity(nextActivityId, points) {
            this.pointedActivity = this.missionData.activities[nextActivityId];
            if (nextActivityId) {
                this.pointedActivity =  this.missionData.activities[nextActivityId];
                if (points) {
                    this.missionScore = this.missionScore + parseInt(points);
                }
                console.log("Emitting started activity event");
                socket.emit('starting-activity', nextActivityId);
            } else {
                // MISSION ENDED
                this.missionEnded = true;
                this.pointedActivity = null;

            }
        },
        prefetchResources(missionData) {
            for (let activity in missionData.activities) {
                for (content of missionData.activities[activity].content) {
                    if (content.contentType === 'img-displayer') {
                        let url = content.contentData.imgResData.url;
                        if (url) {
                            let preload_image = new Image();
                            preload_image.src = url;
                            console.log("Found and prefetched URL", url)
                        }

                    }
                }
            }
        },


    },

    mounted() {
        let uri = window.location.search.substring(1);
        let params = new URLSearchParams(uri);
        let missionId = params.get("missionId")
        if (missionId) {
            axios.
            get("/missions/content/" + missionId).
            then(res => {
                this.missionData = JSON.parse(res.data);
                this.pointedActivity = this.missionData.activities.initial;


                this.prefetchResources(this.missionData);
            })




            socket.emit('player-handshake');
            socket.emit('starting-mission', missionId)
            socket.emit('starting-activity', 'initial');
        } 



        socket.on('scored', (scoringData) => {
            console.log("Received scoring data: ", scoringData);
            if (scoringData.score) {
                this.missionScore += scoringData.score;
            } else {
                console.warn("No score in the received scoringData object")
            }
        })
    },
})


