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

Vue.component('confirm-button', {
    template: `<div>
        <b-button :variant="variant" @click="showModal">
            <b-icon :icon="icon"></b-icon>
        </b-button>
        <b-modal :ref="modalId" hide-footer title="Conferma l'operazione">
            <p class="editor-text"> {{confirmPrompt}}</p>
            <b-button :variant="confirmVariant" @click="confirmedCallback">Conferma</b-button>
            <b-button :variant="cancelVariant" @click="cancelCallback">Annulla</b-button>
        </b-modal>
    </div>`,

    props: {
        icon: "",
        confirmPrompt: "",
        swapVariant: false,
        variant: {default: 'primary'}
    },

    computed: {
        modalId() {
            return "confirm-button-" + this.key;
        },


        confirmVariant() {
            if (this.swapVariant) { return "danger"} else { return "primary"};
        },
        cancelVariant() {
            if (!this.swapVariant) { return "danger"} else { return "primary"};
        }

    },

    methods: {
        showModal() {
            this.$refs[this.modalId].show();
        },
        confirmedCallback() {
            console.log("Cancel confirmed")
            this.$emit('confirmed')
            this.$refs[this.modalId].hide();
        },
        cancelCallback() {
            this.$refs[this.modalId].hide();
        }
    }

})