export default {
    template: `
        <div class="column-flex-container full-height">
            <b-navbar class="no-flex-grow" type="dark" variant="info">
                <b-navbar-brand>Missioni</b-navbar-brand> 
                
                <b-navbar-nav class="ml-auto">
                        <b-button v-on:click="newMission()">
                            <b-icon icon="plus"></b-icon>
                        </b-button>  
                </b-navbar-nav>
            </b-navbar>
            
            
            <div class="full-flex vertical-scroll" v-if="!error">
                <div v-for="missionHead in availableMissions" :key="missionHead._id">
                    <mission-head-card 
                            :mission-head="missionHead"  
                            @mission:deleted="handleMissionDeleted" 
                            @mission:selected="handleMissionSelectionRequest"></mission-head-card>
                </div>
            </div>
            <p v-else> Errore</p>
    </div>`,

    data() {
        return {
            availableMissions: null,
            error: false,
            selected: null
        }
    },
    methods: {
        handleMissionSelectionRequest(newSelectionData) {
            if (this.selected) {this.selected.deselectionCallback()}
            this.selected = newSelectionData;
            if (this.selected) {this.selected.selectionCallback();}
            this.$emit('mission:selection:changed', newSelectionData);
        },
        newMission() {
            // Gets from the server a new mission object, this way we have the uid right away
            axios.get("/missions/new").then((res) => {
                this.availableMissions.push(res.data);
            })
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
    },
    components: {
        'mission-head-card': () => import("./MissionHeadCard.js")
    },
    mounted() {
        axios.
        get("/missions/heads").then((res) => {
            if (res.status===200) {
                this.availableMissions = res.data;
            } else {
                this.error=true;
            }
        })
    }
}
