Vue.component("text-insert", {
  template: ` <div>
        <b-form-input
          style="margin-bottom: 0.2em"
          :style="insertStyle"
          id="input-1"
          v-model="answer"
          required
          :placeholder="insertPlaceholder"
          :type="this.inputData.textType || 'text'"
        ></b-form-input>

     <simple-button style="margin:auto; display:block; white-space: nowrap" :inputData="inputData" :defaults="defaults" @input-received="verifyAnswer"></simple-button>
    </div>`,

  props: {
    inputData: null,
    defaults: null,
  },
  methods: {
    verifyAnswer() {
      console.log("Clicked");

      if (this.answer) {

      for (var possibility of this.inputData.possibilityList) {
        switch (possibility.inputType) {
          case "string": {
            switch (possibility.operator) {
              case "eq": {
                if (this.answer === possibility.val) {
                  this.$emit("input-received", possibility.outcome);
                  return;
                }
                break;
              }
              case "eqw": {
                var processedAnswer = this.answer.trim().toLowerCase();
                var processedVal = possibility.val.trim().toLowerCase();
                if (processedVal === processedAnswer) {
                  this.$emit("input-received", possibility.outcome);
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
            console.log("Parsed float answer: ", answerParsed);
            console.log("Parsed float answer: ", valParsed);
            switch (possibility.operator) {
              case "eq": {
                if (answerParsed === valParsed) {
                  console.log("Input num found to be equal");
                  this.$emit("input-received", possibility.outcome);
                  return;
                }
                break;
              }
              case "lt": {
                if (answerParsed < valParsed) {
                  console.log("Input num found to be lower");
                  this.$emit("input-received", possibility.outcome);
                  return;
                }
                break;
              }
              case "gt": {
                if (answerParsed > valParsed) {
                  console.log("Input num found to be greater");
                  this.$emit("input-received", possibility.outcome);
                  return;
                }
                break;
              }
            }
            break;
          }
        }

        this.$emit("input-received", this.inputData.fallbackOutcome);
        console.log("Emitting fallback");
      }
      }
    },
  },

  data() {
    return {
      answer: "",
    };
  },

  computed: {
    insertPlaceholder() {
      if (this.inputData.placeholderText) { return this.inputData.placeholderText}
      else { return "Inserisci la tua risposta"}
    },
    insertStyle() {
        return buildButtonStyle(this.inputData.insertFieldStyleData, this.defaults.buttonData, uberDefaults.buttonData);
    }
  }
});
