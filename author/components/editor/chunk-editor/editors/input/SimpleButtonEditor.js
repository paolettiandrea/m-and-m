Vue.component('simple-button-editor', {
    template: `
        <div>
            <button-editor :buttonData="inputData.buttonData" :defaults="selectedMissionDefaults.buttonData"></button-editor>
        </div>`,

    props: {
        inputData: null
    },

    computed: {
        ...Vuex.mapGetters(['selectedMissionDefaults'])
    }



})