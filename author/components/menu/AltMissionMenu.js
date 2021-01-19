export default {
    template: `
        <div >
            <b-row no-gutters>
                <b-col>
                    <p> Disponibili al pubblico</p>
                    <mission-info-card v-for="(mission, id) in activeMissions" v-if="!mission.archived" :mission="mission" :key="id"></mission-info-card>
                </b-col>
                <b-col>
                    <p> Archiviate </p>
                    <mission-info-card v-for="(mission, id) in activeMissions" v-if="mission.archived" :mission="mission" :key="id"></mission-info-card>
                </b-col>
            </b-row>
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

Vue.component('mission-info-card', {
    template: `<b-card :img-src="'/' + mission.id + '/qrCode.svg'" img-alt="Card image" img-right img-height="200px" img-width="200px">
        <b-card-body>
            <b-card-title>{{mission.head.title}}</b-card-title>
            <b-card-sub-title class="mb-2">{{mission.head.summary}}</b-card-sub-title>

            <div>
                <b-button-toolbar key-nav>
                    <b-button-group>
                        <b-button @click="selectMission(mission.id)">Modifica</b-button>
                        <b-button @click="">Gioca</b-button>
                    </b-button-group>
                    <b-button-group>
                        <b-button v-if="!mission.archived" @click="archive()">Archivia</b-button>
                        <b-button v-else @click="publish()">Pubblica</b-button>
                    </b-button-group>
                    <b-button-group>
                        <b-button @click="deleteMission(mission.id)">Elimina</b-button>
                    </b-button-group>
                </b-button-toolbar>
            </div>
        </b-card-body>
    </b-card>`,

    props: {
        mission: null
    } ,
     methods: {
        ...Vuex.mapActions([
            'selectMission', 'createMission', 'deleteMission'
        ]),

        publish() {
            Vue.set(this.mission, "archived", false);
        },
        archive() {
            Vue.set(this.mission, "archived",true);
            // TODO save on server
        },
    }
})
