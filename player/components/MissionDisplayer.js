Vue.component('mission-displayer', {
    template: `
        <div id="mission-displayer-main">
            <score-displayer align="right" :score="this.missionScore" style="position: absolute; top: 10px; right: 10px"></score-displayer>
            <transition name="content-slide" mode="out-in">
                    <div v-if="this.pointedActivity" :key="this.pointedActivity.uuid" style="height: 100%">
                        <activity-displayer :activityContent="this.pointedActivity" :defaults="this.missionData.defaults" style="height: 100%"
                                                @next:activity="handleNextActivity"></activity-displayer>
                    </div>
            </transition>
            <div v-if="missionEnded">
            <lastScreen-displayer></lastScreen-displayer>
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

        handleNextActivity(nextMissionId, points) {
            this.pointedActivity = this.missionData.activities[nextMissionId];
            if (nextMissionId) {
                this.pointedActivity =  this.missionData.activities[nextMissionId];
                if (points) {
                    this.missionScore = this.missionScore + parseInt(points);
                }
            } else {
                this.missionEnded = true;
                this.pointedActivity = null;
            }
            // var i = 0;
            // for (const activity of this.missionData.activities) {
            //     if (activity.uid===nextMissionId) {
            //         this.pointedActivity = activity;
            //         this.pointedIndex = i;
            //         return;
            //     }
            //     i++;
            // }
        }
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
            })

            socket.emit('starting-mission', missionId)
        } else {
            axios.
            get("/player/data/dummyMission.json").
            then(res => {
                this.missionData = res.data;
                this.pointedActivity = this.missionData.activities.initial;
            })
        }
    },
})