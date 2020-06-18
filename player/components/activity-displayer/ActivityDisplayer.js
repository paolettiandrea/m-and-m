Vue.component('activity-displayer', {
    template: `
                <div>
                    <div v-if="this.activityContent">
                        <div  v-for="contentChunk of this.activityContent.content">
                            <component :is="contentChunk.contentType" :contentData="contentChunk.contentData"></component>
                        </div>
                    </div>

                    <!--Input component-->
                    <component :is="activityContent.inputComponent.inputType" :inputData="activityContent.inputComponent.inputData" @input-received="inputHandler"></component>

                </div>`,

    props: {
        activityContent: null
    },

    methods: {
        inputHandler(inputData) {
        }
    },

    components: {},
})