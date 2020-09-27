// Prefetches all relevant components
function loadScript(script) {

    let myScript = document.createElement("script");
    myScript.setAttribute("src", script);
    myScript.async = true;
    document.body.appendChild(myScript);
}

// Content components
loadScript('./components/activity-displayer/content-components/ImgDisplayer.js');
loadScript('./components/activity-displayer/content-components/TextDisplayer.js');
import('./activity-displayer/content-components/VideoDisplayer.js')
import('./activity-displayer/content-components/CardDisplayer.js')
import('./activity-displayer/content-components/AudioPlayer.js')

// Input components
import('./activity-displayer/input-components/CanvasDraw.js')
import('./activity-displayer/input-components/ClickImg.js')
import('./activity-displayer/input-components/MultipleCheckboxes.js')
import('./activity-displayer/input-components/TextInsert.js')
import('./activity-displayer/input-components/SimpleButton.js')




