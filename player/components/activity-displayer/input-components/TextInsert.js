Vue.component("text-insert", {
    template:` <div>
      <b-form-group
        id="input"
        label="Enter your answer:"
        label-for="input-1"
      >
        <b-form-input
          id="input-1"
          v-model="answer"
          required
          placeholder="Enter your answer"
          :type="this.inputData.textType || 'text'"
        ></b-form-input>
      </b-form-group>


      <b-button :style="{fontSize: inputData.buttonFontData.fontSize || defaults.textFontData.fontSize }" type="submit" variant="primary" v-on:click="textState">Submit</b-button>
    </b-form>
    <br>
    </div>`,

    props: {
        inputData: null,
        defaults: null,
    },
    methods: {
        textState() {
            //window.alert( this.answer );

            //var correct = this.answer == this.inputData.correctAnswer ? true : false


            for (var possibility of this.inputData.possibilityList) {

                switch (possibility.inputType) {
                    case "string": {

                        switch (possibility.operator) {
                            case "eq": {
                                var processedAnswer = this.answer.trim().toLowerCase();
                                var processedVal = possibility.val.trim().toLowerCase();
                                if (processedVal === processedAnswer) {
                                    console.log("Emitting outcome for defined answer");
                                    this.$emit('input-received', possibility.outcome);
                                    return;
                                }
                                break;
                            }
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


                // if(correct){
                //     this.$emit('input-received', this.inputData.rightOutcome);
                // } else{
                //     this.$emit('input-received', this.inputData.wrongOutcome);
                // }
            }
        }
    },
    data() {
        return {
            answer: '',
        }
    },

})