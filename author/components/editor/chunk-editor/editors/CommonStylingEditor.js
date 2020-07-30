Vue.component('common-styling-editor', {
    template: `
        <div>
            <border-editor :borderData="commonData.borderData" :defaults="defaults.borderData" :level="level+1"></border-editor>
            
            <background-editor :backgroundData="commonData.backgroundData" :level="level+1" :defaults="defaults.backgroundData"></background-editor>
            
            <editor-subpanel label="Spaziatura" :level="level+1">
                <editor-field  label="Padding">
                    <defaulted-quad-input-form-unit :target="commonData.spacingData.padding" :defaults="defaults.spacingData.padding"></defaulted-quad-input-form-unit>
                </editor-field>
                
                <editor-field  label="Margine">
                    <defaulted-quad-input-form-unit :target="commonData.spacingData.margin" :defaults="defaults.spacingData.margin"></defaulted-quad-input-form-unit>
                </editor-field>
            </editor-subpanel>
            
        </div>
    `,

    props: {
        commonData: null,
        level: {
            type: Number,
            default: 0
        },
        defaults: null
    },

    computed: {
        ...Vuex.mapGetters(['selectedMissionDefaults']),
    }
})