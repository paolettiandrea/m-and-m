Vue.component('common-styling-editor', {
    template: `
        <div>
            <border-editor :borderData="commonData.borderData" :level="level+1"></border-editor>
            
            <background-editor :backgroundData="commonData.backgroundData" :level="level+1"></background-editor>
            
            <editor-subpanel label="Spaziatura" :level="level+1">
                <editor-field  label="Padding">
                    <defaulted-quad-input-form-unit :target="commonData.spacingData.padding" :defaults="selectedMissionDefaults.commonData.spacingData.padding"></defaulted-quad-input-form-unit>
                </editor-field>
                
                <editor-field  label="Margine">
                    <defaulted-quad-input-form-unit :target="commonData.spacingData.margin" :defaults="selectedMissionDefaults.commonData.spacingData.margin"></defaulted-quad-input-form-unit>
                </editor-field>
            </editor-subpanel>
            
        </div>
    `,

    props: {
        commonData: null,
        level: {
            type: Number,
            default: 0
        }
    },

    computed: {
        ...Vuex.mapGetters(['selectedMissionDefaults'])
    }
})