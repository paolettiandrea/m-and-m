function buildGraphData(missionContent) {
    var data = {
        nodes: [],
        edges: []
    };

    for (const activity of missionContent.activities) {
        data.nodes.push(buildActivityNodeData(activity))
        buildActivityEdgeData(activity, data.edges);
    }

    return data;
}

function buildActivityNodeData(activity) {
    return {
        type: 'rect',
        id: activity.uuid,
        label: activity.title,

        anchorPoints: [
            [0.5, 0],
            [0.5, 1],
        ]
    }
}

function buildActivityEdgeData(activity, edgeArray) {

    var nextOutcomes = getNextOutcomesFromActivity(activity);
    for (const outcome of nextOutcomes) {
        var newEdge = {
            source: activity.uuid,
            target: outcome.nextActivityId,
        };
        edgeArray.push(newEdge);
        console.log("New edge");
        console.log(newEdge);
    }
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

const EDGE_SPLIT_DISTANCE = 20;
const NODE_WIDTH = 100;
const EDGE_TURNAROUND_PADDING = 20;

function makeEdgePath(startPoint, endPoint) {
    if (startPoint.y > endPoint.y) {    // The edge should do some sort of turnaround since the endPoint is higher
        var hSign = Math.sign(startPoint.x - endPoint.x);

        if (Math.abs(startPoint.x - endPoint.x)> NODE_WIDTH + EDGE_TURNAROUND_PADDING*2) {  // Can fit the turnaround between the nodes
            return [
                ['M', startPoint.x, startPoint.y],
                ['L', startPoint.x, startPoint.y + EDGE_SPLIT_DISTANCE],
                ['L', (startPoint.x + endPoint.x)/2, startPoint.y + EDGE_SPLIT_DISTANCE],
                ['L', (startPoint.x + endPoint.x)/2, endPoint.y - EDGE_SPLIT_DISTANCE],
                ['L', endPoint.x, endPoint.y - EDGE_SPLIT_DISTANCE],
                ['L', endPoint.x, endPoint.y],
            ]
        } else {
            var turnaroundX = startPoint.x + (NODE_WIDTH/2+EDGE_TURNAROUND_PADDING)*hSign;
            return [
                ['M', startPoint.x, startPoint.y],
                ['L', startPoint.x, startPoint.y + EDGE_SPLIT_DISTANCE],
                ['L', turnaroundX, startPoint.y + EDGE_SPLIT_DISTANCE],
                ['L', turnaroundX, endPoint.y - EDGE_SPLIT_DISTANCE],
                ['L', endPoint.x, endPoint.y - EDGE_SPLIT_DISTANCE],
                ['L', endPoint.x, endPoint.y],
            ]
        }

    } else {
        return [
            ['M', startPoint.x, startPoint.y],
            ['L', startPoint.x, startPoint.y + EDGE_SPLIT_DISTANCE],
            ['L', endPoint.x, startPoint.y + EDGE_SPLIT_DISTANCE],
            ['L', endPoint.x, endPoint.y],
        ]
    }
}

G6.registerEdge('hvh', {
    draw(cfg, group) {
        const startPoint = cfg.startPoint;
        const endPoint = cfg.endPoint;
        const shape = group.addShape('path', {
            attrs: {
                stroke: '#333',
                endArrow: true,
                path: makeEdgePath(startPoint, endPoint),
            },
            // must be assigned in G6 3.3 and later versions. it can be any value you want
            name: 'path-shape',
        });
        return shape;
    },
});

export class CanvasManager {
    constructor(missionContent, settings, store) {
        console.log("CanvasConstructor");
        this.callbacks = settings.callbacks;
        this.store = store;
        this.graph = new G6.Graph({
            container: settings.mountId, // String | HTMLElement, required, the id of DOM element or an HTML node
            width: 800, // Number, required, the width of the graph
            height: 400, // Number, required, the height of the graph,
            modes: {
                default: ['drag-canvas', 'drag-node'],
            },
            animate: true,
            defaultEdge: {
                // ... Other properties for edges
                type: 'hvh',
                sourceAnchor: 1,
                targetAnchor: 0,
                style: {
                    lineWidth: 2,
                    endArrow: true,
                    // ... Other style properties
                },
            },
            layout: {
                // Object, the layout configuration. Random layout by default
                type: 'dagre',
                nodesep: 20,
                ranksep: 50,
                controlPoints: true,
                // ...                    // Other configurations for the layout
            },


        });


        var data = buildGraphData(missionContent);
        console.log(data);
        this.graph.data(data); // Load the data defined in Step 2

        // On click retrieve the corresponding activity and trigger a selection callback
        this.graph.on('node:click', e => {
            if (this.store.state.activityClickedCallback) this.store.state.activityClickedCallback(e.item._cfg.id);
            else this.callbacks.selectionCallback(this.activityMap.get(e.item._cfg.id));
        })

        this.activityMap = new Map();
        for (const activity of missionContent.activities) {
            this.activityMap.set(activity.uuid, activity);
        }

        this.graph.on('node:click', e => {
            console.log(e.item._cfg.id);

        })

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


