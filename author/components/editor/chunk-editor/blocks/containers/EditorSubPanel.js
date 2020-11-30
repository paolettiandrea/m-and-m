const PADDING_PER_LEVEL = 20;

Vue.component('activity-editor-list', {
    template: `
        <div>
            <div v-if="list" v-for="(e, i) in list">
                <activity-editor-subpanel :label="calculateLabel(e,i)">
                    <slot v-bind:index="i" v-bind:elem="e"></slot>
                    <template v-slot:toolbarappend class="btn-group">
                   
                        <b-button-group>
                            <b-button variant="outline-secondary" @click="moveElement(i, +1)" ><b-icon icon="caret-down"></b-icon></b-button>
                            <b-button variant="outline-secondary" @click="moveElement(i, -1)" ><b-icon icon="caret-up"></b-icon></b-button>
                        </b-button-group>
                        <b-button-group>
                            <b-button variant="outline-danger" @click="deleteElement(i)" ><b-icon icon="trash"></b-icon></b-button>
                        </b-button-group>
                    </template>
                </activity-editor-subpanel>
            </div> 
            <b-button style="width: 100%" variant="outline-primary" @click="addCallback()">Add</b-button>
        </div>
    `,

    props: {
        list: Array,
        labelFunction: null,
        addCallback: null
    },

    methods: {
        calculateLabel(elem, index) {
            if (this.labelFunction) {
                return this.labelFunction(elem, index);
            } else {
                return index;
            }
        },

        moveElement(index, offset) {
            let elem = this.list[index];
            this.list.splice(index, 1);
            this.list.splice(index+offset, 0, elem)
        },

        deleteElement(index) {
            this.list.splice(index, 1);
        }
    }
})

Vue.component('editor-subpanel-terminal', {
    template: `
        <div>
            <b-card class="activity-editor-card">
                <template #header size="sm">
                    {{label}} 
                </template> 
                <slot></slot>
            </b-card>
        </div>
    `,

    props: {
        label: ""
    }
})

Vue.component('activity-editor-subpanel', {
    template: `
        <div>
            <b-button-toolbar style="width: 100%">
            
                <b-button-group style="flex: 1">
                    <b-button class="activity-editor-fake-input-button input-group-text" @click="collapseButtonClicked">{{label}}</b-button>
                </b-button-group>
                
               <slot name="toolbarappend"></slot>
            </b-button-toolbar>
            <div class="editor-subpanel-left-padded-slot">
                <b-collapse :id="collapseId">
                <slot></slot>
</b-collapse> 
            </div>
        </div>
    `,

    props: {
        label: ""
    },

    methods: {
        collapseButtonClicked() {
            this.$root.$emit('bv::toggle::collapse', this.collapseId)
        }
    },

    computed: {
        collapseId() { return 'subpanel-editor-collpase-' + this.label}
    }
})

Vue.component('activity-editor-component-panel', {
    template: `
        <div>
            <b-button-toolbar class="activity-editor-subpanel-main-button">
            <b-input-group style="flex: 1">
                <template #prepend>
                    <b-input-group-text>
                        <b-icon :icon="chunkMetadata.icon"></b-icon>
                    </b-input-group-text>
                </template>
                <template #append style="flex: 1;">
                    <b-button class="activity-editor-fake-input-button input-group-text" @click="onClick"  style="flex: 1;">
                        {{chunkMetadata.title}}
                    </b-button>
                </template>
            </b-input-group>
                <b-button-group>
                    <b-button variant="outline-secondary" @click="moveSelectedActivityChunk({offset: 1, index: index})" ><b-icon icon="caret-down"></b-icon></b-button>
                    <b-button variant="outline-secondary" @click="moveSelectedActivityChunk({offset: -1, index: index})" ><b-icon icon="caret-up"></b-icon></b-button>
                </b-button-group>
                <b-button-group>
                    <b-button variant="outline-danger" @click="deleteContent" ><b-icon icon="trash"></b-icon></b-button>
                </b-button-group>
            </b-button-toolbar>
                    
            <b-collapse :id="collapseId" class="editor-subpanel-left-padded-slot activity-editor-component-content" accordion="content-editors-accordion">
                        <component v-if="isInputComponent(componentData)" 
                                    :is="componentData.inputType+'-editor'" 
                                    :inputData="componentData.inputData" ></component>
                        <component v-else
                                    :is="componentData.contentType+'-editor'" 
                                    :contentData="componentData.contentData" ></component>
                        
                        <common-styling-editor :commonData="componentData.commonData"></common-styling-editor>
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
