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


Vue.component('defaulted-input-form-unit', {
    template: `
        <b-input-group>
                <b-form-input :id="uniqueFormId" :value="shownValue" :type="type" @input="handleInput" size="sm"></b-form-input>
                
                <template v-slot:append>
                    <b-dropdown class="editor-text" v-if="isUnitModeled" :text="shownUnit" variant="success" size="sm">
                        <b-dropdown-item class="editor-text" v-for="unit of possibleUnits" @click="handleUnitChange(unit)" :key="unit">{{unit}}</b-dropdown-item>
                    </b-dropdown>
                    <b-button v-else size="sm">{{shownUnit}}</b-button>
                </template>
        </b-input-group>
    `,

    data() {
        return {
            selectedUnit: ''
        }
    },

    props: {
        // The object containing the target field
        targetContainer: null,
        // The name of the target field
        targetFieldName: "",

        // The default value for the target field
        defaultVal: "",

        type: 'text',

        // An array of all the possible units for this input
        possibleUnits: null,

    },

    methods: {

        setNewString(newString) {
            if (newString===this.defaultVal) {
                this.resetToDefault();
            } else {
                if (this.showDefault) {
                    // We were in default mode, we need to create the non-default variable
                    Vue.set(this.targetContainer, this.targetFieldName, newString);
                } else {
                    this.targetContainer[this.targetFieldName] = newString;
                }
            }
        },

        handleUnitChange(newUnit) {
            this.setNewString(this.shownValue + newUnit);
        },

        handleInput(newVal) {
            if (newVal) {
                this.setNewString(this.parseValue(newVal) + this.shownUnit)
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
                return this.parseUnit(this.defaultVal);
            } else {
                return this.parseUnit(this.targetContainer[this.targetFieldName]);
            }
        },

        uniqueFormId() {
            return 'defaulted-form-input-for-' + this.targetFieldName;
        },

        isUnitModeled() {
            return this.possibleUnits!==undefined;
        }
    }
})


Vue.component('defaulted-quad-input-form-unit', {
    template: `
        <div>
            <b-row align-h="center" no-gutters>
                <b-col cols="6" class="quad-single-field">
                    <defaulted-input-form-unit  :targetContainer="target" targetFieldName="top" :defaultVal="defaults.top"></defaulted-input-form-unit>
                </b-col>
            </b-row>
            <b-row no-gutters align-h="center">
                <b-col class="quad-single-field">
                    <defaulted-input-form-unit :targetContainer="target" targetFieldName="left" :defaultVal="defaults.left"></defaulted-input-form-unit>
                </b-col>
                <b-col class="quad-single-field">
                    <defaulted-input-form-unit :targetContainer="target" targetFieldName="right" :defaultVal="defaults.right"></defaulted-input-form-unit>
                </b-col>
            </b-row>
            <b-row align-h="center" no-gutters>
                <b-col cols="6" class="quad-single-field">
                    <defaulted-input-form-unit  :targetContainer="target" targetFieldName="bottom" :defaultVal="defaults.bottom"></defaulted-input-form-unit>
                </b-col>
            </b-row>
        </div>
    `,

    props: {
        // Expected to be an object containing values for top/bottom/left/right
        target: null,
        defaults: null
    },


})