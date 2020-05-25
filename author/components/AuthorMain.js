export default {
    template: `<div>
        <b-container fluid>
            <b-row>
                <b-col cols="3" region="Mission Menu">
                    <mission-menu @mission:selection:changed="handleMissionSelectionChanged"></mission-menu>
                </b-col>
                <b-col>
                    <div v-if="selectedMissionData">
                        <mission-editor :mission-head="selectedMissionData.missionHead"></mission-editor>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>`,

    data() {
        return {
            availableMissions: null,
            selectedMissionData: null
        }
    },
    methods: {
        handleMissionSelectionChanged(newSelectionData) {
            if (this.selectedMissionData) {this.selectedMissionData.deselectionCallback()}
            this.selectedMissionData = newSelectionData;
            this.selectedMissionData.selectionCallback();
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