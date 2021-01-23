Vue.component("multiple-checkboxes", {
    template: `<div>
      <div v-if="!inputData.multiple" v-for="optionData in inputData.optionList">
        <simple-button v-if="optionData.buttonData" :inputData="optionData" :defaults="defaults" @input-received="clickReceived"></simple-button>
        <img-displayer href="#" v-if="inputData.optionContentType==='immagine'" :contentData="optionData.data" :defaults="defaults" @click.native="clickReceived"></img-displayer>
        <!-- TODO how to play audio without choosing the option? On hover? -->
        <audio-player v-if="inputData.optionContentType==='suono'" :contentData="optionData.data" :defaults="defaults" @click.native="clickReceived"></audio-player>
      </div>
    </div>`,

props: {
  inputData: null,
  defaults: null,
},

methods: {
  clickReceived(clickedButtonData) {
    console.log("Option click received")
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