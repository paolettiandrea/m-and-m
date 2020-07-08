export default {
    template: `
        <div class="editor-subpanel">
            <p class="editor-subpanel-title editor-text">{{title}}</p>
            <div class="editor-subpanel-slot">
                <slot></slot>
            </div>
        </div>
    `,

    props: {
        title: "",
    }
}