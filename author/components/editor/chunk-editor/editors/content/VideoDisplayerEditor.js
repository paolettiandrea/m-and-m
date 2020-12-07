Vue.component('video-displayer-editor', {
    template: `
        <div >
            <url-input :target="contentData" fieldName="url"></url-input>
        </div>
        
    `,
    props: {
        contentData: null
    },

    computed: {
        ... Vuex.mapGetters(['selectedMissionDefaults'])
    }
})


Vue.component('url-input', {
    template: `
        <div>
            <b-input-group prepend="Link">
                <b-form-input v-model="target[fieldName]"></b-form-input>
            </b-input-group>
        </div>`,

    props: {
        target: null,
        fieldName: ""
    }
})