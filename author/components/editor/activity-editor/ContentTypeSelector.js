export default {
    template: `
        <div  v-if="contentChunkTypes">
            
            <b-button-group style="width: 100%">
                    <b-button 
                        variant="outline-primary" 
                        size="sm" 
                        v-for="contentType in contentChunkTypes" 
                        :key="contentType.type" 
                        v-on:click="emitNewContentEvent(contentType)"
                        v-b-tooltip.hover :title="contentType.title">
                        <b-icon :icon="contentType.icon"></b-icon>
                    </b-button>
            </b-button-group>
        </div>
    `,

    data() {
        return {

        }
    },

    props: {
        chunkIndex: NaN,
        showPop: false,
        contentChunkTypes: null
    },

    methods: {
        emitNewContentEvent(contentType) {
            this.$emit("new:content", {
                contentChunk: {
                    type: contentType.type,
                    data: JSON.parse(JSON.stringify(contentType.data)),
                },
                index: this.chunkIndex
            })
        }
    }
}