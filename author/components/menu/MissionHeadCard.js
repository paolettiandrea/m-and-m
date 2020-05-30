export default {
    template: `
    <div v-if="missionHead" >
        <b-card class="m-head-card" :title="missionHead.title" :sub-title="missionHead.summary"
                v-on:click="emitSelection" v-on:keyup.enter="emitSelection"
                tabindex="0" role="button">
                
            <b-collapse v-model="selected">
                <b-row align-h="between">
                    <b-col cols="8">
                        <b-button-group>
                            <b-button :disabled="!changed" v-on:click="uploadMission()"  variant="outline-primary" size="sm">
                                <b-icon icon="cloud-upload" aria-hidden="true"></b-icon>
                            </b-button>
                            <b-button  variant="outline-primary" size="sm">
                                <b-icon icon="subtract" aria-hidden="true"></b-icon>
                            </b-button>
                            <b-button  variant="outline-primary" v-on:click="deleteMission()" size="sm">
                                <b-icon icon="trash" aria-hidden="true"></b-icon>
                            </b-button>
                        </b-button-group>
                    </b-col>
                    <b-col cols="4">
                        <b-row align-h="end" no-gutters> 
                            <b-button :id="headFormButId" variant="outline-primary" size="sm" >
                                  <b-icon icon="tools" aria-hidden="true"></b-icon>
                            </b-button>
                        </b-row>
                        
                    </b-col>
                </b-row>
                    
                <b-popover placement="right" triggers="click blur" :target="headFormButId">
                    <template v-slot:title>
                        Mission Info
                    </template>
                    <mission-head-form :mission-head="missionHead"></mission-head-form>
                </b-popover>
            </b-collapse>
        </b-card>
    </div>`,
    data() {
        return {
            selected: false,
            changed: false,
        }
    },
    props: {
        missionHead: Object,
    },
    watch:{
        'missionHead': {
            handler: function (after, before) {
                this.changed = true;
            },
            deep: true
        }
    },
    components: {
        "mission-head-form": () => import("../editor/MissionHeadForm.js")
    },
    computed: {
        headFormButId() {
            return "head-form-but" + this.missionHead._id;
        }
    },
    methods: {
        //
        emitSelection() {
            this.$emit('mission:selected', {
                missionHead: this.missionHead,
                selectionCallback: this.select,
                deselectionCallback: this.deselect
            });
        },
        // Callback called when this mission is selected
        select() {
            this.selected = true;
        },
        deselect() {
            this.selected = false;
        },
        deleteMission() {
            axios.delete("/missions/delete/"+ this.missionHead._id).then((res) => {
                // Check that the returned deletedContentId matches
                if (res.data.deletedContentId !== this.missionHead.contentId) {
                    throw Error("Something went very bad, the returned deletedContentId doesn't match");
                } else {
                    this.$bubble('mission:deleted', this.missionHead)
                }
            });
        },
        uploadMission() {
            axios.post("/missions/update", {missionHead: this.missionHead}).then(() => {
                console.log("adsasd");
            })
            this.changed = false;
        }
    }
}