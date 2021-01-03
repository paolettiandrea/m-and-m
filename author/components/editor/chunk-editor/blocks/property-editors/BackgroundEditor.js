Vue.component('background-editor', {
    template: `
        <div>
            <activity-editor-subpanel label="Sfondo" :level="level">
                <editor-field label="Colore">
                    <defaulted-input-form :targetContainer="backgroundData" targetFieldName="backgroundColor" 
                                            :defaultVal="defaults.backgroundColor" inputType="color" label="Colore"></defaulted-input-form>
                    <defaulted-input-form :targetContainer="backgroundData" targetFieldName="opacity" 
                                            :defaultVal="defaults.backgroundColor" inputType="number" label="Opacita'"></defaulted-input-form>
                    <url-input :target="backgroundData" fieldName="backgroundImage"></url-input>
                </editor-field>
        </activity-editor-subpanel>
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