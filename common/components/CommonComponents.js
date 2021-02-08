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


Vue.component('descriptive-placeholder' , {
    template: `<div style="height:100%; width: 100%">
        <transition name="placeholder" mode="out-in" >
            <div v-if="!fullIf" key="placeholder" style="display: flex; justify-content: center; flex-direction: column; align-items: center; height: 100%; width:100%">
                    <span class="my-text-muted editor-text" :style="{'fontSize': textSize}" style="text-align: center">{{text}}</span>
                    <span v-if="subText" class="my-text-muted editor-text"  :style="{'fontSize': subTextSize}" style="text-align: center">{{subText}}</span>
            </div>
            <div  v-else key="content" style="width: 100%; height: 100%">
                <slot style="width: 100%; height: 100%"></slot>
            </div>
        </transition>
    </div>`,

    props: {
        fullIf: { required: true },
        text: { required: true },
        subText: "",
        textSize: { default: "2em"},
        subTextSize: { default: "1em"}
    }
})