export default {
    template: `
    <div v-if="missionHead" id="myContainer">
        <b-card class="m-head-card" :title="missionHead.title" :sub-title="missionHead.summary"
                v-on:click="handleSelection" v-on:keyup.enter="handleSelection"
                tabindex="0" role="button">
                <b-button :id="headFormButId" >asdadd</b-button>
                <b-popover placement="right" triggers="click blur" :target="headFormButId" title="Popover">
                    <template v-slot:title>
                        Info
                    </template>
                    <mission-head-form :mission-head="missionHead"></mission-head-form>
                </b-popover>
        </b-card>
    </div>`,
    data() {
        return {
            showMissionHeadForm: false
        }
    },
    props: {
        missionHead: Object
    },
    components: {
        "mission-head-form": () => import("../editor/MissionHeadForm.js")
    },
    computed: {
        headFormButId() {
            return "head-form-but" + this.missionHead.title;
        }
    },
    methods: {
        handleSelection() {
            this.$emit('mission:selected', this.missionHead);
        }
    }
}