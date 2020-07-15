import { v1 as uuidv1} from '/uuid/dist/esm-browser/index.js';


function buildGraphData(missionContent) {
    var data = {
        nodes: [],
        edges: []
    };

    for (const activity of Object.values(missionContent.activities)) {
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
        console.log(outcome);
        console.log(outcome.edgeId);
        var newEdge = {
            id: outcome.edgeId,
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

const EDGE_SPLIT_DISTANCE = 30;
const NODE_WIDTH = 100;
const NODE_HEIGHT = 20;
const EDGE_TURNAROUND_PADDING = 20;
const ARRIVAL_DIStANCE = 35;

const ANGLE_DIST = 10;

// Layout
const VERTICAL_DISTANCE = EDGE_TURNAROUND_PADDING;
const HORIZONTAL_DISTANCE = EDGE_TURNAROUND_PADDING*2;

function makeEdgePath(startPoint, endPoint) {
    if (startPoint.y > endPoint.y - EDGE_SPLIT_DISTANCE - ANGLE_DIST) {    // The edge should do some sort of turnaround since the endPoint is higher
        var hSign = Math.sign(startPoint.x - endPoint.x) || -1;     // Defaults to left turnaround if on the same y axis

        var turnaroundX = startPoint.x + (NODE_WIDTH/2+EDGE_TURNAROUND_PADDING)*hSign;
        var topY = Math.min(startPoint.y - NODE_HEIGHT, endPoint.y) - ARRIVAL_DIStANCE;
        return [
            ['M', startPoint.x, startPoint.y],
            ['L', startPoint.x, startPoint.y + EDGE_SPLIT_DISTANCE - ANGLE_DIST],
            ['L', startPoint.x + ANGLE_DIST*hSign, startPoint.y + EDGE_SPLIT_DISTANCE],
            ['L', turnaroundX - ANGLE_DIST*hSign, startPoint.y + EDGE_SPLIT_DISTANCE],
            ['L', turnaroundX, startPoint.y + EDGE_SPLIT_DISTANCE - ANGLE_DIST],
            ['L', turnaroundX, topY + ANGLE_DIST],
            ['L', turnaroundX - ANGLE_DIST*hSign, topY],
            ['L', endPoint.x + ANGLE_DIST*hSign, topY],
            ['L', endPoint.x, topY + ANGLE_DIST],
            ['L', endPoint.x, endPoint.y],
        ]


    } else {
        let vSign = 1;
        if (Math.abs(startPoint.x - endPoint.x) < ANGLE_DIST*2) {
            hSign = (startPoint.x - endPoint.x) / (ANGLE_DIST*2);
            vSign = Math.abs(hSign);
        } else {
            var hSign = Math.sign(startPoint.x - endPoint.x);
        }
        return [
            ['M', startPoint.x, startPoint.y],
            ['L', startPoint.x, endPoint.y - ARRIVAL_DIStANCE - ANGLE_DIST],
            ['L', startPoint.x - ANGLE_DIST*hSign, endPoint.y - ARRIVAL_DIStANCE],
            ['L', endPoint.x + ANGLE_DIST*hSign, endPoint.y - ARRIVAL_DIStANCE],
            ['L', endPoint.x, endPoint.y - ARRIVAL_DIStANCE + ANGLE_DIST * vSign],
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
                lineWidth: 3,
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
    constructor(settings, store) {
        this.callbacks = settings.callbacks;
        this.store = store;
        this.graph = new G6.Graph({
            container: settings.mountId, // String | HTMLElement, required, the id of DOM element or an HTML node
            width: 800, // Number, required, the width of the graph
            height: 400, // Number, required, the height of the graph,
            modes: {
                default: ['drag-canvas', 'drag-node'],
            },
            fitView: true,
            fitCenter: true,
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
                nodesep: HORIZONTAL_DISTANCE,
                ranksep: VERTICAL_DISTANCE,
                controlPoints: true,
                // ...                    // Other configurations for the layout
            },


        });


        // var data = buildGraphData(missionContent);
        // console.log(data);
        // this.graph.data(data); // Load the data defined in Step 2

        // On click retrieve the corresponding activity and trigger a selection callback
        this.graph.on('node:click', e => {
            if (this.store.state.activityClickedCallback) this.store.state.activityClickedCallback(e.item._cfg.id);
            else this.store.dispatch('selectActivity', e.item._cfg.id);
        })

        this.graph.on('canvas:click', e => {
            if (this.store.getters.isActivitySelected) { this.store.dispatch('deselectActivity'); }

        })

        // Double click creates a new activity
        this.graph.on('canvas:dblclick', e => {
            let activityId = this.store.dispatch('createActivity');
        })

        this.graph.on()

        this.graph.render(); // Render the graph
    }

    newData(newMissionContent) {
        var data = buildGraphData(newMissionContent);
        this.graph.changeData(data);
    }

    newActivity(newActivity) {
        this.graph.addItem('node', buildActivityNodeData(newActivity));
    }

    updateActivityNode(activity) {
        let targetNode = this.graph.findById(activity.uuid);
        let nodeData = buildActivityNodeData(activity);
        this.graph.updateItem(targetNode, nodeData);
    }

    // Adds a new edge to the canvas returning its unique id (allowing for retrieval later)
    newEdge(fromActivityId, fromOutcome, toActivityId) {
        var uuid = uuidv1();
        this.graph.addItem('edge', {
            id: uuid,
            source: fromActivityId,
            target: toActivityId,
        })
        fromOutcome.edgeId = uuid;
        return uuid;
    }

    deleteEdge(edgeId) {
        var edge = this.graph.findById(edgeId);
        edge.destroy();
    }
}


