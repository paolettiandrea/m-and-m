Vue.component('audio-player-editor', {
    template: `
        <div >
            <url-input :target="contentData.audioResourceData" fieldName="url"></url-input>
            <button-editor :buttonData="contentData.buttonData" :defaults="selectedMissionDefaults.buttonData" :iconLabel="true"></button-editor>

        
        
        </div>
        
    `,
    props: {
        contentData: null
    },

    computed: {
        ... Vuex.mapGetters(['selectedMissionDefaults'])
    }
})