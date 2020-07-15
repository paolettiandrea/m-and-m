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
                    <b-button class="editor-button" :pressed.sync="strikethrough" variant="secondary-outline"><b-icon icon="type-strikethrough"></b-icon></b-button>
                </b-button-group>
            </editor-field>
            
            <editor-field label="Allineamento">
                <b-button-group class="full-width" size="sm">
                    <b-button class="editor-button" variant="outline-primary" :pressed.sync="left" @click="alignmentChanged('left')"><b-icon icon="text-left" ></b-icon></b-button>
                    <b-button class="editor-button" variant="outline-primary" :pressed.sync="center" @click="alignmentChanged('center')"><b-icon icon="text-center" ></b-icon></b-button>
                    <b-button class="editor-button" variant="outline-primary" :pressed.sync="right" @click="alignmentChanged('right')"><b-icon icon="text-right" ></b-icon></b-button>
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
            strikethrough: false,

            left: false,
            center: false,
            right: false,
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
        },
        strikethrough: function(newVal, oldVal) {
            if (newVal===true) {
                Vue.set(this.fontData, 'fontDecoration', "line-through");
            } else {
                if (this.fontData.fontDecoration === 'line-through') Vue.delete(this.fontData, 'fontDecoration');
            }
        }
    },

    methods: {
        fontSelected(fontName) {
            Vue.set(this.fontData, 'fontFamily', fontName);

        },

        reset() {
            Vue.delete(this.fontData, 'fontFamily');
        },

        alignmentChanged(alignment) {
            if (alignment!=='left') this.left = false;
            if (alignment!=='right') this.right = false;
            if (alignment!=='center') this.center = false;

            Vue.set(this.fontData, 'fontAlignment', alignment);
        },

        updateControlBools() {
            if (this.fontData.fontWeight!==undefined) { this.bold = true;} else {this.bold = false;}
            if (this.fontData.fontStyle!==undefined) { this.italic = true;} else {this.italic = false;}
            if (this.fontData.fontDecoration==='line-through') { this.strikethrough = true;} else { this.strikethrough = false;}
            if (this.fontData.fontAlignment==='right') { this.right = true;} else {this.right = false;}
            if (this.fontData.fontAlignment=='center') { this.center = true;} else {this.center = false;}
            if (this.fontData.fontAlignment=='left' || this.fontData.fontAlignment===undefined) { this.left = true;} else {this.left = false;}
        }
    },

    mounted() {
        this.updateControlBools();
    },

    updated() {
        this.updateControlBools();

    }
})