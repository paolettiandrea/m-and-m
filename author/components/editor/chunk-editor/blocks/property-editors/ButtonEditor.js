
Vue.component('button-editor', {
    template: `
    <div >
        <editor-subpanel
            label="Bottone"
            :level="level"
            >
            
            <editor-field label="Testo" v-if="!iconLabel">
                <b-form-input v-model="buttonData.label"></b-form-input>
            </editor-field>
            
            <font-editor :level="level+1" :fontData="buttonData.labelFontData" :defaults="defaults.labelFontData" :iconLabel="iconLabel"></font-editor>
            <border-editor :level="level+1" :borderData="buttonData.buttonBorderData" :defaults="defaults.buttonBorderData"></border-editor>
            <background-editor :level="level+1" :backgroundData="buttonData.buttonBackgroundData" :defaults="defaults.buttonBackgroundData"></background-editor>
            
        </editor-subpanel>
    </div>`,

    props: {
        buttonData: null,
        level: {
            type: Number,
            default: 0
        },
        defaults: null,

        iconLabel: { default: false }
    },

    computed: {
        ... Vuex.mapGetters(['fontDB', 'selectedMissionContent'])
    }
})