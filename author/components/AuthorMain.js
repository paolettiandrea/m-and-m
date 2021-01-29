
export default {
    template: `<div class="full-height" style="overflow:auto">
 
        <editor-main class="full-height" v-if="selectedMissionContent"></editor-main>
        <alt-mission-menu v-else  style=""></alt-mission-menu>
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

    computed: {
        ...Vuex.mapGetters(['selectedMissionContent'])
    },
    components: {
        'mission-menu': () => import("./menu/MissionMenu.js"),
        'mission-editor': () => import("./editor/EditorMain.js"),
        'alt-mission-menu': () => import("./menu/AltMissionMenu.js")
    },


}