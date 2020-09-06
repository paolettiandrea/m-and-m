export default {
    template: `
    <div class="mission-form">
        <transition name="content-slide" mode="out-in">
            <b-form v-if="missionHead">
                <b-form-group class="labeled-form-group" label="Title" label-for="title-input" label-cols="3">
                    <b-form-input id="title-input"
                                  v-model="missionHead.title"
                                  :state="stringLenghtValidation('title')"
                                  type="text"
                    ></b-form-input>
                    <b-form-invalid-feedback v-if="schema">
                        The title needs to be between {{schema.title.minLength}} and {{schema.title.maxLength}} characters.
                    </b-form-invalid-feedback>
                </b-form-group>
                <b-form-group label="Summary" label-for="title-input" label-cols="3">
                    <b-form-input id="title-input"
                                  v-model="missionHead.summary"
                                  :state="stringLenghtValidation('summary')"
                                  type="text"
                    ></b-form-input>
                    <b-form-invalid-feedback v-if="schema">
                        The summary needs to be between {{schema.summary.minLength}} and {{schema.summary.maxLength}} characters.
                    </b-form-invalid-feedback>
                </b-form-group>
            </b-form>
            <p v-else> Select a mission to start editing </p>
        </transition>
    </div>`,

    props: {
        missionHead: Object,
        pippo: String
    },

    data() {
        return {
            schema: null,
            validationEnabled: false
        }
    },

    methods: {
        stringLenghtValidation(propertyName) {
            if (this.validationEnabled) {
                return this.schema[propertyName].minLength < this.missionHead[propertyName].length
                    && this.schema[propertyName].maxLength > this.missionHead[propertyName].length
            }
            return null;
        }
    },

    computed: {
    },

    mounted() {
        axios.
        get("/api/schema").
        then(res => {
            this.schema = res.data.components.schemas.missionHead.properties;
            this.validationEnabled = true;
        })
    }
}