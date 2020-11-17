Vue.component('simple-button-editor', {
    template: `
        <div>
            <button-editor :level="level" :buttonData="inputData.buttonData" :defaults="selectedMissionDefaults.buttonData"></button-editor>
            <editor-subpanel-terminal label="Esito" :level="level">
                <editor-field label="Prossima attività">
                    <activity-picker :targetContainer="inputData.outcome"></activity-picker>
                </editor-field>
            </editor-subpanel-terminal>
        </div>`,

    props: {
        inputData: null,
        level: 0
    },

    computed: {
        ...Vuex.mapGetters(['selectedMissionDefaults'])
    }



})