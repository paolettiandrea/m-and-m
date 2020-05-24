export default {
    template: `
        <div>
        <h3>Active missions</h3>
            <div v-if="!error">
                <div v-for="missionHead in availableMissions" :key="missionHead.uid">
                    <mission-head-card :mission-head="missionHead"  @mission:selected="missionSelected"></mission-head-card>
                </div>
            </div>
            <p v-else> Errore</p>
    </div>`,

    data() {
        return {
            availableMissions: null,
            error: false
        }
    },
    methods: {
        missionSelected(missionHead) {
            this.$emit('mission:selection:changed', missionHead);
        }
    },
    components: {
        'mission-head-card': () => import("./MissionHeadCard.js")
    },
    mounted() {
        axios.
        get("/missions").then((res) => {
            if (res.status==200) {
                this.availableMissions = res.data;
            } else {
                this.error=true;
            }
        })
    }
}
