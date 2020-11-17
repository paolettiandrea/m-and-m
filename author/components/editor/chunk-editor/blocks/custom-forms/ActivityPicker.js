Vue.component('activity-picker', {
    template: `
    <div>
        <b-input-group size="sm">
        <template v-slot:prepend>
            <b-button @click="pick"> <b-icon icon="option"></b-icon> </b-button>
        </template>
        <b-form-input class="editor-text" readonly v-if="pickedActivity" v-model="pickedActivity.title">
        </b-form-input>
        <b-form-input readonly v-else >
        </b-form-input>
    </b-input-group>

    </div>`,

    methods: {
        pick() {
            this.$store.commit('addActivityClickedCallback', (id) => {
                if (this.pickedActivity) {
                    this.$store.state.canvas.deleteEdge(this.targetContainer.edgeId);
                }
                this.targetContainer[this.targetFieldName] = id;
                this.$store.state.canvas.newEdge(this.$store.state.selectedActivityId, this.targetContainer, id);

            })
        }
    },

    props: {
        targetContainer: { required: true },
        targetFieldName: { default: 'nextActivityId'}
    },

    computed: {
        ...Vuex.mapGetters(['selectedMissionContent']),

        pickedActivity() {
            return this.selectedMissionContent.activities[this.targetContainer[this.targetFieldName]];
        }
    }
})