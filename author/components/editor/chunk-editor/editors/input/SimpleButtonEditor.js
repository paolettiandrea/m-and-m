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