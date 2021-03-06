import { v1 as uuidv1} from '/uuid/dist/esm-browser/index.js';

let graphOffset = {
    x: 0,
    y:0
}

let bufGraphPosition = null;

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

        x: activity.graphPosition.x,
        y: activity.graphPosition.y,



        anchorPoints: [
            [0.5, 0],
            [0.5, 1],
        ],
        labelCfg: {
            style:{
                fill:'#001',
            }
        },
        style: {
            fill: '#d7dadf',
            lineWidth: 2,
            radius: 3,
            width: 125
           
        }
    }
}

function buildSelectedActivityNodeData(activity) {
    var obj = buildActivityNodeData(activity);
    obj.style = {
        fill: '#5B8FF9'
    }
    // obj.labelCfg.style.
    return obj;
}

function buildActivityEdgeData(activity, edgeArray) {

    console.log('Build activity edge data')
    var nextOutcomes = getNextOutcomesFromActivity(activity);
    for (const outcome of nextOutcomes) {
        var newEdge = {
            id: outcome.edgeId,
            source: activity.uuid,
            target: outcome.nextActivityId,
        };
        edgeArray.push(newEdge);
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
            if (lastoutcome.outcomeType === 'next' && lastoutcome.nextActivityId) {
                console.log('Found outcome ', lastoutcome)
                res.push(lastoutcome);
            }
        }
    }

    let buf = []
    recursiveFindFromKey('outcome', activity.inputComponent, buf);
    for (let yo of buf) {
        console.log("YO:", yo);
        if (yo.nextActivityId) { res.push(yo)}
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

let dragBuffer = {
    x: 0, y:0
}

export class CanvasManager {
    constructor(settings, store) {
        this.callbacks = settings.callbacks;
        this.store = store;
        this.selectedActivity = '';
        this.graph = new G6.Graph({
            container: settings.mountId, // String | HTMLElement, required, the id of DOM element or an HTML node
            width: 800, // Number, required, the width of the graph
            height: 400, // Number, required, the height of the graph,
            modes: {
                default: ['drag-canvas', 'drag-node'],
            },
            fitView: true,
            fitCenter: true,
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
        });


        // var data = buildGraphData(missionContent);
        // console.log(data);
        // this.graph.data(data); // Load the data defined in Step 2

        // On click retrieve the corresponding activity and trigger a selection callback
        this.graph.on('node:click', e => {
            let id = e.item._cfg.id;
            if (this.store.state.activityClickedCallback) {this.store.state.activityClickedCallback(id)}
            else {
                this.store.dispatch('selectActivity', id)
            }
        })

        this.graph.on('canvas:click', e => {
            if (this.store.state.activityClickedCallback) this.store.commit('deleteActivityClickedCallback')
            else if (this.store.getters.isActivitySelected) { this.store.dispatch('deselectActivity');
                if (this.selectedActivity) {
                    let deselectedActivity = this.selectedActivity;
                    this.selectedActivity = null;
                    this.updateActivityNode(deselectedActivity)
                }
            }

        })

        this.graph.on('node:dragstart', e => {
            console.log("Drag start", e);


        })
        this.graph.on('node:dragend', e => {
            // FIXME some problem with the offset(now removed), it doesn't save the correct position
            let id = e.item._cfg.id;
            let pos = { x:e.x, y:e.y }
            this.store.dispatch('updateActivityGraphPosition', {pos: pos, id: id});
            console.log(e);
        })

        // Double click creates a new activity
        this.graph.on('canvas:dblclick', e => {
            let mouseCanvasPos = { x: e.x, y: e.y}
            let activityId = this.store.dispatch('createActivity', mouseCanvasPos);
        })

        this.graph.on()
        this.graph.render(); // Render the graph
    }

    newData(newMissionContent) {
        var data = buildGraphData(newMissionContent);
        this.graph.changeData(data);
    }

    newActivity(newActivity) {
        console.log(newActivity);
        this.graph.addItem('node', buildActivityNodeData(newActivity));
    }

    updateActivityNode(activity) {
        let targetNode = this.graph.findById(activity.uuid);
        let nodeData = (this.selectedActivity && activity.uuid===this.selectedActivity.uuid)
                                ? buildSelectedActivityNodeData(activity)
                                : buildActivityNodeData(activity);
        this.graph.updateItem(targetNode, nodeData);
    }

    activitySelectedCallback(activity) {
        let prevSelectedActivity = this.selectedActivity;
        this.selectedActivity = activity;
        this.updateActivityNode(this.selectedActivity)
        if (prevSelectedActivity) this.updateActivityNode(prevSelectedActivity)
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


