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
            
            
            <activity-displayer class="full-flex vertical-scroll" :activity-content="activityData.activity" @content:chunk:clicked="contentChunkClicked">
                <template v-slot:inter="props">
                   <content-type-selector @new:content="newContent" :chunkIndex="props.index"></content-type-selector>
                </template>
                
              
            </activity-displayer>
             
            <div v-if="selectedContentChunk" class="no-flex-grow">
            
            <content-editor-popover  :contentChunk="selectedContentChunk"></content-editor-popover>
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
            selectedContentChunk: null
        }
    },

    methods: {
        titleValidation() {
            this.activityData.callbacks.updateSelectedActivityTitle(this.title);
        },

        newContent(newContentData) {
            this.activityData.activity.content.splice(newContentData.index, 0, newContentData.contentChunk);
        },

        contentChunkClicked(contentData) {
            this.selectedContentChunk = contentData;
            console.log(contentData);
        }
    },
    components: {
        "content-type-selector": () => import("./ContentTypeSelector.js"),
        "content-editor-popover": () => import("./content-chunk-editors/EditorPopover.js")
    }
}