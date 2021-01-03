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
            <activity-editor-subpanel label="Esito" :level="level">
                <next-activity-outcome-editor :outcomeData="inputData.outcome"></next-activity-outcome-editor>
            </activity-editor-subpanel>
        </div>`,

    props: {
        inputData: null,
        level: 0
    },

    computed: {
        ...Vuex.mapGetters(['selectedMissionDefaults'])
    }



})