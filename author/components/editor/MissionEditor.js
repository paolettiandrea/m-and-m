var MissionEditor = {
    template: `
    <div class="mission-form">
        <b-row>
            <b-col>
                <mission-form :mission-head="missionHead"></mission-form>
            </b-col>
            <b-col>
                <mission-content-editor></mission-content-editor>
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
        'mission-form': MissionHeadForm,
        'mission-content-editor': MissionContentEditor
    }
}