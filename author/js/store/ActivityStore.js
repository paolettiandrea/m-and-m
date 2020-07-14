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
        initializeActivityModule(state) {
            axios.get('./js/store/ActivityStoreStaticData.json').then((res, err) => {
                if (err) throw err;
                state.staticData = res.data;
            })
        }
    }
}

export {ActivityModule};