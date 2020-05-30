function buildGraphData(missionContent) {
    console.log(missionContent);
    var data = {
        nodes: []
    };

    for (const activity of missionContent.activities) {
        data.nodes.push(buildActivityNode(activity))
    }
    return data;
}

function buildActivityNode(activity) {
    return {
        type: 'modelRect',
        id: activity.title,
        label: activity.title
    }
}

export class CanvasManager {
    constructor(missionContent, settings) {
        console.log("CanvasConstructor");
        this.callbacks = settings.callbacks;
        this.graph = new G6.Graph({
            container: settings.mountId, // String | HTMLElement, required, the id of DOM element or an HTML node
            width: 800, // Number, required, the width of the graph
            height: 500, // Number, required, the height of the graph
            modes: {
                default: ['drag-canvas', 'drag-node'],
            }
        });


        var data = buildGraphData(missionContent);
        this.graph.data(data); // Load the data defined in Step 2

        // On click retrieve the corresponding activity and trigger a selection callback
        this.graph.on('node:click', e => {
            this.callbacks.selectionCallback(this.activityMap.get(e.item._cfg.id));
        })

        this.activityMap = new Map();
        for (const activity of missionContent.activities) {
            this.activityMap.set(activity.title, activity);
        }
        console.log(this.activityMap);

        this.graph.render(); // Render the graph
    }

    newData(newMissionContent) {
        var data = buildGraphData(newMissionContent);
        this.graph.changeData(data);
    }

    newActivity(newActivity) {
        this.graph.addItem('node', buildActivityNode(newActivity));
    }
}


