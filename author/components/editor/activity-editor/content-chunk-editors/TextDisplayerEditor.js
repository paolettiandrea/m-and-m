export default {
    template: `
        <div v-if="contentChunkData">
            <b-form-checkbox
      v-model="contentChunkData.parseMarkdown"
      name="checkbox-1"
    >
      Markdown
    </b-form-checkbox>
            <b-form-textarea
                  v-model="contentChunkData.text"
                  rows="3"
                  max-rows="6"
            ></b-form-textarea>
        </div>
        
    `,

    props: {
        contentChunkData: null
    }
}