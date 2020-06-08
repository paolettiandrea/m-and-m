export default {
    template: `
        <div class="column-flex-container" v-if="activityData">
        
            <div class="no-flex-grow">
                <b-form v-on:submit.prevent="titleValidation">
                <b-form-group class="labeled-form-group" label="Title" label-for="title-input" label-cols="3">
                    <b-form-input id="title-input"
                                  v-model="title"
                                  type="text"
                    ></b-form-input>
                </b-form-group>
            </b-form>
            </div>
            
            <div class="full-flex vertical-scroll">
                <activity-displayer  :activity-content="activityData.activity" @content:chunk:clicked="contentChunkClicked">
                <template v-slot:inter="props">
                    <b-collapse :id="'add-content-collapse-'+props.index">
                        <content-type-selector @new:content="newContent" :chunkIndex="props.index"></content-type-selector>
                    </b-collapse>
                </template>
            </activity-displayer>
            
                <div v-if="this.activityData.activity.content.length == 0">
                    <content-type-selector @new:content="newContent" :chunkIndex="0"></content-type-selector>
                </div>
            </div>
            
            
            
             
            <div class="no-flex-grow">
            
            <b-collapse v-model="isChunkSelected">
                        <content-editor-popover  
                            :contentChunk="selectedContentChunk"
                            :chunkIndex="selectedIndex"
                            @deselected="select(NaN)"
                            @delete="deleteContent"
                            @move="moveContentChunk">    
                        </content-editor-popover>
            </b-collapse>
        </div>    
    </div>
    `,

    props: {
        activityData: null
    },

    watch: {
        'activityData': {
            handler: function (after, before) {
                this.title = after.activity.title;
            }
        }
    },

    data() {
        return {
            title: "",
            selectedContentChunk: null,
            isChunkSelected: false,
            selectedIndex: NaN
        }
    },

    methods: {
        titleValidation() {
            this.activityData.callbacks.updateSelectedActivityTitle(this.title);
        },

        newContent(newContentData) {
            this.activityData.activity.content.splice(newContentData.index, 0, newContentData.contentChunk);
            this.select(newContentData.index, newContentData.contentChunk);
        },

        deleteContent(chunkIndex) {
            this.activityData.activity.content.splice(chunkIndex, 1);
            this.select(NaN);
            console.log(chunkIndex);
        },

        moveContentChunk(moveData) {
            let newIndex = moveData.index + moveData.offset;
            if (newIndex >= 0 && newIndex < this.activityData.activity.content.length) {
                this.activityData.activity.content.splice(moveData.index, 1);
                this.activityData.activity.content.splice(newIndex, 0, this.selectedContentChunk);
                this.select(newIndex, this.selectedContentChunk);
            }
        },

        contentChunkClicked(contentData) {
            if (contentData.index===this.selectedIndex) {
                this.select(NaN);
            } else {
                this.select(contentData.index, contentData.content);
            }
        },


        select(chunkIndex, contentData) {
            // If already selected first deselect
            if (!isNaN(this.selectedIndex)) {
                this.toggleAddButton(this.selectedIndex);
                //this.selectedContentChunk = null;
                this.isChunkSelected = false;
            }

            this.selectedIndex = chunkIndex;
            if (!isNaN(this.selectedIndex)) {
                this.isChunkSelected = true;                // FIXME probabilmente superfluo
                this.toggleAddButton(this.selectedIndex);
                this.selectedContentChunk = contentData;
            }
        },

        toggleAddButton(contentChunkIndex) {
            this.$root.$emit('bv::toggle::collapse', 'add-content-collapse-'+contentChunkIndex);
            this.$root.$emit('bv::toggle::collapse', 'add-content-collapse-'+(contentChunkIndex+1));
        }
    },
    components: {
        "content-type-selector": () => import("./ContentTypeSelector.js"),
        "content-editor-popover": () => import("./content-chunk-editors/EditorPopover.js")
    }
}