export default {
    template: `
        <div>
            <b-card>
                <template v-slot:header>
                    <b-button size="sm" v-on:click="deselectActivityChunk"><b-icon icon="x"></b-icon></b-button>
                    <b-button size="sm" v-on:click="deleteSelectedActivityChunk"><b-icon icon="trash"></b-icon></b-button>
                        
                </template>
                <component :is="inputData.inputType+'-editor'" :inputData="inputData.inputData" ></component>
            </b-card>
        </div>`,

    props: {
        inputData: null
    },

    methods: {
        ... Vuex.mapActions(['deleteSelectedActivityChunk', 'deselectActivityChunk'])
    },

    components: {
        "input-outcome-editor": () => import("./InputOutcomeEditor.js"),
        "text-insert-editor": () => import("./TextInsertEditor.js")
    }
}