
export default {
    template: `<div style="display: flex; flex-flow: column; align-items: stretch; height: 100%">
        <alt-mission-menu style="flex: 0 1 auto"></alt-mission-menu>
        <div>
</div>
        <b-container fluid style="flex: 1 1 auto">
            <b-row class="full-height">
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