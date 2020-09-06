Vue.component('background-editor', {
    template: `
        <div>
            <editor-subpanel-terminal label="Sfondo" :level="level">
                <editor-field label="Colore">
                    <defaulted-input-form :targetContainer="backgroundData" targetFieldName="backgroundColor" 
                                            :defaultVal="defaults.backgroundColor" inputType="color" label="Colore"></defaulted-input-form>
                </editor-field>
        </editor-subpanel-terminal>
        </div>
    `,

    props: {
        backgroundData: null,
        defaults: null,
        level: 0,

    },

    computed: {
        ... Vuex.mapGetters(['selectedMissionDefaults'])
    }
})