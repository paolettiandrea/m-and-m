export default {
    template: `
    <div >
        
        <b-form-group 
            label="Font"
            label-cols-lg="4"
            >
            
            <editor-field label="Dimensione">
                <defaulted-input-form-unit :targetContainer="fontData" targetFieldName="fontSize" :defaultVal="selectedMissionContent.defaults.textFontData.fontSize"></defaulted-input-form-unit>
            </editor-field>
            
            <editor-field label="Colore">
                <defaulted-input-form :targetContainer="fontData" targetFieldName="fontColor" inputType="color" :defaultVal="selectedMissionContent.defaults.textFontData.fontColor"></defaulted-input-form>
            </editor-field>
 
            
<!--            <b-form-group label="Colore" label-cols-sm="6" label-align-sm="right" >-->
<!--                <b-form-input type="color" size="sm"></b-form-input>-->
<!--            </b-form-group>-->
            
            <b-form-group label="Font Family" label-cols-sm="6" label-align-sm="right">
                <b-dropdown :style="{ fontFamily: fontData.fontFamily, width: '100%' }" :text="fontData.fontFamily || selectedMissionContent.defaults.textFontData.fontFamily" variant="outline-secondary">
                    <div :style="{ maxHeight: 400 + 'px', overflowY: 'scroll' }">
                        <b-dropdown-item button href="#" @click="fontSelected(font)" v-for="font in fontDB.fontOrderArray" :key="font" > 
                            <span :style="{ fontFamily: font }">{{font}}</span>
                        </b-dropdown-item>
                    </div>
                </b-dropdown>
            </b-form-group>
            
        </b-form-group>
        
<!--        <div style="display: flex; flex-flow: row">-->
<!--            <b-input-group style="flex: 1 1 auto" append="px">-->
<!--                 <template v-slot:prepend>-->
<!--                    -->
<!--                    -->
<!--                    -->
<!--                    <b-dropdown :style="{ fontFamily: fontData.fontFamily }" :text="fontData.fontFamily || selectedMissionContent.defaults.textFontData.fontFamily" variant="outline-secondary">-->
<!--                        <div :style="{ maxHeight: 400 + 'px', overflowY: 'scroll' }">-->
<!--                            <b-dropdown-item button href="#" @click="fontSelected(font)" v-for="font in fontDB.fontOrderArray" :key="font" > -->
<!--                                <span :style="{ fontFamily: font }">{{font}}</span>-->
<!--                            </b-dropdown-item>-->
<!--                        </div>-->
<!--                    </b-dropdown>-->
<!--                    -->
<!--                          -->
<!--                </template>-->
<!--            -->
<!--            -->
<!--                    <defaulted-input-form :targetContainer="fontData" targetFieldName="fontSize" :defaultVal="selectedMissionContent.defaults.textFontData.fontSize"></defaulted-input-form>-->
<!--    -->
<!--                    <b-form-input type="color"></b-form-input>-->
<!--                    -->
<!--                -->
<!--            -->
<!--            </b-input-group>-->
<!--        <b-button variant="outline-secondary" @click="reset">Reset</b-button>  -->
<!--        </div>-->
        
        
    </div>`,

    props: {
        fontData: null
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


    components: {
        'editor-field': () => import('../activity-editor/EditorField.js'),
    }



}