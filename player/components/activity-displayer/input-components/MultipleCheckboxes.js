Vue.component("multiple-checkboxes", {
    template: `<div>
      
      <label>Select your answer:</label>
      <li v-for="item in inputData.buttonList">
        <b-button pill variant="primary" v-bind:style="buttonStylingData"
        v-bind:key="inputData.button" 
        v-bind:text="inputData.button" 
        v-on:click="clickReceived(item)">{{item.button}}</b-button>
      </li>

    </div>`,

props: {
  inputData: null,
  defaults: null,
},

methods: {
  clickReceived(clickedButtonData) {
    this.$emit('input-received', clickedButtonData.outcome)
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