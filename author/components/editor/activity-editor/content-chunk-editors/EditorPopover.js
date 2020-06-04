export default {
    template: `
        <div>
                <component :is="contentChunk.type+'-editor'" :contentChunkData="contentChunk.data" ></component>

        </div>
    `,

    props: {
        contentChunk: null,
    },

    components: {
        "text-displayer-editor": () => import("./TextDisplayerEditor.js"),
        "img-displayer-editor": () => import("./ImgDisplayerEditor.js"),
    }
}