Vue.component('reset-button', {
    template: `<b-button class="reset-button" size="sm" :disabled="disabled" v-on:click="emitClick"><b-icon icon="arrow-counterclockwise"></b-icon></b-button>`,
    props: {
        disabled: {
            default: false
        }
    },
    methods: {
        emitClick() {
            this.$emit('reset');
        }
    }
})

var DefaultedBaseComponent = {
    props: {
        // The object containing the target field
        targetContainer: null,
        // The name of the target field
        targetFieldName: "",

        // The default value for the target field
        defaultVal: "",

        resetHandler: {
            default: null
        }
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

        uniqueFormId() {        // TODO use key
            return 'defaulted-form-input-for-' + this.targetFieldName
        }
    },

    mounted() {
        if (this.resetHandler) {
            this.resetHandler.push({
                resetCallback: this.resetToDefault,
                isDefault: () => {return (this.targetContainer[this.targetFieldName]===undefined);}
            })
        }
    }
}

Vue.component('defaulted-input-form', Vue.extend({
    mixins: [DefaultedBaseComponent],
    template: `
        <div class="horizontal-flex">
                <b-form-input class="editor-text full-flex" :id="uniqueFormId" :value="shownValue" :type="inputType"  @input="handleInput" size="sm"></b-form-input>
                <reset-button v-if="!resetHandler" @reset="resetToDefault" :disabled="showDefault"></reset-button>
        </div>
    `,

    props: {
        inputType: ''
    }
}))


Vue.component('defaulted-dropdown', Vue.extend({
    mixins: [DefaultedBaseComponent],
    template: `
    <div class="horizontal-flex">
        <b-dropdown class="full-flex" :text="shownValue" variant="outline-secondary" size="sm">
            <div :style="{ maxHeight: 400 + 'px', overflowY: 'scroll' }">
                <b-dropdown-item button href="#" @click="handleInput(option)" v-for="option in options" :key="option" > 
                    <slot :option="option"></slot>
                </b-dropdown-item>
            </div>
        </b-dropdown>
        <reset-button v-if="!resetHandler" @reset="resetToDefault" :disabled="showDefault"></reset-button>
    </div>`,

    props: {
        options: null
    },
}))


Vue.component('defaulted-input-form-unit', Vue.extend({
    mixins: [DefaultedBaseComponent],
    template: `
    <div class="horizontal-flex">
        <b-input-group class="full-flex">
                <b-form-input :id="uniqueFormId" :value="shownValue" :type="type" @input="handleInput" size="sm"></b-form-input>
                
                <template v-slot:append>
                    <b-dropdown toggle-class="editor-button editor-text" v-if="isUnitModeled" :text="shownUnit" variant="secondary-outline" size="sm">
                        <b-dropdown-item class="editor-text" v-for="unit of possibleUnits" @click="handleUnitChange(unit)" :key="unit">{{unit}}</b-dropdown-item>
                    </b-dropdown>
                    <b-button v-else size="sm">{{shownUnit}}</b-button>
                </template>
        </b-input-group>
        <reset-button v-if="!resetHandler" @reset="resetToDefault" :disabled="showDefault"></reset-button>
    </div>`,

    data() {
        return {
            selectedUnit: '',
        }
    },

    props: {
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

        isUnitModeled() {
            return this.possibleUnits!==undefined;
        }
    }
}))

var ResetOverrider = {
    data() {
        return {
            resetHandler: []
        }
    },
    methods: {
        resetAll() {
            for (const handler of this.resetHandler) {
                handler.resetCallback();
            }
        }
    },

    computed: {
        isDefault() {
            for (const handler of this.resetHandler) {
                if (!handler.isDefault()) return false;
            }
            return true;
        }
    }
}

