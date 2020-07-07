Vue.component('defaulted-input-form', {
    template: `
        <div>
                <b-form-input class="editor-text" :id="uniqueFormId" :value="shownValue" :type="inputType"  @input="handleInput" size="sm"></b-form-input>
        </div>
    `,


    props: {
        // The object containing the target field
        targetContainer: null,
        // The name of the target field
        targetFieldName: "",

        // The default value for the target field
        defaultVal: "",

        inputType: "",

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
        },
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


Vue.component('defaulted-dropdown', {
    template: `
        <b-dropdown :style="{ width: '100%' }" :text="shownValue" variant="outline-secondary" size="sm">
            <div :style="{ maxHeight: 400 + 'px', overflowY: 'scroll' }">
                <b-dropdown-item button href="#" @click="handleInput(option)" v-for="option in options" :key="option" > 
                    <slot :option="option"></slot>
                </b-dropdown-item>
            </div>
        </b-dropdown>
    `,

    props: {
        options: null,
        targetContainer: null,
        targetFieldName: "",
        defaultVal: ""
    },

    methods: {
        handleInput(newOption) {
            console.log(newOption);
            if (newOption===this.defaultVal) {
                this.resetToDefault();
            } else {
                if (this.showDefault) {
                    // We were in default mode, we need to create the non-default variable
                    Vue.set(this.targetContainer, this.targetFieldName, newOption);
                } else {
                    this.targetContainer[this.targetFieldName] = newOption;
                }
            }
        },

        resetToDefault() {
            Vue.delete(this.targetContainer, this.targetFieldName);
        },
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
            return 'defaulted-dropdown-input-for-' + this.targetFieldName
        }
    }

})