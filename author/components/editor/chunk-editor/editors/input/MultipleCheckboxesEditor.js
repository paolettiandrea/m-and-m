Vue.component('multiple-checkboxes-editor', {
    template: `
        <div>
        <editor-subpanel-terminal label="Options">
            <div>
                <simple-button-editor v-for="optionData in inputData.optionList" :inputData="optionData"></simple-button-editor>
                <b-button @click="addOption">+</b-button>
            </div>
        </editor-subpanel-terminal>
        </div>`,

    props: {
        inputData: null
    },

    computed: {
        ...Vuex.mapGetters(['selectedMissionDefaults'])
    },

    methods: {
        addOption() {
           this.inputData.optionList.push({"buttonData": {
                   "label": "Bottone",
                   "labelFontData": {},
                   "buttonBorderData": {},
                   "buttonBackgroundData": {}
               },
               "outcome": {
                   "outcomeType": "next",
                   "nextActivityId": ""
               }})
        }
    }
})
