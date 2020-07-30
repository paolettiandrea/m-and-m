Vue.component('input-type-selector', {
    template: `
        <div v-if="inputTypes" class="type-selector">
            <p class="editor-text editor-light-text type-selector-text">Aggiungi un input</p>
            <b-button-group style="width: 100%">
                    <b-button 
                        variant="outline-primary" 
                        size="sm" 
                        v-for="inputType in inputTypes" 
                        :key="inputType.type" 
                        v-on:click="emitInputSelectedEvent(inputType)"
                        v-b-tooltip.hover :title="inputType.title">
                        <b-icon :icon="inputType.icon"></b-icon>
                    </b-button>
            </b-button-group>
        </div>
    `,

    computed: Vuex.mapState( {
        ... Vuex.mapGetters(['chunkCommonDataAtCreation']),
        inputTypes: state => state.inputTypes
    }),

    methods: {
        emitInputSelectedEvent(inputType) {
            this.$emit("input:selected", {
                    inputType: inputType.type,
                    inputData: JSON.parse(JSON.stringify(inputType.data)),
                    commonData: JSON.parse(JSON.stringify(this.chunkCommonDataAtCreation))
            })
        }
    }
})