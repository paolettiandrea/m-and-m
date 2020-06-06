// Component that manages the input of a resource, which can be an URL to a web resource or a local file.
// In that case the resource is uploaded to the server

// TODO the management of multiple use of resources and trailing/missing files caused by not saving are still not handled

export default {
    template: `
        <div>
            <div v-if="this.fileMode==false">
                <b-input-group>
                    <b-input-group-prepend>
                        <b-button v-on:click="toggleInputMode" variant="outline-secondary">
                            <b-icon icon="link" ></b-icon>
                        </b-button>
                    </b-input-group-prepend>
                    <b-form-input v-model="resUrl" placeholder="Inserisci il link alla risorsa" :state="urlFormState"></b-form-input>
    
                </b-input-group>
    
            </div>
            
            <div v-else>
                <b-input-group>
                <b-input-group-prepend>
                    <b-button v-on:click="toggleInputMode();" variant="outline-secondary">
                        <b-icon icon="folder-symlink" ></b-icon>
                    </b-button>
                </b-input-group-prepend>
                    <b-form-file
                        v-model="file"
                        @input="fileChange"
                        :placeholder="this.resData.originalTitle"
                    ></b-form-file>
                </b-input-group>
            </div>
        </div>`,

    data() {
        return {
            file: null,
            fileMode: false,
            resUrl: '',
            urlFormState: null
        }
    },

    watch: {
        "resUrl": {
            handler(after, before) {
                if (after.trim()!=='') {
                    (async() => {
                        try {
                            await axios.get(after);
                            // If response was successfull set the resData url to the one given by the user
                            this.resData.url = this.resUrl;
                            this.urlFormState = null;
                        } catch (err) {
                            console.log("error");
                            this.urlFormState = false;
                        }
                    })();
                }
            }
        }
    },

    props: {
        resData: null,
        resCategory: "",
        defaultResource: ""
    },

    methods: {
        fileChange() {
            // Retract old resource from server if present
            this.discardFile();

            // Upload new resource to the server and set the url to the corrisponding one
            var formData = new FormData();
            formData.append("resCategory", this.resCategory);
            formData.append("missionId", this.$store.state.selectedId);
            formData.append("file", this.file);
            axios.post('/missions/uploadRes', formData, {
                headers: {
                    'Content-Type': 'multipart/form-data'
                },
            }).then((res) => {
                this.resData.url = "/" + res.data.relPath;
                this.resData.originalTitle = res.data.originalName;
            })
        },

        discardFile() {
            if (this.resData.originalTitle !== '') {
                this.resData.originalTitle = '';
                axios.delete('/missions/deleteRes' + this.resData.url).then((res) => {
                    console.log(res);
                })
            }
        },

        toggleInputMode() {
            this.fileMode = !this.fileMode;
            if (this.fileMode===false) {
                this.discardFile();
                this.resUrl = '';
            }

            this.resData.url = this.defaultResource;
        }
    },

    mounted() {
        if (this.resData.originalTitle !== '') {
            this.fileMode = true;
        }
    }
}