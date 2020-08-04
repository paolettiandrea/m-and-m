Vue.component('audio-player-editor', {
    template: `
        <div >
            <resource-form resCategory="audio" :resourceData="contentData.audioResourceData" ></resource-form>
            
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