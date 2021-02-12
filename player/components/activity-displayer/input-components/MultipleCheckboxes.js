Vue.component("multiple-checkboxes", {
    template: `<div style="display: flex; flex-direction: column; align-items:center" :style="{'flex-direction': layoutDirection}">
      <div v-for="optionData in inputData.optionList" style="width: 100%; display: flex; flex-direction: column; align-items:center; padding: 0.25em" >
        <simple-button v-if="optionData.buttonData" :inputData="optionData" :defaults="defaults" @input-received="clickReceived"></simple-button>
        <img-displayer href="#" v-if="inputData.optionContentType==='immagine'" :contentData="optionData.data" :defaults="defaults" @click.native="clickReceived(optionData.outcome)" style="width: 100%"></img-displayer>
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
      },

      layoutDirection() {
        if (this.inputData.layoutDirection) {
          return this.inputData.layoutDirection;
        } else {
          return 'column'
        }
      }
  },
})