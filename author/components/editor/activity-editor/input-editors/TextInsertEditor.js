export default {
    template: `
        <div>
            <div v-for="(possibleAnswer, index) in inputData.possibleAnswers">
                    
                    <b-row align-v="center">
                        <b-col cols="1">
                            <b-button-group vertical size="sm">
                                <b-button variant="outline-secondary" :disabled="!(index>0)"><b-icon icon="caret-up-fill"></b-icon></b-button>
                                <b-button variant="outline-secondary" :disabled="!(index<inputData.possibleAnswers.length-1)"><b-icon icon="caret-down-fill"></b-icon></b-button>
                            </b-button-group>
                        </b-col>
                        <b-col>
                            <b-input-group size="sm">
                                <b-form-input v-model="possibleAnswer.outcome.outcomeName" ></b-form-input>
            
                                <b-input-group-append>
                                  <b-button variant="outline-secondary" v-on:click="toggleOutcome(index)"><b-icon icon="alt"></b-icon></b-button>
                                  <b-button variant="outline-secondary"><b-icon icon="trash"></b-icon></b-button>
                                </b-input-group-append>
                            </b-input-group>
                            
                            <b-form-tags v-model="possibleAnswer.answers"></b-form-tags>


                            <b-collapse :id='"outcome-collapse-" + index'>
                                <input-outcome-editor :inputOutcomeData="possibleAnswer.outcome"></input-outcome-editor>    
                            </b-collapse>
                        </b-col>
                    </b-row>
                    
                
               
              
            </div>
            
            <b-row>
                        <b-col cols="1">
                            <b-button size="sm"><b-icon icon="plus"></b-icon></b-button>
</b-col>
</b-row>
        </div>`,

    props: {
        inputData: null
    },

    data() {
        return {
            selectedIndex: NaN
        }
    },

    methods: {
        toggleOutcome(index){
            if (this.selectedIndex === index) {
                this.$root.$emit('bv::toggle::collapse', "outcome-collapse-" + this.selectedIndex);
                this.selectedIndex = NaN;
                return;
            }

            if (!isNaN(this.selectedIndex)) {
                this.$root.$emit('bv::toggle::collapse', "outcome-collapse-" + this.selectedIndex);
            }

            this.$root.$emit('bv::toggle::collapse', "outcome-collapse-" + index);
            this.selectedIndex = index;
        }
    },

    components: {
        "input-outcome-editor": () => import("./InputOutcomeEditor.js")
    }
}