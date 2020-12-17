Vue.component('mission-displayer', {
    template: `
        <div align="center">
            <transition name="content-slide" mode="out-in">
                    <div v-if="this.pointedActivity" :key="this.pointedActivity.uuid">
                        <activity-displayer :activityContent="this.pointedActivity" :defaults="this.missionData.defaults"
                                                @next:activity="handleNextActivity"></activity-displayer>
                    </div>
            </transition>
            <div v-if="missionEnded">
            <lastScreen-displayer></lastScreen-displayer>
</div>
            <chat></chat>
            <score-displayer align="right" :score="this.missionScore"></score-displayer>
           
        </div>
    `,

    data() {
        return {
            missionData: null,

            pointedActivity: null,
            pointedIndex: 0,
            stile: 'test',
            missionScore: 23,
            missionEnded: false
            /*stile: {
                'background-color': 'black',
                'opacity': '0.8',
                'text-align': 'center'
            }*/
        }
    },
    methods: {
        handleNextActivity(nextMissionId) {
            if (nextMissionId) {
                this.pointedActivity =  this.missionData.activities[nextMissionId];
                this.missionScore = this.missionScore + 10;
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
