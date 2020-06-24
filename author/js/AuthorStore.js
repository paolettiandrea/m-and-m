import { v1 as uuidv1} from '/uuid/dist/esm-browser/index.js';
import {CanvasManager} from "../components/editor/content-editor/CanvasManager.js";
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
        selectedActivity: null,

        updatedMissionFlags: {}
    },
    actions: {
        initializeStore(context) {
            axios.get("/missions/heads").then((res, err) => {
                if (err) throw err;
                context.commit('setMissionHeads', res.data);
                context.commit('resetUpdatedMissionFlags');

                // Fetch all mission contents
                for (const head of Object.values(res.data)) {
                    context.dispatch('updateMissionContent', head.contentId);
                }
            })
        },

        // Mission management =========================================================================================

        selectMission(context, missionId) {
            context.commit('setSelectedMissionId', missionId);
            context.state.canvas.newData(context.getters.selectedMissionContent);
        },
        deselectMission(context) {
            context.commit('setSelectedMissionId', null);
            context.dispatch('deselectActivity');
        },
        createMission(context) {
            axios.get("/missions/new").then((res) => {
                context.commit('addMissionHead', res.data);
                context.commit('setUpdatedMissionFlag', [res.data._id, true]);
            })

        },
        updateSelectedMission(context) {
            axios.post("/missions/update", {
                    missionHead: context.getters.selectedMissionHead,
                    missionContent: context.getters.selectedMissionContent
                }).then((res, err) => {
                    if (err) throw err;
                    context.commit('setSelectedMissionAsUpdated');
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
                if (missionId === context.state.selectedMissionId) {
                    context.dispatch('deselectMission');
                }

                context.commit('removeUpdatedMissionFlag', missionId);
                context.commit('removeMissionContent', missionId);
            });
        },
        deleteSelectedMission(context) {
            context.dispatch('deleteMission', context.state.selectedMissionId);
        },

        setUpdatedMissionFlag(context, [missionId, val]) { context.commit('setUpdatedMissionFlag', [missionId, val])},


        updateMissionContent(context, contentId) {
            axios.get("/missions/content/" + contentId).then( (res) => {
                context.commit('addMissionContent', res.data)
            })
        },

        // Activity management ========================================================================================

        selectActivity(context, activityId) {
            context.commit('setSelectedActivity', activityId);
        },
        deselectActivity(context) {
            context.commit('setSelectedActivity', null);
        },
        createActivity(context) {
            let activities = context.getters.selectedMissionContent.activities;
            let uuid = uuidv1();
            Vue.set(context.getters.selectedMissionContent.activities, uuid, {
                uuid: uuid,
                title: "Nuova attività",
                content: [],
                inputComponent: null
            })
            context.dispatch('selectActivity', uuid);
            context.state.canvas.newActivity(context.getters.selectedActivity);
            return uuid;
        },
        deleteActivity(context, activityId) {

        }
    },
    mutations: {

        resetUpdatedMissionFlags(state) {
            let newFlags = {};
            for (const key in state.missionHeads) {
                newFlags[key] = true;
            }
            Vue.set(state, 'updatedMissionFlags', newFlags);

        },
        removeUpdatedMissionFlag(state, missionId) { Vue.delete(state.updatedMissionFlags, missionId); },
        setUpdatedMissionFlag(state, [missionId, val]) { Vue.set(state.updatedMissionFlags, missionId, val); },

        setMissionHeads(state, heads) { state.missionHeads = heads; },
        setSelectedMissionId(state, id) { state.selectedMissionId = id; },

        addMissionHead(state, head) { Vue.set(state.missionHeads, head._id, head) },

        addMissionContent(state, missionContent) { Vue.set(state.missionContents, missionContent._id, missionContent); },
        removeMissionContent(state, contentId) { Vue.delete(state.missionContents, contentId); },

        setSelectedActivity(state, id) { state.selectedActivityId = id; },

        setSelectedMissionAsUpdated(state) { state.updatedMissionFlags[state.selectedMissionId] = true },


        initializeCanvasManager(state, canvasSettings) {
            state.canvas = new CanvasManager(canvasSettings, this);
        },


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
            return (state.selectedMissionId) ? state.missionContents[state.missionHeads[state.selectedMissionId].contentId] : null;
        },
        selectedMissionId(state) { return state.selectedMissionId; },

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
        },

        isSelectedMissionUpdated(state) {
            return state.updatedMissionFlags[state.selectedMissionId];
        }
    }
})

store.commit('initializeConstData');
store.dispatch('initializeStore');

store.watch(
    state => state.missionContents,
    () => {
        if (store.getters.isMissionSelected) store.commit('setUpdatedMissionFlag', [store.state.selectedMissionId, false]);
    },
    { deep: true }
)

export default store;