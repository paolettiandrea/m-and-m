Vue.component('player-main', {
    template: `
        <div>
          <knob v-model="newValue">
          </knob>

        </div>`,

data() {
  return {
    newValue: null
  }
},
    components: {
    }
})
