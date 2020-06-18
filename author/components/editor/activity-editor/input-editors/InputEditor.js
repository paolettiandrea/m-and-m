export default {
    template: `
        <div>
            <b-card>
                <template v-slot:header>
                    <b-button size="sm" v-on:click="emitDeselected"><b-icon icon="x"></b-icon></b-button>
                    <b-button size="sm" v-on:click="emitDelete"><b-icon icon="trash"></b-icon></b-button>
                        
                </template>
                <component :is="inputData.inputType+'-editor'" :inputData="inputData.inputData" ></component>
            </b-card>
        </div>`,

    props: {
        inputData: null
    },

    methods: {
        emitDeselected() {
            this.$emit("deselected");
        },
        emitDelete() {
            //this.$emit("delete", this.chunkIndex);
        }
    },

    components: {
        "input-outcome-editor": () => import("./InputOutcomeEditor.js"),
        "text-insert-editor": () => import("./TextInsertEditor.js")
    }
}