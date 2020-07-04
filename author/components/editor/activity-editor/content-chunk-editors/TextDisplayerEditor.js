export default {
    template: `
        <div v-if="contentChunkData">
            <b-form-checkbox
                v-model="contentChunkData.parseMarkdown"
                name="checkbox-1">
                Markdown
            </b-form-checkbox>
            <b-form-textarea
                  v-model="contentChunkData.text"
                  rows="3"
                  max-rows="6">
            </b-form-textarea>
            <font-editor :fontData="contentChunkData.fontData"></font-editor>
        </div>
        
    `,

    props: {
        contentChunkData: null
    },

    components: {
        'font-editor': () => import('../../common/FontEditor.js')
    }
}