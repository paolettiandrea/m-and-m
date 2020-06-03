export default {
    template: `
        <div v-if="activityData" @mouseover="hovering=true" @mouseleave="hovering=false">
            <b-form v-on:submit.prevent="titleValidation">
                <b-form-group class="labeled-form-group" label="Title" label-for="title-input" label-cols="3">
                    <b-form-input id="title-input"
                                  v-model="title"
                                  type="text"
                    ></b-form-input>
                </b-form-group>
            </b-form>
            
            <activity-displayer :activity-content="activityData.activity" >
                <template v-slot:inter="props">
                   <content-type-selector :showPop="hovering" @new:content="newContent" :chunkIndex="props.index"></content-type-selector>
                </template>
            </activity-displayer>
            
            <!--Editor popover for each contentChunk-->
            <div v-for="(contentChunk, index) in activityData.activity.content">
                <b-popover :target="'content-chunk-'+index" triggers="click blur">
                    <component :is="contentChunk.type+'-editor'" :contentChunkData="contentChunk.data"></component>
                </b-popover>
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
            hovering: false
        }
    },

    methods: {
        titleValidation() {
            this.activityData.callbacks.updateSelectedActivityTitle(this.title);
        },

        newContent(newContentData) {
            this.activityData.activity.content.splice(newContentData.index, 0, newContentData.contentChunk)
        },
    },
    components: {
        "content-type-selector": () => import("./ContentTypeSelector.js"),

        "text-displayer-editor": () => import("./content-chunk-editors/TextDisplayerEditor.js")
    }
}