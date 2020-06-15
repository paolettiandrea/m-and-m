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
        ></b-form-input>
      </b-form-group>


      <b-button type="submit" variant="primary" v-on:click="textState">Submit</b-button>
    </b-form>
    <br>
    </div>`,

    props: {
        inputData: null
    },
    methods: {
        textState() {
            window.alert( this.answer );

            var correct = this.answer == this.inputData.correctAnswer ? true : false

            if(correct){
                this.$emit('input-received', this.inputData.rightOutcome);
            } else{
                this.$emit('input-received', this.inputData.wrongOutcome);
            }
        }
    },
    data() {
        return {
            answer: '',
        }
    }

})