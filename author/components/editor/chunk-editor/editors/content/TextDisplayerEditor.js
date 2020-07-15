Vue.component('text-displayer-editor', {
    template: `
        <div v-if="contentData">
            <b-form-group>                
                    <b-form-textarea
                        v-model="contentData.text"
                        rows="3"></b-form-textarea>
                </b-form-group>
            <editor-subpanel label="Testo" :level="0">
                <font-editor :fontData="contentData.fontData" :level="1"></font-editor>
            </editor-subpanel>
            
            
            
        </div>
        
    `,

    props: {
        contentData: null
    }
})