Vue.component('multiple-checkboxes-editor', {
    template: `
        <activity-editor-subpanel label="Opzioni" level="0">
<!--                    <activity-editor-subpanel :label="i" :level="1" v-for="(optionData, i) in inputData.optionList">-->
<!--                    </activity-editor-subpanel> -->
                    <editor-subpanel-list :level="1" :list="inputData.optionList">
                        <template v-slot:default="slotProps" >
                            <simple-button-editor :inputData="slotProps.element"></simple-button-editor>
                        </template>
                    </editor-subpanel-list>
                <b-button @click="addOption">+</b-button>
            </div>
        </activity-editor-subpanel>`,

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
