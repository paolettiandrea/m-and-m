import { v1 as uuidv1} from '/uuid/dist/esm-browser/index.js';
Vue.use(Vuex);


const store = new Vuex.Store({
    state: {
        selectedId: '',
        selectedActivityId: '',

        contentTypes: null,
        missionContents: {},

        inputTypes: null,

        activityClickedCallback: null,

        canvas: null,
        missionHeads: {},
        selectedMissionId: null,
        selectedMissionContents: null,
        selectedActivity: null,
    },
    actions: {
        initializeStore(context) {
            axios.get("/missions/heads").then((res, err) => {
                if (err) throw err;
                context.commit('setMissionHeads', res.data);
            })
        },

        // Mission management =========================================================================================

        selectMission(context, missionId) {
            context.commit('setSelectedMissionId', missionId);
            axios.get("/missions/content/" + context.getters.selectedMissionHead.contentId).then( (res) => {
                context.commit('setSelectedMissionContents', res.data);
            })
        },
        deselectMission(context) {
            context.commit('setSelectedMissionId', null);
            context.commit('setSelectedMissionContents', null);
        },
        createMission(context) {
            axios.get("/missions/new").then((res) => {
                context.commit('addMissionHead', res.data);
            })

        },
        deleteMission(context, missionId) {
            axios.delete("/missions/delete/"+ missionId).then((res) => {
                // Check that the returned deletedContentId matches
                let correspondingContentId = context.state.missionHeads[missionId].contentId;
                if (res.data.deletedContentId !== correspondingContentId) {
                    throw Error("Something went very bad, the returned deletedContentId doesn't match");
                } else {
                    Vue.delete(context.state.missionHeads, missionId);
                    Vue.delete(context.state.missionContents, correspondingContentId);
                }
                // If the deleted mission is the selected one deselects it
                if (missionId === context.state.selectedMissionId) { context.dispatch('deselectMission'); }
            });
        },
        deleteSelectedMission(context) {
            context.dispatch('deleteMission', context.state.selectedMissionId);
        },

        // Activity management ========================================================================================

        selectActivity(context, activityId) {
            context.commit('setSelectedActivity', activityId);
        },
        createActivity(context) {
            let activities = context.getters.selectedMissionContent.activities;
            let uuid = uuidv1();
            Vue.set(activities, uuid, {
                uuid: uuid,
                title: "Nuova attività",
                content: [],
                inputComponent: null
            })
        },
        deleteActivity(context, activityId) {

        }
    },
    mutations: {

        setMissionHeads(state, heads) { state.missionHeads = heads; },
        setSelectedMissionContents(state, contents) { state.selectedMissionContents = contents; },
        setSelectedMissionId(state, id) { state.selectedMissionId = id; },

        addMissionHead(state, head) { Vue.set(state.missionHeads, head._id, head) },

        setSelectedActivity(state, id) { state.selectedActivityId = id; },



        select (state, id) {
            state.selectedId = id;
        },

        selectActivity(state, activityId) {
            state.selectedActivityId = activityId;
        },

        // Initializes all the store data that is destined to be constant throughout execution
        initializeConstData(state) {
            axios.get("./components/editor/activity-editor/content-chunk-editors/contentChunkTypes.json").then( res => {
                state.contentTypes = res.data.contentChunkTypes;
            })
            axios.get("./components/editor/activity-editor/input-editors/inputTypes.json").then( res => {
                state.inputTypes = res.data.inputTypes;
            })
        },

        initializeCanvas(state, canvas) {
            state.canvas = canvas;
        },

        addActivityClickedCallback(state, callback) {
            state.activityClickedCallback = callback;
        }
    },

    getters: {
        isMissionSelected(state) {
            return !!(state.selectedMissionId);
        },

        selectedMissionHead(state) {
            return state.missionHeads[state.selectedMissionId] || null;
        },
        selectedMissionContent(state) {
            return state.selectedMissionContents;
        },

        isActivitySelected(state) {
            return !!(state.selectedActivityId);
        },

        selectedActivity(state, getters) {
            return (getters.isActivitySelected) ? getters.selectedMissionContent.activities[state.selectedActivityId] : null;
        },

        missionBarTitle(state, getters) {
            if (getters.isMissionSelected) {
                return getters.selectedMissionHead.title;
            } else {
                return 'Seleziona una missione';
            }
        }
    }
})

store.commit('initializeConstData');
store.dispatch('initializeStore');

export default store;