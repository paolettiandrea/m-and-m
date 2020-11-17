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

Vue.component('editor-subpanel-list', {
    template: `
        <div class="editor-subpanel subpanel-group"">
            <div class="editor-subpanel-slot" v-for="(elem,i) in list" :style="{marginLeft: level*padPerLvl + 'px'}">
                <b-card class="list-card">
                <template #header>
                    <b-button-group>
                        <b-button size="sm" @click="moveElement(i, +1)"><b-icon icon="caret-down"></b-icon></b-button>
                        <b-button size="sm" @click="moveElement(i, -1)"><b-icon icon="caret-up"></b-icon></b-button>
                    </b-button-group>
                     <b-button size="sm" @click="removeElement(i)"><b-icon icon="trash"></b-icon></b-button>
</template>
                    <slot v-bind:element="elem"></slot>
</b-card>
                
            </div>
        </div>
    `,

    data() {
        return {
            toggled: false
        }
    },

    methods: {
        removeElement(index) {
            this.list.splice(index, 1);
        },
        moveElement(index, offset) {
            array_move(this.list, index, index + offset);
        }
    },

    props: {
        label: "",
        level: 0,
        list: Array,

        elementLabelGetter: null
    },

    computed: {
        padPerLvl() {
            return PADDING_PER_LEVEL;
        }
    }
})


function array_move(arr, old_index, new_index) {
    if (new_index >= arr.length) {
        var k = new_index - arr.length + 1;
        while (k--) {
            arr.push(undefined);
        }
    }
    arr.splice(new_index, 0, arr.splice(old_index, 1)[0]);
    return arr; // for testing
};
