Vue.component("common-styling-editor", {
  template: `
        <div>
            <activity-editor-subpanel label="Contenitore"> 
            
                <border-editor :borderData="commonData.borderData" :defaults="selectedMissionDefaults.borderData" :level="level+1"></border-editor>
                
                <background-editor :backgroundData="commonData.backgroundData" :level="level+1" :defaults="selectedMissionDefaults.commonData.backgroundData"></background-editor>
                
                <activity-editor-subpanel label="Spaziatura" :level="level+1">
                    <editor-field  label="Padding">
                        <defaulted-quad-input-form-unit :target="commonData.spacingData.padding" :defaults="selectedMissionDefaults.commonData.spacingData.padding"></defaulted-quad-input-form-unit>
                    </editor-field>
                    
                    <editor-field  label="Margine">
                        <defaulted-quad-input-form-unit :target="commonData.spacingData.margin" :defaults="selectedMissionDefaults.commonData.spacingData.margin"></defaulted-quad-input-form-unit>
                    </editor-field>
                </activity-editor-subpanel>
            </activity-editor-subpanel>
            
        </div>
    `,

  props: {
    commonData: null,
    level: {
      type: Number,
      default: 0,
    },
  },

  computed: {
    ...Vuex.mapGetters(["selectedMissionDefaults"]),
  },
});

Vue.component("screen-style-editor", {
  template: `<div>
        <activity-editor-subpanel label="Stile schermata">
            <activity-editor-subpanel label="Esterno">
                <background-editor :backgroundData="screenStyleData.outer.backgroundData" :defaults="selectedMissionDefaults.screenStyleData.outer.backgroundData"></background-editor>
</activity-editor-subpanel>
            <activity-editor-subpanel label="Interno">
                <background-editor :backgroundData="screenStyleData.inner.backgroundData" :defaults="selectedMissionDefaults.screenStyleData.inner.backgroundData"></background-editor>
                
                <border-editor :borderData="screenStyleData.inner.borderData" :defaults="selectedMissionDefaults.screenStyleData.inner.borderData"></border-editor>
                <activity-editor-subpanel label="Spaziatura">
                    <editor-field  label="Padding">
                        <defaulted-quad-input-form-unit :target="screenStyleData.inner.spacingData.padding" :defaults="selectedMissionDefaults.screenStyleData.inner.spacingData.padding"></defaulted-quad-input-form-unit>
                    </editor-field>
                    
                    <editor-field  label="Margine">
                        <defaulted-quad-input-form-unit :target="screenStyleData.inner.spacingData.margin" :defaults="selectedMissionDefaults.screenStyleData.inner.spacingData.margin"></defaulted-quad-input-form-unit>
                    </editor-field>
                </activity-editor-subpanel>
                
            </activity-editor-subpanel>
                <activity-editor-subpanel label="Allineamento">
                    <editor-field label="Verticale">
                        <defaulted-dropdown class="editor-text" :options="['top', 'center']" :targetContainer="screenStyleData.alignment" targetFieldName="vertical" :defaultVal="selectedMissionDefaults.screenStyleData.alignment.vertical">
                        <template v-slot:default="slotProps">
                        <p class="editor-text">{{slotProps.option}}</p>
                    </template>
                        </defaulted-dropdown>
                    </editor-field>
                </activity-editor-subpanel>
</activity-editor-subpanel>   

</activity-editor-subpanel>
 
    </div>`,

  props: {
    screenStyleData: null,
  },

  computed: {
    ...Vuex.mapGetters(["selectedMissionDefaults"]),
  },
});
