Vue.component("multiple-checkboxes", {
    template: `<div>
      
      <label>Select your answer:</label>
      <li v-for="item in inputData.buttonList">
        <b-button pill variant="primary" v-bind:style="{ backgroundColor: item.color, borderColor: item.color}"
        v-bind:key="inputData.button" 
        v-bind:text="inputData.button" 
        v-on:click="clickReceived(item)">{{item.button}}</b-button>
      </li>

    </div>`,

props: {
  inputData: null
},

methods: {
  clickReceived(clickedButtonData) {
    this.$emit('input-received', clickedButtonData.outcome)
  }
},

data() {
  return {
  }
}

    
})