Vue.component('defaulted-quad-input-form-unit', Vue.extend({
    mixins: [ResetOverrider],
    template: `
    <div class="horizontal-flex">
        <div class="full-flex">
            <b-row align-h="center" no-gutters>
                <b-col cols="6" class="quad-single-field">
                    <defaulted-input-form-unit :resetHandler="resetHandler" :targetContainer="target" targetFieldName="top" :defaultVal="defaults.top" :possibleUnits="possibleUnits"></defaulted-input-form-unit>
                </b-col>
            </b-row>
            <b-row no-gutters align-h="center">
                <b-col class="quad-single-field">
                    <defaulted-input-form-unit :resetHandler="resetHandler" :targetContainer="target" targetFieldName="left" :defaultVal="defaults.left" :possibleUnits="possibleUnits"></defaulted-input-form-unit>
                </b-col>
                <b-col class="quad-single-field">
                    <defaulted-input-form-unit :resetHandler="resetHandler" :targetContainer="target" targetFieldName="right" :defaultVal="defaults.right" :possibleUnits="possibleUnits"></defaulted-input-form-unit>
                </b-col>
            </b-row>
            <b-row align-h="center" no-gutters>
                <b-col cols="6" class="quad-single-field">
                    <defaulted-input-form-unit :resetHandler="resetHandler"  :targetContainer="target" targetFieldName="bottom" :defaultVal="defaults.bottom"  :possibleUnits="possibleUnits"></defaulted-input-form-unit>
                </b-col>
            </b-row>
        </div>
        <reset-button @reset="resetAll" :disabled="isDefault"></reset-button>
    </div>
    `,

    props: {
        // Expected to be an object containing values for top/bottom/left/right
        target: null,
        defaults: null,
        possibleUnits: null
    }
}))

Vue.component('font-style-editor', Vue.extend({
    mixins: [ResetOverrider],
    template: `
        <div class="horizontal-flex">
            <b-button-group class="full-flex horizontal-flex" size="sm">
                <defaulted-input-toggle-button :resetHandler="resetHandler" icon="type-bold" :targetContainer="fontData" targetFieldName="fontWeight" :defaultVal="defaults.fontWeight" 
                            :options="{true: 'bold', false: 'normal'}" class="full-flex"></defaulted-input-toggle-button>
                <defaulted-input-toggle-button :resetHandler="resetHandler" icon="type-italic" :targetContainer="fontData" targetFieldName="fontStyle" :defaultVal="defaults.fontStyle" 
                            :options="{true: 'italic', false: 'normal'}" class="full-flex"></defaulted-input-toggle-button>
                <defaulted-input-toggle-button :resetHandler="resetHandler" icon="type-strikethrough" :targetContainer="fontData" targetFieldName="fontDecoration" :defaultVal="defaults.textDecoration" 
                            :options="{true: 'line-through', false: 'none'}" class="full-flex"></defaulted-input-toggle-button>
            </b-button-group>
            <reset-button @reset="resetAll" :disabled="isDefault"></reset-button>
        </div>
    `,
    props: {
        fontData: null,
        defaults: null
    }
}))



Vue.component('defaulted-input-option-form', Vue.extend({
    mixins: [DefaultedBaseComponent],
    template: `
        <div class="horizontal-flex">
            <b-button-group class="full-flex" size="sm">
                <b-button class="editor-button" :pressed="shownValue===option.val" @click="handleInput(option.val)" v-for="option of options" :key="uniqueFormId + option.val">
                    <b-icon :icon="option.icon"></b-icon>
                </b-button>
            </b-button-group> 
            <reset-button v-if="!resetHandler" @reset="resetToDefault" :disabled="showDefault"></reset-button>
        </div>           
    `,

    props: {
        options: null,
    },
}))


Vue.component('defaulted-input-toggle-button', Vue.extend({
    mixins: [DefaultedBaseComponent],
    template: `
    <div class="horizontal-flex">
        <b-button class="editor-button full-flex" size="sm" :pressed="shownValue===options.true" @click="handleInput()">
            <b-icon :icon="icon"></b-icon>
        </b-button>
        <reset-button v-if="!resetHandler" @reset="resetToDefault" :disabled="showDefault"></reset-button>
    </div>
    `,


    props: {
        options: null,

        icon: {
            type: String,
            default: 'trash'
        }

    },

    methods: {
        handleInput() {
            // Toggle the value
            let newVal = this.options.true;
            if (this.shownValue===this.options.true) {
                newVal = this.options.false;
            }

            if (newVal===this.defaultVal) {
                this.resetToDefault();
            } else {
                Vue.set(this.targetContainer, this.targetFieldName, newVal);
            }
        },
    },
}))

