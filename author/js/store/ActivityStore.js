let ActivityModule = {
    state: () => ({
        staticData: null
    }),

    getters: {
        chunkCommonDataAtCreation(state) {
            return state.staticData.commonChunkDataAtCreation;
        }
    },

    mutations: {
        setStaticData(state, staticData) { Vue.set(state, 'staticData', staticData)}
    },


    actions: {
        initializeActivityModule(context) {
            axios.get('./js/store/ActivityStoreStaticData.json').then((res, err) => {
                if (err) throw err;
                context.commit('setStaticData', res.data)
            })
        }
    }
}

export {ActivityModule};