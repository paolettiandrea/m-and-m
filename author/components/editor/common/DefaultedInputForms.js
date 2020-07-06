Vue.component('defaulted-input-form', {
    template: `
        <div>
            <b-form-input :id="uniqueFormId" :value="shownValue" :type="type" @input="handleInput"></b-form-input>
            
            <b-popover :target="uniqueFormId"><b-button @click="resetToDefault" size="sm"><b-icon icon="arrow-counterclockwise"></b-icon></b-button></b-popover>
        </div>
    `,


    props: {
        // The object containing the target field
        targetContainer: null,
        // The name of the target field
        targetFieldName: "",

        // The default value for the target field
        defaultVal: "",

        type: 'text'
    },

    methods: {
        handleInput(newVal) {
            if (newVal===this.defaultVal) {
                this.resetToDefault();
            } else {
                if (this.showDefault) {
                    // We were in default mode, we need to create the non-default variable
                    Vue.set(this.targetContainer, this.targetFieldName, newVal);
                } else {
                    this.targetContainer[this.targetFieldName] = newVal;
                }
            }
        },

        resetToDefault() {
            Vue.delete(this.targetContainer, this.targetFieldName);
        }
    },

    computed: {
        showDefault() {
            return (this.targetContainer[this.targetFieldName]===undefined);
        },

        shownValue() {
            if (this.showDefault) return this.defaultVal;
            else return this.targetContainer[this.targetFieldName];
        },

        uniqueFormId() {
            return 'defaulted-form-input-for-' + this.targetFieldName
        }
    }
})