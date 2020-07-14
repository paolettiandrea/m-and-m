Vue.component('text-displayer-editor', {
    template: `
        <div v-if="contentData">
            <editor-subpanel label="Contenuto">
                <b-form-group>                
                    <b-form-textarea
                        v-model="contentData.text"
                        rows="3"
                        max-rows="6"></b-form-textarea>
                </b-form-group>
            </editor-subpanel>
            
            
            <font-editor :fontData="contentData.fontData"></font-editor>
        </div>
        
    `,

    props: {
        contentData: null
    }
})