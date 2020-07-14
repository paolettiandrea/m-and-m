Vue.component('common-styling-editor', {
    template: `
        <div>
            <border-editor :borderData="commonData.borderData"></border-editor>
        </div>
    `,

    props: {
        commonData: null
    }
})