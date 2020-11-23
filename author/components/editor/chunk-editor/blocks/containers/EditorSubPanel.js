const PADDING_PER_LEVEL = 30;

Vue.component('activity-editor-subpanel', {
    template: `
        <div>
            <b-button class="activity-editor-subpanel-main-button">Yoyo</b-button>
        </div>
    `
})

Vue.component('activity-editor-component-panel', {
    template: `
        <div>
            <b-button-toolbar class="activity-editor-subpanel-main-button">
                <b-button-group style="flex: 1">
                    <b-button @click="onClick" >
                        <b-icon :icon="chunkMetadata.icon"></b-icon>
                        {{chunkMetadata.title}}
                    </b-button>
                </b-button-group>
                <b-button-group>
                    <b-button @click="moveSelectedActivityChunk({offset: 1, index: index})" ><b-icon icon="caret-down"></b-icon></b-button>
                    <b-button @click="moveSelectedActivityChunk({offset: -1, index: index})" ><b-icon icon="caret-up"></b-icon></b-button>
                </b-button-group>
                <b-button-group>
                    <b-button @click="deleteContent" ><b-icon icon="trash"></b-icon></b-button>
                </b-button-group>
            </b-button-toolbar>
                    
            <b-collapse :id="collapseId" accordion="content-editors-accordion" style="padding-left: 5px">
                        <component v-if="isInputComponent(componentData)" 
                                    :is="componentData.inputType+'-editor'" 
                                    :inputData="componentData.inputData" ></component>
                        <component v-else
                                    :is="componentData.contentType+'-editor'" 
                                    :contentData="componentData.contentData" ></component>
</b-collapse>
        </div>
    `,

    props: {
        componentData: {},
        index: 0
    },

    computed: {
        ... Vuex.mapState( {
            ... Vuex.mapGetters(['chunkCommonDataAtCreation']),
            inputTypes: state => state.inputTypes,
            contentTypes: state => state.contentTypes
        }),
        collapseId() { if (this.isInputComponent(this.componentData)) { return "input-chunk-editor-collapse" }
        else { return "chunk-editor-collapse-"+ this.index}},
        chunkMetadata() {
            // I'm not proud of this, but it's good enough for now
            let typeFieldName = "";
            if (this.isInputComponent(this.componentData)) {typeFieldName = "inputType"; }
            else { typeFieldName = "contentType"; }
            let type = this.componentData[typeFieldName];

            if (this.isInputComponent(this.componentData)) {
                for (let t of this.inputTypes) {
                    if (type === t.type) { return t }
                }
            }
            else {
                for (let t of this.contentTypes) {
                    if (type === t.type) {
                        return t
                    }
                }
            }
        }

    },

    methods: {

        ...Vuex.mapActions(['moveSelectedActivityChunk', 'deleteSelectedActivityInputComponent', 'deleteSelectedActivityContentChunk']),
        deleteContent() {
            if (this.isInputComponent(this.componentData)) { this.deleteSelectedActivityInputComponent(); }
            else { this.deleteSelectedActivityContentChunk(this.index); }

        },
        onClick() {
            this.$root.$emit('bv::toggle::collapse', this.collapseId)
        },
        isInputComponent(componentData) { return componentData.hasOwnProperty("inputData")},
        isContentComponent(componentData) { return componentData.hasOwnProperty("contentData")},
        isUnidentifiedComponent(componentData) { return !this.isInputComponent(componentData) && ! this.isContentComponent(componentData) }
    }
})
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
