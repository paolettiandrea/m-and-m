export default {
    template: `
        <div >

                <div ><p style="text-align: center">Disponibili al pubblico</p></div>
                
                <div style="text-align: center;">
                    <b-badge pill href="#" v-for="(mission, id) in activeMissions" v-on:click="selectMission(id)" :key="id" style=" font-size: 14px">{{mission.head.title}}</b-badge>           
                </div>
                
                <b-badge pill href="#" v-on:click="createMission" style=" font-size: 14px">+</b-badge>           

               
    </div>`,

    computed: Vuex.mapGetters(['activeMissions']),
    methods: {
        ...Vuex.mapActions([
            'selectMission', 'createMission'
        ]),
        handleMissionSelectionRequest(newSelectionData) {
            if (this.selected) {this.selected.deselectionCallback()}
            this.selected = newSelectionData;
            if (this.selected) {this.selected.selectionCallback();}
            this.$emit('mission:selection:changed', newSelectionData);
        },
        handleMissionDeleted(deletedMissionHead) {
            for (let j = 0; j < this.availableMissions.length; j++) {
                if (this.availableMissions[j]._id===deletedMissionHead._id) {
                    this.availableMissions.splice(j, 1);
                    this.handleMissionSelectionRequest(null);
                    break;
                }
            }

        }
    }
}
