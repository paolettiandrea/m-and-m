Vue.component('common-styling-editor', {
    template: `
        <div>
            <activity-editor-subpanel label="Generali"> 
            
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
            default: 0
        },
    },

    computed: {
        ...Vuex.mapGetters(['selectedMissionDefaults']),
    }
})