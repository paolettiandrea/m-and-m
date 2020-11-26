Vue.component('mission-displayer', {
    template: `
        <div align="center">
        <transition name="content-slide" mode="out-in">
                <div v-if="this.pointedActivity" :key="this.pointedActivity.uuid">
                    <activity-displayer :activityContent="this.pointedActivity" :defaults="this.missionData.defaults"
                                            @next:activity="handleNextActivity"></activity-displayer>
                </div>
        </transition>
        <button  v-on:click="nextActivity">Next mission</button>
        <chat></chat>
        </div>
    `,

    data() {
        return {
            missionData: null,

            pointedActivity: null,
            pointedIndex: 0,
            stile: 'test'
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

        handleNextActivity(nextMissionId) {
            this.pointedActivity =  this.missionData.activities[nextMissionId];
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
      /*  if (missionId) {
            axios.
            get("/missions/content/" + missionId).
            then(res => {
                this.missionData = JSON.parse(res.data);
                this.pointedActivity = this.missionData.activities.initial;
            })
        } else {*/
            axios.
            get("/player/data/dummyMission.json").
            then(res => {
                this.missionData = res.data;
                this.pointedActivity = this.missionData.activities.initial;
            })
        //}



    },
})
