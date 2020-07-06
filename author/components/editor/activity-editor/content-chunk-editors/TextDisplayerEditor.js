export default {
    template: `
        <div v-if="contentData">
            <editor-subpanel title="Contenuto">
                <b-form-group>                
                    <b-form-textarea
                        v-model="contentData.text"
                        rows="3"
                        max-rows="6"></b-form-textarea>
                    <b-form-checkbox
                        v-model="contentData.parseMarkdown"
                        name="checkbox-1">
                    Markdown </b-form-checkbox>
                </b-form-group>
            </editor-subpanel>
            
            
            <font-editor :fontData="contentData.fontData"></font-editor>
        </div>
        
    `,

    props: {
        contentData: null
    },

    components: {
        'font-editor': () => import('../../common/FontEditor.js'),
        'editor-subpanel': () => import('../EditorSubPanel.js')
    }
}