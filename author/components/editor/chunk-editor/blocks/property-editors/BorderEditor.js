Vue.component('border-editor', {
    template: `
        <div>
            <editor-subpanel-terminal label="Bordo" :level="level"
            >
            
            <editor-field label="Stile">
                <defaulted-dropdown class="editor-text" :options="['dashed', 'dotted', 'double', 'groove', 'hidden', 'initial', 'inset', 'none', 'outset', 'revert', 'ridge', 'solid']"
                                    :targetContainer="borderData" targetFieldName="borderStyle" 
                                    :defaultVal="selectedMissionDefaults.commonData.borderData.borderStyle">
                    <template v-slot:default="slotProps">
                        <p class="editor-text">{{slotProps.option}}</p>
                    </template>
                </defaulted-dropdown>
            </editor-field>
            
            <editor-field label="Spessore">
                <defaulted-input-form-unit :targetContainer="borderData" targetFieldName="borderWidth" :defaultVal="selectedMissionDefaults.commonData.borderData.borderWidth"></defaulted-input-form-unit>
            </editor-field>
            
            <editor-field label="Raggio">
                <defaulted-input-form-unit :targetContainer="borderData" targetFieldName="borderRadius" :defaultVal="selectedMissionDefaults.commonData.borderData.borderRadius"></defaulted-input-form-unit>
            </editor-field>
            
            <editor-field label="Colore">
                <defaulted-input-form inputType="color" :targetContainer="borderData" targetFieldName="borderColor" :defaultVal="selectedMissionDefaults.commonData.borderData.borderColor"></defaulted-input-form>
            </editor-field>

        </editor-subpanel-terminal>
        </div>
    `,

    props: {
        borderData: null,
        level: 0,
    },

    computed: {
        ... Vuex.mapGetters(['selectedMissionDefaults'])
    }
})