import { v1 as uuidv1} from '/uuid/dist/esm-browser/index.js';
import {CanvasManager} from "../components/editor/mission-editor/CanvasManager.js";
import {FontDB} from "../../common/js/FontController.js"
import {ActivityModule} from "./store/ActivityStore.js"
import {MissionModule} from "./store/MissionStore.js"

Vue.use(Vuex);

function recursivePruneActivityPointers(obj, targetNext) {
    // console.log('Recursing in ', obj, " lookinf for id ", targetNext);
    if (obj.nextActivityId && obj.outcomeType==='next' && obj.nextActivityId===targetNext) {
        // console.log("FOUND IT!!!!!!!!!!!!!!")
        obj.nextActivityId = null;
        delete obj.outcomeType
        delete obj.edgeId
    }


    for (let key in obj) {
        if (obj.hasOwnProperty(key) && obj[key]) {
            if (typeof obj[key] == "object") {
                recursivePruneActivityPointers(obj[key], targetNext);
            }
        }
    }
}

function pruneNextActivityPointers(activity, targetNext) {
    if (activity.inputComponent) {
        let inputData = activity.inputComponent.inputData;
        // console.log('Before prune: ', inputData)
        recursivePruneActivityPointers(inputData, targetNext);
        // console.log('After prune: ', inputData)
    }
}

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
        },

        clipboard: {
            activity: null,
            mission: null
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
            context.state.canvas.activitySelectedCallback(context.getters.selectedActivity)
        },
        deselectActivity(context) {
            context.commit('setSelectedActivity', null);
            context.dispatch('deselectActivityChunk');
        },
        createActivity(context, mouseCanvasPos) {
            let activities = context.getters.selectedMissionContent.activities;
            let uuid = uuidv1();
            let newActivity = {
                uuid: uuid,
                title: "Nuova attività",
                content: [],
                inputComponent: null,
                graphPosition: mouseCanvasPos,
                screenStyleData: {
                    "inner": {
                        "borderData": {},
                        "spacingData": {
                            "padding": {},
                            "margin": {}
                        },
                        "backgroundData": {}
                    }, "outer": {
                        "backgroundData": {}
                    },

                alignment: {
                    vertical: "normal"
                }
                },
            }

            Vue.set(activities, uuid, newActivity);
            context.state.canvas.newActivity(newActivity);
            context.dispatch('selectActivity', uuid);
            return uuid;
        },
        renameSelectedActivity(context,  newTitle) {
            Vue.set(context.getters.selectedActivity, "title", newTitle);
        },
        deleteSelectedActivity(context) {
            let selectedActivity = context.getters.selectedActivity;
            context.commit('deleteSelectedActivity');
            console.log('Before prune', context.getters.selectedMissionContent)
            console.log('Selected activity', selectedActivity)
            recursivePruneActivityPointers(context.getters.selectedMissionContent, selectedActivity.uuid);
            console.log('After prune', context.getters.selectedMissionContent)
            context.dispatch('deselectActivity')
        },
        updateActivityGraphPosition(context, payload) {
            console.log("Inside dispath: ", payload.id);
            payload.missionContent = context.getters.selectedMissionContent;
            context.commit('updateGraphPosition', payload);
        },

        duplicateSelectedActivity(context) {
            let activities = context.getters.selectedMissionContent.activities;
            let uuid = uuidv1();
            let dupActivity = JSON.parse(JSON.stringify(context.getters.selectedActivity));
            dupActivity.uuid = uuid;
            dupActivity.graphPosition.x += 30;
            pruneNextActivityPointers(dupActivity);
            console.log('Dup activity: ', dupActivity)
            Vue.set(activities, uuid,dupActivity);
            context.state.canvas.newActivity(dupActivity);
        },

        copySelectedActivity(context) {
            context.commit('copyActivity', context.getters.selectedActivity);
        },

        pasteActivity(context) {
            let activities = context.getters.selectedMissionContent.activities;
            let uuid = uuidv1();
            let dupActivity = JSON.parse(JSON.stringify(context.getters.copiedActivity));
            dupActivity.uuid = uuid;
            dupActivity.graphPosition.x += 30;
            pruneNextActivityPointers(dupActivity);
            Vue.set(activities, uuid,dupActivity);
            context.state.canvas.newActivity(dupActivity);
        },

        // Content chunk management ===================================================================================
        deleteSelectedActivityInputComponent(context) {
            Vue.delete(context.getters.selectedActivity, 'inputComponent');
        },
        deleteSelectedActivityContentChunk(context, index) {
            context.getters.selectedActivity.content.splice(index, 1);
        },

        moveSelectedActivityChunk(context, {offset, index}) {
            let newIndex = index + offset;

            context.commit('moveActivityContentChunk', {
                selectedActivity: context.getters.selectedActivity,
                oldIndex: index,
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

        deleteSelectedActivity(state) {
            console.log(state.mission)
            let selectedMission = state.mission.activeMissions[state.mission.selectedMissionId];
            console.log(selectedMission)
            let selectedActivity = selectedMission.content.activities[state.selectedActivityId];

            console.log(state.selectedActivityId)
            console.log(selectedMission.content.activities)
            Vue.delete(selectedMission.content.activities, state.selectedActivityId);
        },

        copyActivity(state, activity) {
              state.clipboard.activity = JSON.parse(JSON.stringify(activity));
        },

        updateGraphPosition(state, payload) {

            payload.missionContent.activities[payload.id].graphPosition = payload.pos;
        },
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

        copiedActivity(state) { return state.clipboard.activity; },

        isWaitingForActivityClick(state) {return state.activityClickedCallback !== null },

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