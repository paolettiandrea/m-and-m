export default {
    template: `
        <div>
            
            <b-list-group>
                <div v-for="(inputOutcome, index) in inputOutcomeData.outList">
                    <b-list-group-item size="sm" button  :key="index">
                     {{inputOutcome.outcomeType}}
                     
                     <b-button size="sm" class="mini-button"> <b-icon icon="trash"></b-icon></b-button>
                     </b-list-group-item>
                </div>
                <b-list-group-item v-if="!isOutListTerminated">
                    <b-button size="sm" v-on:click="addPopupOutcome">Popup</b-button>
                    <b-button size="sm" v-on:click="addNextOutcome">Next</b-button>
                </b-list-group-item>
</b-list-group>
        </div>`,

    props: {
        inputOutcomeData: null
    },

    data() {
        return {

        }
    },

    computed: {
        // The outcome list is considered terminated when the last element has an outcomeType == 'next', which will trigger a new activity
        isOutListTerminated: function() {
            var listLength = this.inputOutcomeData.outList.length;
            return listLength > 0 && this.inputOutcomeData.outList[listLength - 1].outcomeType === 'next';
        }
    },

    methods: {
        addPopupOutcome() {
            this.inputOutcomeData.outList.push({
                outcomeType: "popup",
                popupContent: {

                }
            })
        },

        addNextOutcome() {
            this.inputOutcomeData.outList.push({
                outcomeType: "next",

            })
        },

        outcomeClicked(clickedOutcomeData) {
            this.$bubble('outcome-clicked', clickedOutcomeData);
        }
    },

    created() {
        if (!this.inputOutcomeData.outList) {
            this.inputOutcomeData.outList = [];
        }
    },

    components: {
        "draggable": () => import('/vuedraggable/dist/vuedraggable.umd.js')
    }

}