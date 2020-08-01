Vue.component('simple-button-editor', {
    template: `
        <div>
            <button-editor :buttonData="inputData.buttonData" :defaults="selectedMissionDefaults.buttonData"></button-editor>
            <editor-subpanel-terminal label="Esito">
                <editor-field label="Prossima attività">
                    <activity-picker :targetContainer="inputData.outcome"></activity-picker>
                </editor-field>
            </editor-subpanel-terminal>
        </div>`,

    props: {
        inputData: null
    },

    computed: {
        ...Vuex.mapGetters(['selectedMissionDefaults'])
    }



})