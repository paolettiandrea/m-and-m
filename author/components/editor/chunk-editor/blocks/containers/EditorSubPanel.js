Vue.component('editor-subpanel', {
    template: `
        <div class="editor-subpanel">
            <p class="editor-subpanel-title editor-text">{{label}}</p>
            <div class="editor-subpanel-slot">
                <slot></slot>
            </div>
        </div>
    `,

    props: {
        label: "",
    }
})