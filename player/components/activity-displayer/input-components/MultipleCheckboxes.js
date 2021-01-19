Vue.component("multiple-checkboxes", {
    template: `<div>
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