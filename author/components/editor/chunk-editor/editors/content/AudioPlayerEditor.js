Vue.component('audio-player-editor', {
    template: `
        <div >
            <resource-form resCategory="audio" :resourceData="contentData.audioResourceData" ></resource-form>
            
        
        
        </div>
        
    `,
    props: {
        contentData: null
    }
})