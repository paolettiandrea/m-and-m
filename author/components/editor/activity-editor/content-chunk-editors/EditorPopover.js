export default {
    template: `
        <div v-if="contentChunk">
            <b-card>
                <template v-slot:header>
                    <b-button size="sm" v-on:click="emitDeselected"><b-icon icon="x"></b-icon></b-button>
                    <b-button-group>
                        <b-button size="sm" v-on:click="emitMove(1)"><b-icon icon="caret-down"></b-icon></b-button>
                        <b-button size="sm" v-on:click="emitMove(-1)"><b-icon icon="caret-up"></b-icon></b-button>
                    </b-button-group>
                    <b-button size="sm" v-on:click="emitDelete"><b-icon icon="trash"></b-icon></b-button>
                        
                </template>
      
      <component :is="contentChunk.type+'-editor'" :contentChunkData="contentChunk.data" ></component>
</b-card>
            
                

        </div>
    `,

    props: {
        contentChunk: null,
        chunkIndex: NaN
    },

    methods: {
        emitDeselected() {
            this.$emit("deselected");
        },
        emitDelete() {
            this.$emit("delete", this.chunkIndex);
        },
        emitMove(offset) {
            this.$emit("move", {offset: offset, index: this.chunkIndex})

        }
    },

    components: {
        "text-displayer-editor": () => import("./TextDisplayerEditor.js"),
        "img-displayer-editor": () => import("./ImgDisplayerEditor.js"),
    }
}