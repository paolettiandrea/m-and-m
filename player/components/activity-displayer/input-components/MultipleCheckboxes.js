Vue.component("multiple-checkboxes", {
    template: `<div>
      <label>Select your answer:</label>
      <div v-if="!inputData.multiple" v-for="optionData in inputData.optionList">
        <simple-button :inputData="optionData" :defaults="defaults" @input-received="clickReceived"></simple-button>
      </div>
    </div>`,

props: {
  inputData: null,
  defaults: null,
},

methods: {
  clickReceived(clickedButtonData) {
      console.log(clickedButtonData);
    this.$emit('input-received', clickedButtonData);
  }
},

  computed: {

      buttonStylingData() {
        return mergeStyleData(      // Lasciata a metà testando CommonDataUtils.js
            [buildFontStyle(this.inputData.buttonTextFontData, this.defaults),
            buildBorderStyle(this.inputData, this.defaults)])
      }
  },

data() {
  return {
  }
}

    
})