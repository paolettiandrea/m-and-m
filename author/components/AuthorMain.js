export default {
    template: `<div>
        <b-container fluid>
            <b-row>
                <b-col cols="3" region="Mission Menu">
                    <mission-menu @mission:selection:changed="handleChangeSelection"></mission-menu>
                </b-col>
                <b-col>
                    <div v-if="this.selectedData">
                        <mission-editor :mission-content="selectedData.missionContent"></mission-editor>
                    </div>
                </b-col>
            </b-row>
        </b-container>
    </div>`,

    data(){
        return {
            selectedData: null
        }
    },

    methods: {
        handleChangeSelection(selectedData) {
            this.selectedData = selectedData;
        }
    },
    components: {
        'mission-menu': () => import("./menu/MissionMenu.js"),
        'mission-editor': () => import("./editor/MissionEditor.js")
    }
}