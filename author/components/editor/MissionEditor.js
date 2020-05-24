export default {
    template: `
    <div class="mission-form">
        <b-row>
            <b-col>
                
            </b-col>
        </b-row>
        <b-row>
            <b-col v-if="missionHead">
                <div >
                    <mission-content-editor></mission-content-editor>
                </div>
            </b-col>
        </b-row>
    </div>`,

    props: {
        missionHead: Object
    },
    data() {
        return {

        }
    },
    methods: {
    },
    components: {
        'mission-head-form': () => import('./MissionHeadForm.js'),
        'mission-content-editor': () => import('./content-editor/MissionContentEditor.js')
    }
}