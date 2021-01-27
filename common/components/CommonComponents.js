Vue.component('editable-text', {
    template: `
    <div>
        <b-form-input size="sm" v-if="editMode" v-model="targetObject[targetFieldName]" @blur="setEditMode(false)"></b-form-input>
        <span v-else @click="setEditMode(true)">{{label}}</span>
    </div>`,

    props: {
        targetObject: null,
        targetFieldName: "",
        placeholder: ""
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
            let target =  this.targetObject[this.targetFieldName]
            if (target) {return target}
            else {
                return this.placeholder
            }
        }
    }
})