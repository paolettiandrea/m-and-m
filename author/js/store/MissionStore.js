// Handles missions and mission selection
let MissionModule = {
    state: () => ({
        activeMissions: {},
        selectedMissionId: '',

        // A flag for each mission false when there are local modifications that need to be updated to the server
        updatedMissionFlags: {},

        pickingActivityMode: false
    }),

    getters: {

        isMissionSelected(state) {
            return !!(state.selectedMissionId);
        },

        selectedMissionHead(state, getters) {
            if (getters.isMissionSelected) { return state.activeMissions[state.selectedMissionId].head }
            else {return null;}
        },

        selectedMissionContent(state, getters) {
            if (getters.isMissionSelected) { return state.activeMissions[state.selectedMissionId].content }
            else {return null;}
        },

        selectedMissionId(state) { return state.selectedMissionId; },

        selectedMissionDefaults(state, getters) { return getters.selectedMissionContent.defaults },

        isSelectedMissionUpdated(state) {
            return state.updatedMissionFlags[state.selectedMissionId];
        },

        activeMissions(state) {
            return state.activeMissions;
        },

        isPickingActivity(state) {
            return state.pickingActivityMode;
        }


    },

    mutations: {
        initializeState(state) {
            state.activeMissions = {}
        },

        addMission(state, missionData) {
            Vue.set(state.activeMissions, missionData.id, missionData);
        },

        setSelectedMissionId(state, id) {
            state.selectedMissionId = id;
        },

        deleteMission(state, id) {
            Vue.delete(state.activeMissions, id);
        },

        removeUpdatedMissionFlag(state, missionId) { Vue.delete(state.updatedMissionFlags, missionId); },

        setUpdatedMissionFlag(state, [missionId, val]) { Vue.set(state.updatedMissionFlags, missionId, val); },

        setSelectedMissionAsUpdated(state) { state.updatedMissionFlags[state.selectedMissionId] = true },

        pickActivity(state) {
            state.pickingActivityMode = true;
        },

        cancelPickActivity(state) {
            state.pickingActivityMode = false;
        },


    },

    actions: {
        // Initializes this module
        initializeMissionModule(context) {
            context.commit('initializeState');
            context.dispatch('downloadMissions');
        },

        // Downloads all the missions from the server
        downloadMissions(context) {
            axios.get("/missions/heads").then((res, err) => {
                if (err) throw err;
                let missionHeads = JSON.parse(res.data);
                for (const missionId in missionHeads) {
                    axios.get("/missions/content/" + missionId).then( (res) => {
                        context.commit('setUpdatedMissionFlag', [missionId, true]);
                        context.commit('addMission', {
                            head: missionHeads[missionId],
                            content: JSON.parse(res.data),
                            id: missionId })
                    })
                }
            })
        },

        // Selects the mission with the given id
        selectMission(context, id) {
            context.commit('setSelectedMissionId', id)
        },

        deselectMission(context) {
            context.commit('setSelectedMissionId', null);
            context.dispatch('deselectActivity');
        },
        createMission(context) {
            axios.get("/missions/new").then((res) => {
                console.log("create mission");
                console.log(res);
                context.commit('addMission', res.data);
            })
        },

        updateSelectedMission(context) {
            axios.post("/missions/update", {
                missionHead: context.getters.selectedMissionHead,
                missionContent: context.getters.selectedMissionContent,
                id: context.getters.selectedMissionId
            }).then((res, err) => {
                if (err) throw err;
                context.commit('setSelectedMissionAsUpdated');
            })
        },
        deleteMission(context, missionId) {
            axios.delete("/missions/delete/"+ missionId).then((res) => {
                context.commit('deleteMission', missionId);
                // If the deleted mission is the selected one deselects it
                if (missionId === context.state.selectedMissionId) {
                    context.dispatch('deselectMission');
                }

                context.commit('removeUpdatedMissionFlag', missionId);
            });
        },

        deleteSelectedMission(context) {
            context.dispatch('deleteMission', context.state.selectedMissionId);
        },

        setUpdatedMissionFlag(context, [missionId, val]) { context.commit('setUpdatedMissionFlag', [missionId, val])},

        activityClickCallback(context, id) {
            if (id===null) {
                // Clicked blank canvas
            } else {

                context.dispatch('selectActivity', id);
            }
        },

        addUsedResource(context, resourceData) {
            context.getters.selectedMissionContent.usedResources[resourceData.resId] = resourceData;
        }


    }
}

export {MissionModule};