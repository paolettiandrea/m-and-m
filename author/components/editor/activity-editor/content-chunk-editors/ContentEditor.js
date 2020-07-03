export default {
    template: `
        <div v-if="contentChunk">
            <b-card>
                <template v-slot:header>
                    <b-button size="sm" v-on:click="deselectActivityChunk"><b-icon icon="x"></b-icon></b-button>
                    <b-button-group>
                        <b-button size="sm" v-on:click="moveSelectedChunk(1)" :disabled="isSelectedContentChunkLast">
                            <b-icon icon="caret-down"></b-icon>
                        </b-button>
                        <b-button size="sm" v-on:click="moveSelectedChunk(-1)" :disabled="isSelectedContentChunkFirst">
                            <b-icon icon="caret-up"></b-icon>
                        </b-button>
                    </b-button-group>
                    <b-button size="sm" v-on:click="deleteSelectedActivityChunk"><b-icon icon="trash"></b-icon></b-button>
                </template>
      
                <component :is="contentChunk.contentType+'-editor'" :contentChunkData="contentChunk.contentData" ></component>
            </b-card>
        </div>`,

    props: {
        contentChunk: null,
        chunkIndex: NaN
    },

    computed: {
        ... Vuex.mapGetters(['isSelectedContentChunkFirst', 'isSelectedContentChunkLast' ])
    },

    methods: {
        ...Vuex.mapActions(['deleteSelectedActivityChunk', 'moveSelectedChunk', 'deselectActivityChunk']),
        emitDeselected() {
            this.$emit("deselected");
        },
        emitDelete() {
            this.$emit("delete", this.chunkIndex);
        }
    },

    components: {
        "text-displayer-editor": () => import("./TextDisplayerEditor.js"),
        "img-displayer-editor": () => import("./ImgDisplayerEditor.js"),
    }
}