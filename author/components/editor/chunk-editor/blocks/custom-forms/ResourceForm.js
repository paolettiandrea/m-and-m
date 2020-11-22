// Component that manages the input of a resource, which can be an URL to a web resource or a local file.
// In that case the resource is uploaded to the server

// TODO the management of multiple use of resources and trailing/missing files caused by not saving are still not handled

Vue.component('resource-form', {
    template: `<div>
                
            
                <b-input-group size="sm">
                <template v-slot:prepend>
                    <b-button class="editor-button" @click="pickFile"><b-icon icon="file-earmark-arrow-up"></b-icon></b-button>
                </template>
                <template v-slot:append>
                    <b-button class="editor-button" @click="setMode('url')" v-if="mode==='file'"><b-icon icon="link"></b-icon></b-button>
                    <b-button class="editor-button" @click="setMode('file')" v-else><b-icon icon="files"></b-icon></b-button>
                </template>
                
                
                
<!--            Url form-->
                <b-form-input v-model="resourceData.url" @input="urlChanged" class="editor-text" v-if="mode==='url'"></b-form-input>
                

                <b-dropdown variant="outline-secondary" size="sm" v-if="mode==='file'" style="flex: 1 1 auto">
                    <template v-slot:button-content class="editor-text">{{dropdownText}}</template>
                    <b-dropdown-item v-if="Object.keys(selectedMissionContent.usedResources).length===0">
                        <span class="editor-text" style="font-style: italic">Nessun file di questo tipo caricato</span>
                    </b-dropdown-item>
                    <b-dropdown-item :disabled="resId===resourceData.id" v-for="(resource, resId) in selectedMissionContent.usedResources" :key="resource.id" v-if="resource.category===resCategory"
                                        @click="fileChosen(resId)">
                        <span class="editor-text">{{selectedMissionContent.usedResources[resId].originalFileName}}</span>
                    </b-dropdown-item>
                </b-dropdown>
                </b-form-select>
            </b-input-group>
            
<!--            Hidden input form used for the file prompt-->
            <input :id="keyedInputId" type="file" style="display: none">
    </div>`,

    props: {
        resourceData: null,
        resCategory: { default: 'generic'}
    },

    data() {
        return {
            hiddenInputElement: null,
            mode: ''
        }
    },

    computed: {
        ...Vuex.mapGetters(['selectedMissionId', 'selectedMissionContent']),

        keyedInputId() {
           return  'hidden-file-input-' + this.key;
        },



        usingFile() { return this.resourceData.hasOwnProperty('id'); },
        usingUrl() { return !this.usingFile; },

        dropdownText() {
            if (this.usingFile) { return this.selectedMissionContent.usedResources[this.resourceData.id].originalFileName;}
            else { return "Seleziona un file"}
        },

    },

    methods: {
        pickedFileCallback(file) {
            if (file) {
                console.log("Picked file callback")
                // Upload new resource to the server and set the url to the corrisponding one
                var formData = new FormData();
                formData.append("missionId", this.selectedMissionId);
                formData.append("file", file);

                axios.post('/missions/uploadRes', formData, {
                    headers: { 'Content-Type': 'multipart/form-data' },
                }).then((res) => {

                    if (this.usingFile) { this.changeResourceUsage(this.resourceData.id, -1) }

                    // Set resource data for the picked file
                    Vue.set(this.resourceData, 'id', res.data.resId)
                    this.setUrl("/" + this.selectedMissionId + '/resources/' + res.data.resId)

                    // Update mission level used resources register
                    Vue.set(this.selectedMissionContent.usedResources, res.data.resId, {
                        uses: 1,
                        originalFileName: res.data.originalName,
                        category: this.resCategory
                    })

                    this.setMode('file');
                })
            }
        },

        pickFile() { this.hiddenInputElement.click(); },

        setUrl(newUrl) {
            this.resourceData.url = newUrl
        },

        setMode(mode) {
            this.mode = mode;
        },

        fileChosen(resId) {
            if (this.usingFile) { this.changeResourceUsage(this.resourceData.id, -1)}


                let chosenResource = this.selectedMissionContent.usedResources[resId];
            Vue.set(this.resourceData, 'id', resId)
            this.setUrl("/" + this.selectedMissionId + '/resources/' + resId)
            this.changeResourceUsage(resId, +1);

        },

        urlChanged(newVal) {
            if (this.usingFile) {
                this.changeResourceUsage(this.resourceData.id, -1);
                Vue.delete(this.resourceData, 'id');
            }

        },

        changeResourceUsage(resId, usageOffset) {
            if (this.selectedMissionContent.usedResources.hasOwnProperty(resId)) {
                let newUses = this.selectedMissionContent.usedResources[resId].uses + usageOffset;
                if (newUses>0) {
                    this.selectedMissionContent.usedResources[resId].uses = newUses;
                } else if (newUses===0) { Vue.delete(this.selectedMissionContent.usedResources, resId); }
                else { console.error("Can't have negative uses") }
            } else {
                console.error('Tried to change the usage number of a non existent resource');
            }
        },

    },

    mounted() {
        this.hiddenInputElement = document.getElementById(this.keyedInputId);

        if (this.hiddenInputElement) {
            this.hiddenInputElement.oninput = (ev) => {
                let file = this.hiddenInputElement.files[0];
                this.pickedFileCallback(file);
            }
        } else {
            console.error("The hidden file input element wasn't found during component mounting!")
        }

        if (this.usingFile) { this.setMode('file')}
        else { this.setMode('url')}
    }
})