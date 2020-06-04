
export default {
    template: `<div class="full-height">
        <b-container fluid class="full-height">
            <b-row class="full-height">
                <b-col class="full-height" cols="3" region="Mission Menu">
                    <mission-menu @mission:selection:changed="handleChangeSelection" class="full-height"></mission-menu>
                </b-col>
                <b-col class="full-height">
                    <div class="full-height" v-if="this.selectedData">
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
    },


}