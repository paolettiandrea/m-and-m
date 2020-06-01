export default {
    template: `
        <div  v-if="contentChunkTypes">
            
                <div :id="'content-selector-'+chunkIndex">
                <p>+</p>
                </div>

 
            
            <b-popover :target="'content-selector-'+chunkIndex" triggers="click blur" placement="left">
                <div v-for="contentType in contentChunkTypes" :key="contentType.type">
                    <b-button v-on:click="emitNewContentEvent(contentType)">{{contentType.type}}</b-button>
                </div>
            </b-popover>
        </div>
    `,

    data() {
        return {
            contentChunkTypes: null
        }
    },

    props: {
        chunkIndex: NaN,
        showPop: false
    },

    methods: {
        emitNewContentEvent(contentType) {
            this.$emit("new:content", {
                type: contentType.type,
                data: contentType.data,
                index: this.chunkIndex
            })
        }
    },

    mounted() {
        axios.get("./components/editor/activity-editor/content-chunk-editors/contentChunkTypes.json").then( res => {
            this.contentChunkTypes = res.data.contentChunkTypes;
        })
    }
}