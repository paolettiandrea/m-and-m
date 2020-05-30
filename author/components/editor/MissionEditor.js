export default {
    template: `
    <div>
        <b-row>
            <b-col v-if="missionContent">
                <div >
                    <mission-content-editor :mission-content="missionContent"></mission-content-editor>
                </div>
            </b-col>
        </b-row>
    </div>`,

    props: {
        missionContent: Object
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