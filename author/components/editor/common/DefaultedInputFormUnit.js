Vue.component('defaulted-input-form-unit', {
    template: `
        <b-input-group>
                <b-form-input :id="uniqueFormId" :value="shownValue" :type="typeo" @input="handleInput" size="sm"></b-form-input>
                
                <template v-slot:append>
                    <b-button size="sm">{{shownUnit}}</b-button>
                </template>
        </b-input-group>
    `,


    props: {
        // The object containing the target field
        targetContainer: null,
        // The name of the target field
        targetFieldName: "",

        // The default value for the target field
        defaultVal: "",

        typeo: 'text',

    },

    methods: {
        handleInput(newVal) {
            newVal = this.parseValue(newVal) + this.shownUnit;
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
        },

        parseUnit(string) {
            for (let i = string.length-1; i >=0; i--) {
                if (string[i] >= '0' && string[i] <= '9') {
                    // Found the last numeric character index
                    return string.substring(i+1, string.length);
                }
            }
        },

        parseValue(string) {
                for (let i = string.length - 1; i >= 0; i--) {
                    if (string[i] >= '0' && string[i] <= '9') {
                        // Found the last non-numeric character index
                        return string.substring(0, i + 1);
                    }
                }
        }
    },

    computed: {
        showDefault() {
            return (this.targetContainer[this.targetFieldName]===undefined);
        },

        shownValue() {
                if (this.showDefault) return this.parseValue(this.defaultVal);
                else return this.parseValue(this.targetContainer[this.targetFieldName]);

        },

        shownUnit() {
            if (this.showDefault) {
                return this.parseUnit(this.defaultVal)
            } else {
                return this.parseUnit(this.targetContainer[this.targetFieldName]);
            }
        },

        uniqueFormId() {
            return 'defaulted-form-input-for-' + this.targetFieldName
        }
    }
})