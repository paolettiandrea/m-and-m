Vue.component('editable-text', {
    template: `
    <div>
        <b-form-input size="sm" v-if="editMode" v-model="targetObject[targetFieldName]" @blur="setEditMode(false)"></b-form-input>
        <span v-else @click="setEditMode(true)">{{label}}</span>
    </div>`,

    props: {
        targetObject: null,
        targetFieldName: ""
    },

    data() {
        return {
            editMode: false
        }
    },

    methods: {
        setEditMode(state) {
            this.editMode = state;
        }
    },

    computed: {
        label() {
            return this.targetObject[this.targetFieldName]
        }
    }
})