export default {
    template: `
        <div>
            <b-navbar type="dark" variant="info">
                <b-navbar-brand href="#">Missioni</b-navbar-brand> 
                
                <b-navbar-nav class="ml-auto">
                    <b-navbar-item right>
                        <b-button v-on:click="newMission()">
                            <b-icon icon="plus"></b-icon>
                        </b-button>
                    </b-navbar-item>    
                
                </b-navbar-nav>
                   
            </b-navbar>
            
            
            <div v-if="!error">
                <div v-for="missionHead in availableMissions" :key="missionHead.uid">
                    <mission-head-card :mission-head="missionHead"  @mission:selected="missionSelected"></mission-head-card>
                </div>
            </div>
            <p v-else> Errore</p>
    </div>`,

    data() {
        return {
            availableMissions: null,
            error: false
        }
    },
    methods: {
        missionSelected(missionHead) {
            this.$emit('mission:selection:changed', missionHead);
        },
        newMission() {
            // Gets from the server a new mission object, this way we have the uid right away
            axios.get("/missions/new").then((res) => {
                console.log(res);
            })
        }
    },
    components: {
        'mission-head-card': () => import("./MissionHeadCard.js")
    },
    mounted() {
        axios.
        get("/missions").then((res) => {
            if (res.status==200) {
                this.availableMissions = res.data;
            } else {
                this.error=true;
            }
        })
    }
}
