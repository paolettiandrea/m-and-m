function buildGraphData(missionContent) {
    var data = {
        nodes: [],
        edges: []
    };

    for (const activity of missionContent.activities) {
        data.nodes.push(buildActivityNodeData(activity))
        data.edges.concat(buildActivityEdgeData(activity));
    }

    return data;
}

function buildActivityNodeData(activity) {
    return {
        type: 'modelRect',
        id: activity.uuid,
        label: activity.title
    }
}

function buildActivityEdgeData(activity) {

    var nextOutcomes = getNextOutcomesFromActivity(activity);
    var res = [];
    for (const outcome of nextOutcomes) {
        res.push({
            source: activity.uuid,
            target: outcome.nextActivityId,
        })
    }
    return res;
}

function recursiveFindFromKey(targetKey, obj, resArray) {
    for (const key in obj) {
        if (key===targetKey) resArray.push(obj[key]);
        if (typeof obj[key] === 'object') recursiveFindFromKey(targetKey, obj[key], resArray);
    }
}

// Extracts recursively the next outcomes from an activity and returns them in a shallow array
function getNextOutcomesFromActivity(activity) {

    // Retrieve an array of outList
    var outcomeLists = [];
    recursiveFindFromKey('outList', activity.inputComponent, outcomeLists);

    //Check every outList and take the last outcome if is a 'next'
    var res = [];
    for (const outList of outcomeLists) {
        if (outList.length > 0) {
            var lastoutcome = outList[outList.length-1];
            if (lastoutcome.outcomeType === 'next') {
                res.push(lastoutcome);
            }
        }
    }
    return res;
}

export class CanvasManager {
    constructor(missionContent, settings) {
        console.log("CanvasConstructor");
        this.callbacks = settings.callbacks;
        this.graph = new G6.Graph({
            container: settings.mountId, // String | HTMLElement, required, the id of DOM element or an HTML node
            width: 800, // Number, required, the width of the graph
            height: 400, // Number, required, the height of the graph,
            modes: {
                default: ['drag-canvas', 'drag-node'],
            },
            animate: true
        });


        var data = buildGraphData(missionContent);
        this.graph.data(data); // Load the data defined in Step 2

        // On click retrieve the corresponding activity and trigger a selection callback
        this.graph.on('node:click', e => {
            this.callbacks.selectionCallback(this.activityMap.get(e.item._cfg.id));
        })

        this.activityMap = new Map();
        for (const activity of missionContent.activities) {
            this.activityMap.set(activity.uuid, activity);
        }

        this.graph.render(); // Render the graph
    }

    newData(newMissionContent) {
        var data = buildGraphData(newMissionContent);
        this.graph.changeData(data);
    }

    newActivity(newActivity) {
        this.graph.addItem('node', buildActivityNodeData(newActivity));
        this.activityMap.set(newActivity.uuid, newActivity);
    }

    updateActivityNode(activity) {
        let targetNode = this.graph.findById(activity.uuid);
        let nodeData = buildActivityNodeData(activity);
        this.graph.updateItem(targetNode, nodeData);
    }

    addLink(fromActivity, toActivity) {

    }
}


