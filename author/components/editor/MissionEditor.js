export default {
    template: `
    <div class="mission-form">
        <b-row>
            <b-col>
                <mission-form :mission-head="missionHead"></mission-form>
            </b-col>
            <b-col>
                <div v-if="missionHead">
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
        'mission-form': () => import('./MissionHeadForm.js'),
        'mission-content-editor': () => import('./content-editor/MissionContentEditor.js')
    }
}