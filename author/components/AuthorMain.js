export default {
    template: `<div>
        <b-container fluid>
            <b-row>
                <b-col cols="3" region="Mission Menu">
                    <mission-menu @mission:selection:changed="handleMissionSelectionChanged"></mission-menu>
                </b-col>
                <b-col>
                    <div>
                        <mission-editor :mission-head="selectedMission"></mission-editor>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>`,

    data() {
        return {
            availableMissions: null,
            selectedMission: null
        }
    },
    methods: {
        handleMissionSelectionChanged(missionHead) {
            this.selectedMission = missionHead;
            console.log('Mission selection changed');
        }
    },
    components: {
        'mission-menu': () => import("./menu/MissionMenu.js"),
        'mission-editor': () => import("./editor/MissionEditor.js")
    },
    mounted() {
        axios.
        get("/missions")
            .then(res => {
                this.availableMissions = res.data;
            })
    }
}