Vue.component('json-editor', {
    template: `
    <div>
        <div class="horizontal-flex">
            <b-form-checkbox class="full-flex" v-model="autoUpdate" style="margin-bottom: 12px">Auto-update</b-form-checkbox>
            <b-button v-if="!autoUpdate" @click="update" size="sm" variant="outline-primary" :disabled="!updatePending">Update</b-button>
        </div>
        <div id="jsoneditor">
            
        </div>
    </div>`,

    props: {
        editedObj: {
            required: true
        }
    },

    data() {
        return {
            autoUpdate: false,
            editor: null,
            updatePending: false,
        }
    },

    watch: {
        "editedObj": {
            handler(newVal, oldVal) {
                this.editor.set(newVal);
            }
        }
    },


    methods: {
        update() {
            this.updatePending = true;
            let json = this.editor.get();
            for (const field in this.editedObj) {
                if (json.hasOwnProperty(field)) {
                    Vue.set(this.editedObj, field, json[field]);
                } else {
                    Vue.delete(this.editedObj, field);
                }
            }
            for (const jsonField in json) {
                if (!this.editedObj.hasOwnProperty(jsonField)) {
                    Vue.set(this.editedObj, jsonField, json[jsonField]);
                }
            }
            this.updatePending = false;
        }
    },

    mounted() {
        var container = document.getElementById("jsoneditor");
        var options = {
            mode: 'tree',
            onChange: () => {
                if (this.autoUpdate) {
                    this.update();
                } else { this.updatePending = true; }
            }
        };
        this.editor = new JSONEditor(container, options);
        this.editor.set(this.editedObj);
    }
})