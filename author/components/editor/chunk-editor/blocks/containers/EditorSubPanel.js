const PADDING_PER_LEVEL = 30;

Vue.component('editor-subpanel', {
    template: `
        <div class="editor-subpanel subpanel-group"">
            <b-button size="sm" variant="secondary-outline" class="editor-font subpanel-button editor-button" :pressed.sync="toggled" :style="{marginLeft: level*padPerLvl + 'px'}">{{label}}</b-button>
            <div class="editor-subpanel-slot">
                <b-collapse v-model="toggled">
                    <slot></slot>
                </b-collapse>
            </div>
        </div>
    `,

    data() {
        return {
            toggled: false
        }
    },

    methods: {

    },

    props: {
        label: "",
        level: 0,
    },

    computed: {
        padPerLvl() {
            return PADDING_PER_LEVEL;
        }
    }
})

Vue.component('editor-subpanel-terminal', {
    template: `
    <div>
        <b-form-group
            label-cols-lg="4"
            label-class="editor-text no-vertical-padding"
            class="subpanel-group"
            >
            <template slot="label" >
                <b-button size="sm" variant="secondary-outline" class="subpanel-button editor-button" :pressed.sync="toggled" :style="{marginLeft: level*padPerLvl + 'px'}">{{label}}</b-button>
                
            </template>
                <b-collapse v-model="toggled">
                    <slot></slot>
                </b-collapse>
        </b-form-group >
    </div>`,

    data() {
        return {
            toggled: false
        }
    },

    methods: {
        toggle() {
            this.toggled = !this.toggled;
        }
    },

    props: {
        label: "",
        level: 0,
    },

    computed: {
        padPerLvl() {
            return PADDING_PER_LEVEL;
        }
    }
})