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
            
            <editor-field label="Stile">
                <b-button-group class="full-width" size="sm">
                    <b-button class="editor-button" :pressed.sync="bold" variant="secondary-outline"><b-icon icon="type-bold"></b-icon></b-button>
                    <b-button class="editor-button" :pressed.sync="italic" variant="secondary-outline"><b-icon icon="type-italic"></b-icon></b-button>
                </b-button-group>
         
            </editor-field>
            
            <editor-field label="Colore">
                <defaulted-input-form :targetContainer="fontData" targetFieldName="fontColor" inputType="color" :defaultVal="selectedMissionContent.defaults.textFontData.fontColor"></defaulted-input-form>
            </editor-field>

        </editor-subpanel-terminal>
       
    </div>`,

    data() {
        return {
            bold: false,
            italic:false,
        }
    },

    watch: {
        bold: function(newVal, oldVal) {
            if (newVal===true) {
                Vue.set(this.fontData, 'fontWeight', "bold");
            } else {
                Vue.delete(this.fontData, 'fontWeight');
            }
        },
        italic: function(newVal, oldVal) {
            if (newVal===true) {
                Vue.set(this.fontData, 'fontStyle', "italic");
            } else {
                Vue.delete(this.fontData, 'fontStyle');
            }
        }
    },

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