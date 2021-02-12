Vue.component('next-activity-outcome-editor', {
    template: `
    <div>
                <editor-field label="Prossima attività">
                    <activity-picker :targetContainer="outcomeData"></activity-picker>
                </editor-field>
                <editor-field  v-if="!noScore" label="Punteggio">
                    <defaulted-input-form inputType="number" :targetContainer="outcomeData" targetFieldName="points" defaultVal="0"></defaulted-input-form>
                </editor-field>
    </div>`,

    props: {
        outcomeData: null,
        noScore: { default: false }
    }

})

// Vue.component('next-activity-outcome-editor-supervisor-scoring', {
//     template: `<div>
//                 <editor-field label="Prossima attività">
//                     <activity-picker :targetContainer="outcomeData"></activity-picker>
//                 </editor-field>
//                 <editor-field label="Punteggio">
//                     <b-input-group>
//                         <b-input-form></b-input-form>
//                     </b-input-group>
//                     <defaulted-input-form inputType="number" :targetContainer="outcomeData" targetFieldName="points" defaultVal="0"></defaulted-input-form>
//                 </editor-field>
//     </div>`,

//     props: {
//         outcomeScoringData
//     }
// })

Vue.component('score-range-editor', {
    template: `
        <editor-field label="Range">
            <b-input-group>
                <b-form-input v-model="scoreRange.min" prepend="Min"></b-form-input>
                <b-form-input v-model="scoreRange.max"></b-form-input>
            </b-input-group> 
        </editor-field>
    `,

    props: {
        scoreRange: null
    }
})


Vue.component('simple-button-editor', {
    template: `
        <div>
            <button-editor :level="level" :buttonData="inputData.buttonData" :defaults="selectedMissionDefaults.buttonData"></button-editor>
            <activity-editor-subpanel v-if="!noOutcome" label="Esito" :level="level">
                <next-activity-outcome-editor :noScore="noScore" :outcomeData="inputData.outcome"></next-activity-outcome-editor>
            </activity-editor-subpanel>
        </div>`,

    props: {
        inputData: null,
        level: 0,
        noOutcome: false,
        noScore: { default: false }
    },

    computed: {
        ...Vuex.mapGetters(['selectedMissionDefaults'])
    }
})


Vue.component('canvas-draw-editor', {
    template: `<div>
        <activity-editor-subpanel label="Stile canvas">
            <background-editor :backgroundData="inputData.canvasBackgroundData" :defaults="selectedMissionDefaults.buttonData.buttonBackgroundData"></background-editor>
            <activity-editor-subpanel label="Tratto">
                <defaulted-input-form :targetContainer="inputData" targetFieldName="canvasLineColor" 
                                        defaultVal="" inputType="color" label="Opacita'"></defaulted-input-form>
            </activity-editor-subpanel>
        </activity-editor-subpanel>
        <simple-button-editor :noScore="true" :inputData="inputData.sendButtonData"></simple-button-editor>
        <activity-editor-subpanel label="Valutazione punteggio">
            <score-range-editor :scoreRange="inputData.scoreRange"></score-range-editor>
            <editor-field label="Contesto">
                <b-form-input v-model="inputData.scoringContext"></b-form-input>
            </editor-field>
        </activity-editor-subpanel>
    </div>`,

    props: {
        inputData: null
    },

    computed: {
        ...Vuex.mapGetters(['selectedMissionDefaults']),

    }
})

Vue.component('click-img-editor', {
    template: `<div>
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