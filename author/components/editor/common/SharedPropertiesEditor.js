export default {
    template: `
        <div>
            <border-editor :borderData="commonData.borderData"></border-editor>
        </div>
    `,

    props: {
        commonData: null
    },

    components: {
        'border-editor': () => import("./BorderEditor.js")
    }
}