import { v1 as uuidv1} from '/uuid/dist/esm-browser/index.js';
import {CanvasManager} from "../components/editor/mission-editor/CanvasManager.js";
import {FontDB} from "../../common/js/FontController.js"
import {ActivityModule} from "./store/ActivityStore.js"

Vue.use(Vuex);


const store = new Vuex.Store({
    modules: {
        activity: ActivityModule
    },
    state: {

        // STATIC DATA ================================================================================================

        // Missions data
        missionHeads: {},
        missionContents: {},

        // Available content types
        contentTypes: null,
        inputTypes: null,

        activityClickedCallback: null,

        canvas: null,

        fontDB: null,




        // STATE ======================================================================================================

        selectedMissionId: '',
        selectedActivityId: '',

        // The index of the selected activity content, NaN if nothing is selected, -1 if the input chunk is selected
        selectedContentIndex: NaN,

        // A flag for each mission false when there are local modifications that need to be updated to the server
        updatedMissionFlags: {},

        panelState: {
            missionSettingsOpen: false
        }
    },

    actions: {
        initializeStore(context) {
            axios.get("/missions/heads").then((res, err) => {
                if (err) throw err;
                context.commit('setMissionHeads', res.data);
                context.commit('resetUpdatedMissionFlags');
                context.commit('initializeFontDB', 50);
                context.commit('initializeActivityModule');

                // Fetch all mission contents
                for (const head of Object.values(res.data)) {
                    context.dispatch('updateMissionContent', head.contentId);
                }
            })
        },

        setMissionSettingsPanel(context, open) {
            context.commit('setMissionSettingsPanel', open);
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
            context.dispatch('deselectActivityChunk');
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

        },

        // Content chunk management ===================================================================================
        deleteSelectedActivityChunk(context) {
            if (context.getters.isChunkSelected) {
                if (context.getters.isInputChunkSelected) {
                    Vue.delete(context.getters.selectedActivity, 'inputComponent');
                } else {
                    context.getters.selectedActivity.content.splice(context.state.selectedContentIndex, 1);
                }
            }
            context.commit('setSelectedActivityChunk', NaN);
        },


        moveSelectedChunk(context, offset) {
            let oldIndex = context.state.selectedContentIndex;
            let newIndex = oldIndex + offset;

            context.commit('moveActivityContentChunk', {
                selectedActivity: context.getters.selectedActivity,
                oldIndex: oldIndex,
                newIndex: newIndex,
            });
            context.commit('setSelectedActivityChunk', newIndex);
        },

        addContentChunk(context, contentData) {
            context.commit('addContentChunk', [context.getters.selectedActivity, contentData]);
            context.commit('setSelectedActivityChunk', context.getters.selectedActivity.content.length-1);
        },

        setInputChunk(context, inputData) {
            context.commit('setInputChunk', [context.getters.selectedActivity, inputData]);
            context.commit('setSelectedActivityChunk', -1);
        },

        deselectActivityChunk(context) {
            context.commit('setSelectedActivityChunk', NaN);
        }
    },

    mutations: {

        // Initializes all the store data that is destined to be constant throughout execution
        initializeConstData(state) {
            axios.get("./data/contentChunkTypes.json").then( res => {
                state.contentTypes = res.data.contentChunkTypes;
            })

            axios.get("./data/inputTypes.json").then( res => {
                state.inputTypes = res.data.inputTypes;
            })

        },

        initializeCanvas(state, canvas) {
            state.canvas = canvas;
        },

        initializeFontDB(state, fontNum) {
            state.fontDB = new FontDB(fontNum);
        },

        setMissionSettingsPanel(state, open) {
            state.panelState.missionSettingsOpen = open;
        },

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

        selectActivity(state, activityId) {
            state.selectedActivityId = activityId;
        },



        addActivityClickedCallback(state, callback) {
            state.activityClickedCallback = callback;
        },

        // Activity chunk management ----------------------------------------------------------------------------------

        setSelectedActivityChunk(state, chunkIndex) { state.selectedContentIndex = chunkIndex; },

        moveActivityContentChunk(state, data) {
            let contentArray = data.selectedActivity.content;
            if (data.newIndex >= 0 && data.newIndex < contentArray.length) {
                let chunk = contentArray[data.oldIndex];
                contentArray.splice(data.oldIndex, 1);
                contentArray.splice(data.newIndex, 0, chunk);
            }
        },

        addContentChunk(state, [targetActivity, contentData]) {
            targetActivity.content.push(contentData);
        },

        setInputChunk(state, [targetActivity, inputData]) {
            Vue.set(targetActivity, 'inputComponent', inputData);
        }
    },

    getters: {



        isMissionSettingsPanelOpen(state) { return state.panelState.missionSettingsOpen; },

        fontDB(state) {
            return state.fontDB;
        },

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

        selectedActivityChunk(state, getters) {
            if (!isNaN(state.selectedContentIndex)) {
                if (state.selectedContentIndex === -1) {
                    return getters.selectedActivity.inputComponent;
                } else {
                    return getters.selectedActivity.content[state.selectedContentIndex];
                }
            } else {
                return null;
            }
        },

        selectedActivityChunkIndex(state)  { return state.selectedContentIndex; },

        selectedMissionDefaults(state, getters) { return getters.selectedMissionContent.defaults },

        isChunkSelected(state) { return !isNaN(state.selectedContentIndex); },

        isInputChunkSelected(state) { return state.selectedContentIndex === -1; },

        missionBarTitle(state, getters) {
            if (getters.isMissionSelected) {
                return getters.selectedMissionHead.title;
            } else {
                return 'Seleziona una missione';
            }
        },

        isSelectedMissionUpdated(state) {
            return state.updatedMissionFlags[state.selectedMissionId];
        },

        isSelectedContentChunkFirst(state) { return state.selectedContentIndex===0; },

        isSelectedContentChunkLast(state, getters) {return state.selectedContentIndex===getters.selectedActivity.content.length-1}
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