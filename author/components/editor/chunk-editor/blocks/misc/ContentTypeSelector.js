
Vue.component('content-type-selector', {
    template: `
        <div  v-if="contentChunkTypes" class="type-selector">
            <p class="editor-text editor-light-text type-selector-text">Aggiungi un contenuto</p>
            <b-button-group style="width: 100%" size="sm">
                    <slot name="button-prepend"></slot>
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

    computed: Vuex.mapState({
        ... Vuex.mapGetters(['chunkCommonDataAtCreation']),
        contentChunkTypes: state => state.contentTypes
    }),

    methods: {
        emitNewContentEvent(contentType) {
            this.$emit("content:type:selected", {
                contentType: contentType.type,
                contentData: JSON.parse(JSON.stringify(contentType.data)),
                commonData: JSON.parse(JSON.stringify(this.chunkCommonDataAtCreation))
            })
        }
    }
})