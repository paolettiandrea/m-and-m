export default {
    template: `
        <b-form-group :label="label" label-cols-sm="6" label-align-sm="right" label-size="sm">
            <slot></slot>
        </b-form-group>
    `,

    props: {
        label: ""
    }
}