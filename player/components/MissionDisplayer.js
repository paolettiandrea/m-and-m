Vue.component('mission-displayer', {
    template: `
        <div align="center">
        <transition name="content-slide" mode="out-in">
                <div class="activity-displayer-div" v-if="this.pointedActivity" :key="this.pointedActivity.uid">
                    <activity-displayer :activityContent="this.pointedActivity"></activity-displayer>
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
        }
    },

    mounted() {
        axios.
        get("/player/data/dummycontent.json").
        then(res => {
            this.missionData = res.data;

            this.pointedActivity = this.missionData.activityList[this.pointedIndex];
        })
    },

    components: {
    }
})