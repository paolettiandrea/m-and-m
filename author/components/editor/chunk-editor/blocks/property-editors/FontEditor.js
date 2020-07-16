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
                                    :defaultVal="defaults.fontFamily">
                    <template v-slot:default="slotProps">
                        <p :style="{fontFamily: slotProps.option}">{{slotProps.option}}</p>
                    </template>
                </defaulted-dropdown>
            </editor-field>
            
            <editor-field label="Dimensione">
                <defaulted-input-form-unit :targetContainer="fontData" targetFieldName="fontSize" 
                    :possibleUnits='["px", "cm", "mm", "Q", "in", "pc", "pt", "em", "ex", "%"]' :defaultVal="defaults.fontSize"></defaulted-input-form-unit>
            </editor-field>
            
            <editor-field label="Stile">
                <b-button-group class="full-width" size="sm">
                    <defaulted-input-toggle-button icon="type-bold" :targetContainer="fontData" targetFieldName="fontWeight" :defaultVal="defaults.fontWeight" 
                                :options="{true: 'bold', false: 'normal'}"></defaulted-input-toggle-button>
                    <defaulted-input-toggle-button icon="type-italic" :targetContainer="fontData" targetFieldName="fontStyle" :defaultVal="defaults.fontStyle" 
                                :options="{true: 'italic', false: 'normal'}"></defaulted-input-toggle-button>
                    <defaulted-input-toggle-button icon="type-strikethrough" :targetContainer="fontData" targetFieldName="fontDecoration" :defaultVal="defaults.textDecoration" 
                                :options="{true: 'line-through', false: 'none'}"></defaulted-input-toggle-button>
                </b-button-group>
            </editor-field>
            
            <editor-field label="Allineamento">
                <defaulted-input-option-form class="full-width" :targetContainer="fontData" targetFieldName="fontAlignment" :defaultVal="defaults.fontAlignment" 
                                                :options="[ { icon: 'text-left',    val: 'left'     },
                                                            { icon: 'text-center',  val: 'center'   },
                                                            { icon: 'text-right',   val: 'right'    }]"></defaulted-input-option-form>
            </editor-field>
            
            <editor-field label="Colore">
                <defaulted-input-form :targetContainer="fontData" targetFieldName="fontColor" inputType="color" :defaultVal="defaults.fontColor"></defaulted-input-form>
            </editor-field>
        </editor-subpanel-terminal>
    </div>`,

    props: {
        fontData: null,
        level: {
            type: Number,
            default: 0
        },
        defaults: null
    },

    computed: {
        ... Vuex.mapGetters(['fontDB', 'selectedMissionContent'])
    }
})