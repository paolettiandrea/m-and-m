Vue.component('video-displayer-editor', {
    template: `
        <div >
            <p> Video editor stuff (only link?)</p>            
        </div>
        
    `,
    props: {
        contentData: null
    },

    computed: {
        ... Vuex.mapGetters(['selectedMissionDefaults'])
    }
})