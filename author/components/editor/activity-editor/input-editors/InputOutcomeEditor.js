export default {
    template: `
        <div>
            <b-list-group>
                <div v-for="(inputOutcome, index) in inputOutcomeData.outList" v-if="inputOutcome.outcomeType!=='next'">
                
                    <b-input-group class="mb-2" :key="index" size="sm">
                        <b-input-group-prepend>
                            <b-button>
                                <b-icon :icon="iconNameFromOutcomeType(inputOutcome)"></b-icon>
                            </b-button>
                        </b-input-group-prepend>
                        
                        <b-form-input placeholder="Punti"></b-form-input>
                        
                        <b-input-group-append>
                            <b-button> <b-icon icon="trash" v-on:click="removeOutcome(index)"></b-icon></b-button>
                        </b-input-group-append>
                    </b-input-group>
                </div>

<!--Next activity-->
                <div v-else>
                    <b-input-group class="mb-2" :key="index" size="sm">
                        <b-input-group-prepend>
                            <b-button>
                                <b-icon icon="arrow-down-square-fill"></b-icon>
                            </b-button>
                            <b-button v-on:click="pickNextActivity">Pick</b-button>
                        </b-input-group-prepend>
                        
                        <b-form-input placeholder="Punti"></b-form-input>
                        
                        <b-input-group-append>
                            <b-button> <b-icon icon="trash" v-on:click="removeNextActivity"></b-icon></b-button>
                        </b-input-group-append>
                    </b-input-group>
</div>
                
                <div v-if="!isOutListTerminated">

                    <content-type-selector @new:content="addPopup">
                        <template v-slot:button-prepend>
                            <b-button v-on:click="addNextActivity"><b-icon icon="arrow-down-square-fill"></b-icon></b-button>
                        </template>
                    </content-type-selector>
                </div>
            </b-list-group>
        </div>`,

    props: {
        inputOutcomeData: null,
    },

    computed: {
        // The outcome list is considered terminated when the last element has an outcomeType == 'next', which will trigger a new activity
        isOutListTerminated: function() {
            var listLength = this.inputOutcomeData.outList.length;
            return listLength > 0 && this.inputOutcomeData.outList[listLength - 1].outcomeType === 'next';
        }
    },

    methods: {
        iconNameFromOutcomeType(outcome) {
            if (outcome.outcomeType === 'popup') {
                for (const content of this.$store.state.contentTypes) {
                    if (outcome.popupContent.type === content.type) {
                        return content.icon;
                    }
                }
            } else {
                return 'arrow-down-square-fill'
            }
            console.error("contentType not recognised while assigning icon");
        },

        addPopup(outcomeData) {
            this.inputOutcomeData.outList.push({
                outcomeType: 'popup',
                popupContent: outcomeData.contentChunk
            });
        },
        addNextActivity() {
            this.inputOutcomeData.outList.push({
                outcomeType: 'next',
                nextActivityId: 0
            });
        },
        removeOutcome(index) {
            this.inputOutcomeData.outList.splice(index, 1);
        },
        removeNextActivity() {
            this.$store.state.canvas.deleteEdge(this.lastOutcome().edgeId);
            this.inputOutcomeData.outList.splice(this.inputOutcomeData.outList.length-1, 1);
        },

        lastOutcome() {
            if (this.inputOutcomeData.outList.length>0) return this.inputOutcomeData.outList[this.inputOutcomeData.outList.length-1];
            else return null;
        },

        pickNextActivity() {
            this.$store.commit('addActivityClickedCallback', (id) => {
                console.log("Callback");
                // If already valid id first remove the corresponding edge
                if (this.lastOutcome().edgeId) {
                    this.$store.state.canvas.deleteEdge(this.lastOutcome().edgeId);
                }
                // Then create a new
                this.lastOutcome().nextActivityId = id;
                this.$store.state.canvas.newEdge(this.$store.state.selectedActivityId, this.lastOutcome(), id);
            })
        }

    },

    created() {
        if (!this.inputOutcomeData.outList) {
            this.inputOutcomeData.outList = [];
        }
    },

    components: {
        "content-type-selector": () => import("../ContentTypeSelector.js")
    }

}