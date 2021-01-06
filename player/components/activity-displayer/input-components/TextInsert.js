Vue.component("text-insert", {
    template:` <div style="display: flex">
      <b-form-group style="flex: 1; margin-bottom: 0; margin-right: 0.5rem"
        id="input"
        label-for="input-1">
        <b-form-input
          id="input-1"
          v-model="answer"
          required
          placeholder="Enter your answer"
          :type="this.inputData.textType || 'text'"
        ></b-form-input>
      </b-form-group>

     <simple-button style="flex: 0; white-space: nowrap" :inputData="inputData" :defaults="defaults" @input-received="textState"></simple-button>
    </div>`,

    props: {
        inputData: null,
        defaults: null,
    },
    methods: {
        textState() {
            console.log('Clicked')
            //window.alert( this.answer );

            //var correct = this.answer == this.inputData.correctAnswer ? true : false


            for (var possibility of this.inputData.possibilityList) {

                switch (possibility.inputType) {
                    case "string": {

                        switch (possibility.operator) {
                            case "eq": {
                                if (this.answer === possibility.val) {
                                    this.$emit('input-received', possibility.outcome);
                                    return;
                                }
                                break;
                            }
                            case "eqw": {
                                var processedAnswer = this.answer.trim().toLowerCase();
                                var processedVal = possibility.val.trim().toLowerCase();
                                if (processedVal === processedAnswer) {
                                    this.$emit('input-received', possibility.outcome);
                                    return;
                                }
                                break;}
                        }
                        break;
                    }
                    case "number": {
                        let answerParsed = parseInt(this.answer);
                        let valParsed = parseInt(possibility.val);
                        console.log('Parsed float answer: ', answerParsed)
                        console.log('Parsed float answer: ', valParsed)
                        switch (possibility.operator) {
                            case "eq": {
                                if (answerParsed===valParsed) {
                                    console.log('Input num found to be equal')
                                    this.$emit('input-received', possibility.outcome);
                                    return;
                                }
                                break;
                            }
                            case "lt": {
                                if (answerParsed<valParsed) {
                                    console.log('Input num found to be lower')
                                    this.$emit('input-received', possibility.outcome);
                                    return;
                                }
                                break;
                            }
                            case "gt": {
                                if (answerParsed > valParsed) {
                                    console.log('Input num found to be greater')
                                    this.$emit('input-received', possibility.outcome);
                                    return;
                                }
                                break;
                            }
                        }
                        break;
                    }
                }

                this.$emit('input-received', this.inputData.fallbackOutcome);
                console.log("Emitting fallback");
            }
        }
    },
    data() {
        return {
            answer: '',
        }
    },

})