export default {
    template: `
        <div>
            <div v-for="(possibleAnswer, index) in inputData.possibleAnswers">
                    
                    <b-row align-v="center">
                        <b-col cols="1">
                            <b-button-group vertical size="sm" class="vertical-arrow-group">
                                <b-button   class="vertical-arrow-button" variant="outline-secondary" 
                                            :disabled="!(index>0)" 
                                            v-on:click="movePossibility(-1, index)">
                                    <b-icon icon="caret-up-fill"></b-icon>
                                </b-button>
                                <b-button   class="vertical-arrow-button" variant="outline-secondary" 
                                            :disabled="!(index<inputData.possibleAnswers.length-1)"     
                                            v-on:click="movePossibility(+1, index)">
                                    <b-icon icon="caret-down-fill"></b-icon>
                                </b-button>
                            </b-button-group>
                        </b-col>
                        <b-col>
                            <b-input-group size="sm">
                            
                                <b-input-group-prepend>
                                  <b-button variant="outline-secondary" v-on:click="toggleOutcome(index)"><b-icon icon="alt"></b-icon></b-button>
                                </b-input-group-prepend>
                            
                                <b-form-tags v-model="possibleAnswer.answers"></b-form-tags>
            
                                <b-input-group-append>
                                  <b-button variant="outline-secondary" v-on:click="removePossibility(index)"><b-icon icon="trash"></b-icon></b-button>
                                </b-input-group-append>
                            </b-input-group>
                            
                            <b-row align-h="end">
                                <b-col cols="11">
                                    <b-collapse :id='"outcome-collapse-" + index'>
                                        <input-outcome-editor :inputOutcomeData="possibleAnswer.outcome"></input-outcome-editor>    
                                    </b-collapse>
                                </b-col>
                            </b-row>
                            
                        </b-col>
                    </b-row>
            </div>
            
<!-- Add outcome button -->
            <b-row>
                <b-col cols="1">
                </b-col>
            </b-row>
            
<!--Fallback outcome-->
            <b-row>
                <b-col cols="1">
                    <b-button size="sm" v-on:click="addPossibility"><b-icon icon="plus"></b-icon></b-button>
                </b-col>
                
                <b-col>
                    <b-input-group size="sm">
                            
                        <b-input-group-prepend>
                          <b-button variant="outline-secondary" v-on:click="toggleOutcome(-1)"><b-icon icon="alt"></b-icon></b-button>
                        </b-input-group-prepend>
                    
                        <b-input value="Fallback" readonly></b-input>

                    </b-input-group>
                    
                    <b-row align-h="end">
                        <b-col cols="11">
                            <b-collapse :id='"outcome-collapse-" + (-1)'>
                                <input-outcome-editor :inputOutcomeData="inputData.fallbackOutcome"></input-outcome-editor>    
                            </b-collapse>
                        </b-col>
                    </b-row>
                    
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
        },

        removePossibility(index) {
            this.inputData.possibleAnswers.splice(index, 1);
        },

        addPossibility() {
            this.inputData.possibleAnswers.push({
                answers: [],
                outcome: {
                    outList: []
                }
            })
        },

        movePossibility(offset, index) {
            var p = this.inputData.possibleAnswers[index];
            this.inputData.possibleAnswers.splice(index, 1);
            this.inputData.possibleAnswers.splice(index + offset, 0, p);

            if (this.selectedIndex===index || this.selectedIndex===(index+offset)) {
                this.toggleOutcome(index+offset)
            }
        }

    },



    components: {
        "input-outcome-editor": () => import("./InputOutcomeEditor.js")
    }
}