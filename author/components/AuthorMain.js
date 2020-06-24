
export default {
    template: `<div class="full-height">
        <alt-mission-menu></alt-mission-menu>
        <div>
</div>
        <b-container fluid class="full-height">
            <b-row class="full-height">
                <b-col class="full-height" cols="3" region="Mission Menu">
                    <mission-menu @mission:selection:changed="handleChangeSelection" class="full-height"></mission-menu>
                </b-col>
                <b-col class="full-height">
                    <div class="full-height">
                        <mission-editor></mission-editor>
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
            this.$store.commit('select', selectedData.missionHead._id);
        }
    },
    components: {
        'mission-menu': () => import("./menu/MissionMenu.js"),
        'mission-editor': () => import("./editor/MissionEditor.js"),
        'alt-mission-menu': () => import("./menu/AltMissionMenu.js")
    },


}