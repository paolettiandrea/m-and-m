Vue.component('next-activity-outcome-editor', {
    template: `
    <div>
                <editor-field label="Prossima attività">
                    <activity-picker :targetContainer="outcomeData"></activity-picker>
                </editor-field>
                <editor-field label="Punteggio">
                    <defaulted-input-form inputType="number" :targetContainer="outcomeData" targetFieldName="points" defaultVal="0"></defaulted-input-form>
                </editor-field>
    </div>`,

    props: {
        outcomeData: null
    }

})


Vue.component('simple-button-editor', {
    template: `
        <div>
            <button-editor :level="level" :buttonData="inputData.buttonData" :defaults="selectedMissionDefaults.buttonData"></button-editor>
            <activity-editor-subpanel v-if="!noOutcome" label="Esito" :level="level">
                <next-activity-outcome-editor :outcomeData="inputData.outcome"></next-activity-outcome-editor>
            </activity-editor-subpanel>
        </div>`,

    props: {
        inputData: null,
        level: 0,
        noOutcome: false,
    },

    computed: {
        ...Vuex.mapGetters(['selectedMissionDefaults'])
    }



})


Vue.component('canvas-draw-editor', {
    template: `<div>
        <simple-button-editor :inputData="inputData.sendButtonData" :noOutcome="true"></simple-button-editor>
    </div>`,

    props: {
        inputData: null
    }
})

Vue.component('click-img-editor', {
    template: `<div>
        <p>hgdhdj</p>
        <url-input :target="inputData" fieldName="url"></url-input>
        <activity-editor-list :list="inputData.areas" :labelFunction="labelFunc" :addCallback="addArea">
            <template v-slot:default="slotProps">
                <activity-editor-subpanel label="Area">
                    <editor-field label="Coordinate">
                        <defaulted-input-form :targetContainer="slotProps.elem" targetFieldName="coords" inputType="text" :defaultVal="'0,0,10,10'"></defaulted-input-form>
                    </editor-field>
                    <editor-field label="Descrizione">
                        <defaulted-input-form :targetContainer="slotProps.elem" targetFieldName="alt" inputType="text" :defaultVal="'click area'"></defaulted-input-form>
                    </editor-field>
                </activity-editor-subpanel>
                <activity-editor-subpanel label="Esito">
                    <next-activity-outcome-editor :outcomeData="slotProps.elem.outcome"></next-activity-outcome-editor>
                </activity-editor-subpanel>
            </template>
        </activity-editor-list>
    </div>`,

    props: {
    inputData: null
    },

    methods: {
        labelFunc(elem, i) {
           return elem.alt;
        },
        // TODO chiarire se le coordinate funzionano
 addArea() {
       this.inputData.areas.push({
           coords: "",
           alt: "area " + this.inputData.areas.length,
           outcome: {
               outcomeType: 'next',
               nextActivityId: ""
           }
       })
    }
    },

   

})