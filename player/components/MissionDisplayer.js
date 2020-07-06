Vue.component('mission-displayer', {
    template: `
        <div align="center">
        <transition name="content-slide" mode="out-in">
                <div class="activity-displayer-div" v-if="this.pointedActivity" :key="this.pointedActivity.uid">
                    <activity-displayer :activityContent="this.pointedActivity" :defaults="this.missionData.default"
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
            if (this.pointedIndex >= this.missionData.activityList.length) { this.pointedIndex = 0; }
            this.pointedActivity = this.missionData.activityList[this.pointedIndex];
        },

        handleNextActivity(nextMissionId) {
            var i = 0;
            for (const activity of this.missionData.activityList) {
                if (activity.uid===nextMissionId) {
                    this.pointedActivity = activity;
                    this.pointedIndex = i;
                    return;
                }
                i++;
            }
        }
    },

    mounted() {
        axios.
        get("/player/data/dummyMission.json").
        then(res => {
            console.log(res);
            this.missionData = res.data;

            this.pointedActivity = this.missionData.activityList[this.pointedIndex];
        })
    },
})