Vue.component('player-main', {
    template: `
        <div>
        <knob v-model="newValue">
          </knob>
      <!--
        <lastScreen-groups></lastScreen-groups>
        </div>
          -->`,
//per knob
data() {
  return {
    newValue: null
  }
},

    components: {
    }
})
