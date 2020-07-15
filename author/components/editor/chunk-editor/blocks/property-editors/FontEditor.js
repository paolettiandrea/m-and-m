Vue.component('font-editor', {
    template: `
    <div >
        
        <editor-subpanel-terminal
            label="Font"
            :level="level"
            >
            
            <editor-field label="Famiglia">
                <defaulted-dropdown :style="{fontFamily: fontData.fontFamily}" :options="fontDB.fontOrderArray"
                                    :targetContainer="fontData" targetFieldName="fontFamily" 
                                    :defaultVal="selectedMissionContent.defaults.textFontData.fontFamily">
                    <template v-slot:default="slotProps">
                        <p :style="{fontFamily: slotProps.option}">{{slotProps.option}}</p>
                    </template>
                </defaulted-dropdown>
            </editor-field>
            
            <editor-field label="Dimensione">
                <defaulted-input-form-unit :targetContainer="fontData" targetFieldName="fontSize" 
                    :possibleUnits='["px", "cm", "mm", "Q", "in", "pc", "pt", "em", "ex", "%"]' :defaultVal="selectedMissionContent.defaults.textFontData.fontSize"></defaulted-input-form-unit>
            </editor-field>
            
            <editor-field label="Colore">
                <defaulted-input-form :targetContainer="fontData" targetFieldName="fontColor" inputType="color" :defaultVal="selectedMissionContent.defaults.textFontData.fontColor"></defaulted-input-form>
            </editor-field>

        </editor-subpanel-terminal>
       
    </div>`,

    props: {
        fontData: null,
        level: {
            type: Number,
            default: 0
        }
    },
    

    computed: {
        ... Vuex.mapGetters(['fontDB', 'selectedMissionContent'])
    },

    methods: {
        fontSelected(fontName) {
            Vue.set(this.fontData, 'fontFamily', fontName);

        },

        reset() {
            Vue.delete(this.fontData, 'fontFamily');
        }
    },
})