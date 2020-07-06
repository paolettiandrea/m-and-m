export default {
    template: `
    <div >
 
        
        <b-input-group>
             <template v-slot:prepend>
                
                
                <b-dropdown :style="{ fontFamily: fontData.fontFamily }" :text="fontData.fontFamily || selectedMissionContent.defaults.textFontData.fontFamily" variant="outline-secondary">
                    <div :style="{ maxHeight: 400 + 'px', overflowY: 'scroll' }">
                        <b-dropdown-item button href="#" @click="fontSelected(font)" v-for="font in fontDB.fontOrderArray" :key="font" > 
                            <span :style="{ fontFamily: font }">{{font}}</span>
                        </b-dropdown-item>
                    </div>
                </b-dropdown>
                
                      <b-button variant="outline-secondary">b</b-button>
                      <b-button variant="outline-secondary">i</b-button>
                      
            </template>
        
        
                <b-form-input  type="number" v-model="fontData.fontSize" :placeholder="selectedMissionContent.defaults.textFontData.fontSize"></b-form-input>
                <b-form-input type="color"></b-form-input>
                
            <template v-slot:append>
                <b-button variant="outline-secondary" @click="reset">Reset</b-button>    
            </template>
        
        </b-input-group>
        
        <defaulted-input-form :targetContainer="fontData" targetFieldName="fontSize" :defaultVal="selectedMissionContent.defaults.textFontData.fontSize"></defaulted-input-form>
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
    }



}