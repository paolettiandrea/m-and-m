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

            var processedAnswer = this.answer.trim().toLowerCase();

            for (var possibility of this.inputData.possibilityList) {
                // Check each answer of this possibility, if one matches launch the corresponding outcome
                for(var answer of possibility.possibleAnswers) {
                    if (processedAnswer===answer) {
                        console.log("Emitting outcome for defined answer");
                        this.$emit('input-received', possibility.outcome);
                        return;
                    }
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
    },
    data() {
        return {
            answer: '',
        }
    }

})