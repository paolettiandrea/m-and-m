Vue.component('multiple-checkboxes-editor', {
    template: `
        <activity-editor-subpanel label="Opzioni" level="0">
<!--                    <activity-editor-subpanel :label="i" :level="1" v-for="(optionData, i) in inputData.optionList">-->
<!--                    </activity-editor-subpanel> -->
            <b-tabs vertical pills>
                <b-tab>
                
                    <template #title>
                        <b-icon icon="grid"></b-icon>
                    </template>
                
                    <activity-editor-list :list="inputData.optionList" :labelFunction="labelFunc" :addCallback="addOption">
                        <template v-slot:default="slotProps">
                            <simple-button-editor :inputData="slotProps.elem"></simple-button-editor>
                        </template>
                    </activity-editor-list>
                </b-tab>
                <b-tab>
                    <template #title>
                        <b-icon icon="image"></b-icon>
                        
                    </template>
                        <p> Ancora da implementare </p>
</b-tab>
            </b-tabs>
<!--                    <editor-subpanel-list :level="1" :list="inputData.optionList">-->
<!--                        <template v-slot:default="slotProps" >-->
<!--                        </template>-->
<!--                    </editor-subpanel-list>-->
<!--                <b-button @click="addOption">+</b-button>-->
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
        },
        labelFunc(elem, i) {
            return "Button " + i;
        }
    }
})
