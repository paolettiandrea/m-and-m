Vue.component("multiple-checkboxes", {
    template: `<div>
      
      <label>Select your answer:</label>
      <li v-for="item in inputData">
      <b-button pill variant="primary" 
      v-bind:key="inputData.button" 
      v-bind:text="inputData.button" 
      v-on:click="checkAnswer(item.button)">{{item.button}}</b-button>
      </li>

    </div>`,

props: {
  inputData: null
},

methods: {
  checkAnswer(x) {
    window.alert(x);

  }
},

data() {
  return {
  }
}

    
})