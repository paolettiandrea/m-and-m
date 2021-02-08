Vue.component('multiple-checkboxes-editor', {
    template: `<div>

        <editor-field label="Allineamento">
            <b-form-select v-model="inputData.layoutDirection" :options="directionOptions"></b-form-select>
        </editor-field>
        <activity-editor-subpanel label="Opzioni" level="0">
<!--                    <activity-editor-subpanel :label="i" :level="1" v-for="(optionData, i) in inputData.optionList">-->
<!--                    </activity-editor-subpanel> -->
            <defaulted-dropdown :options="['immagine', 'bottone', 'suono']" :targetContainer="inputData" targetFieldName="optionContentType" defaultVal="bottone">
                <template v-slot:default="slotProps">
                    <p class="editor-text" @click="newType(slotProps.option)">{{slotProps.option}}</p>
                </template>
            </defaulted-dropdown>

            <activity-editor-list :list="inputData.optionList" :labelFunc="labelFunc" :addCallback="addOption">
                <template v-slot:default="slotProps">
                    <div v-if="correspondingContentType==='simple-button'">
                        <simple-button-editor :inputData="slotProps.elem" :defaults="selectedMissionDefaults"></simple-button-editor>
                    </div>
                    <div v-else>
                        <component :is="correspondingContentTypeEditor" :contentData="slotProps.elem.data"></component>
                        <next-activity-outcome-editor :outcomeData="slotProps.elem.outcome"></next-activity-outcome-editor>
                    </div>
                </template>
            </activity-editor-list>
         </activity-editor-subpanel>       
    </div>
        `,

    props: {
        inputData: null
    },

    computed: {
        ...Vuex.mapGetters(['selectedMissionDefaults']),

        directionOptions() {return [
            {
                text: "Verticale",
                value: 'column'
            },
            {
                text: "Orizzontale",
                value: 'initial'
            }
        ]},

        correspondingContentType() {
            switch (this.inputData.optionContentType) {
                case "bottone": { return "simple-button"; break; }
                case "immagine": { return "img-displayer"; break; }
                case "suono": { return "audio-player"; break; }
            }
        },

        correspondingContentTypeEditor() { return this.correspondingContentType + "-editor"; }
    },

    methods: {
        addOption() {
            switch (this.inputData.optionContentType) {
                case "bottone": {
                    this.inputData.optionList.push({"buttonData": {
                   "label": "Bottone",
                   "labelFontData": {},
                   "buttonBorderData": {},
                   "buttonBackgroundData": {}
               },
               "outcome": {
                   "outcomeType": "next",
                   "nextActivityId": ""
               }})
               break;
                 }
                
                case "immagine": {
                    this.inputData.optionList.push({
                        "data": {
                            "imgResData": {
                                "url": "https://www.riccardogeraci.it/wp-content/uploads/2019/10/placeholder-1024x683.png"
                            }
                        },
                        "outcome": {
                            "outcomeType": "next",
                            "nextActivityId": ""
                        }
                    })
                    break;
                }
                case "suono": {
                    this.inputData.optionList.push({
                        "data": {
                            "audioResourceData": {
                            "url": "http://soundbible.com/grab.php?id=1815&type=mp3"
                            },
                            "buttonData": {
                            "labelFontData": {},
                            "buttonBorderData": {},
                            "buttonBackgroundData": {}
                            }
                        },
                        "outcome": {
                            "outcomeType": "next",
                            "nextActivityId": ""
                        }
                    })
                    break;
                }
            }
          
        },
        labelFunc(elem, i) {
            return "Button " + i;
        },
        newType(type) {
            console.log("New type ", type);
            let corr_type = "";
            

            this.inputData.optionList.splice(0, this.inputData.optionList.length)
            
        }
    }
})
