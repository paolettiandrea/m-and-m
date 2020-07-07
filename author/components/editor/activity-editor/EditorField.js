export default {
    template: `
        <b-form-group :label="label" label-cols-sm="6" label-align-sm="right" label-size="sm" label-class="editor-text editor-field-label">
            <slot></slot>
        </b-form-group>
    `,

    props: {
        label: ""
    }
}