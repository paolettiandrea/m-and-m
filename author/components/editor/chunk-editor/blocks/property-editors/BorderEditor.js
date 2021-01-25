Vue.component('border-editor', {
    template: `
        <div>
            <activity-editor-subpanel label="Bordo" :level="level"
            >
            
            <editor-field label="Stile">
                <defaulted-dropdown class="editor-text" :options="['dashed', 'dotted', 'double', 'groove', 'hidden', 'initial', 'inset', 'none', 'outset', 'revert', 'ridge', 'solid']"
                                    :targetContainer="borderData" targetFieldName="borderStyle" 
                                    :defaultVal="usedDefaults.borderStyle">
                    <template v-slot:default="slotProps">
                        <p class="editor-text">{{slotProps.option}}</p>
                    </template>
                </defaulted-dropdown>
            </editor-field>
            
            <editor-field label="Spessore">
                <defaulted-input-form-unit :targetContainer="borderData" targetFieldName="borderWidth" :defaultVal="usedDefaults.borderWidth" :possibleUnits="commonUnits"></defaulted-input-form-unit>
            </editor-field>
            <editor-field label="Raggio">
                <defaulted-input-form-unit :targetContainer="borderData" targetFieldName="borderRadius" :defaultVal="usedDefaults.borderRadius" :possibleUnits="commonUnits"></defaulted-input-form-unit>
            </editor-field>
            
            <editor-field label="Colore">
                <defaulted-input-form inputType="color" :targetContainer="borderData" targetFieldName="borderColor" :defaultVal="usedDefaults.borderColor"></defaulted-input-form>
            </editor-field>

        </activity-editor-subpanel>
        </div>
    `,

    props: {
        borderData: null,
        level: 0,
        defaults: null,
    },

    computed: {
        ... Vuex.mapGetters(['selectedMissionDefaults', 'commonUnits']),

        usedDefaults() {
            if (this.defaults) {return this.defaults;}
            else { return this.selectedMissionDefaults.commonData.borderData}
        }
    }
})