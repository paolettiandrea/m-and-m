import { v1 as uuidv1} from '/uuid/dist/esm-browser/index.js';
import {CanvasManager} from "../components/editor/mission-editor/CanvasManager.js";
import {FontDB} from "../../common/js/FontController.js"
import {ActivityModule} from "./store/ActivityStore.js"
import {MissionModule} from "./store/MissionStore.js"

Vue.use(Vuex);


const store = new Vuex.Store({
    modules: {
        activity: ActivityModule,
        mission: MissionModule
    },
    state: {

        // STATIC DATA ================================================================================================

        // Available content types
        contentTypes: null,
        inputTypes: null,

        activityClickedCallback: null,

        canvas: null,

        fontDB: null,


        // STATE ======================================================================================================

        selectedActivityId: '',

        // The index of the selected activity content, NaN if nothing is selected, -1 if the input chunk is selected
        selectedContentIndex: NaN,



        panelState: {
            missionSettingsOpen: false
        }
    },

    actions: {
        initializeStore(context) {
            context.dispatch('initializeMissionModule');
            context.dispatch('initializeActivityModule');

            context.commit('initializeFontDB', 20);
        },

        setMissionSettingsPanel(context, open) {
            context.commit('setMissionSettingsPanel', open);
        },

        // Mission management =========================================================================================


        canvasSetup(context, canvasSettings) {
            context.commit('initializeCanvasManager', canvasSettings);
            context.state.canvas.newData(context.getters.selectedMissionContent);
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

        initializeFontDB(state, fontNum) {
            state.fontDB = new FontDB(fontNum);
        },

        setMissionSettingsPanel(state, open) {
            state.panelState.missionSettingsOpen = open;
        },

        setSelectedActivity(state, id) { state.selectedActivityId = id; },


        initializeCanvasManager(state, canvasSettings) {
            state.canvas = new CanvasManager(canvasSettings, this);
        },

        selectActivity(state, activityId) {
            state.selectedActivityId = activityId;
        },



        addActivityClickedCallback(state, callback) {
            state.activityClickedCallback = callback;
        },

        deleteActivityClickedCallback(state) {
            state.activityClickedCallback = null;
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

        isChunkSelected(state) { return !isNaN(state.selectedContentIndex); },

        isInputChunkSelected(state) { return state.selectedContentIndex === -1; },

        missionBarTitle(state, getters) {
            if (getters.isMissionSelected) {
                return getters.selectedMissionHead.title;
            } else {
                return 'Seleziona una missione';
            }
        },



        isSelectedContentChunkFirst(state) { return state.selectedContentIndex===0; },

        isSelectedContentChunkLast(state, getters) {return state.selectedContentIndex===getters.selectedActivity.content.length-1}
    }
})

store.commit('initializeConstData');
store.dispatch('initializeStore');

store.watch(
    state => state.mission.activeMissions,
    () => {
        if (store.getters.isMissionSelected) store.commit('setUpdatedMissionFlag', [store.getters.selectedMissionId, false]);
    },
    { deep: true }
)

export default store;