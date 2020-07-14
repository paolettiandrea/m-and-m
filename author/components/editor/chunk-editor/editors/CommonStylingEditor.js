Vue.component('common-styling-editor', {
    template: `
        <div>
            <border-editor :borderData="commonData.borderData"></border-editor>
            
            <editor-subpanel label="Spaziatura">
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
        commonData: null
    },

    computed: {
        ...Vuex.mapGetters(['selectedMissionDefaults'])
    }
})