<template>
    <div class="mission-form">
        <transition name="content-slide" mode="out-in">
            <b-form v-if="missionHead" :key="missionHead.uid">
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
    </div>
</template>

<script>
    module.exports = {
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
</script>

<style scoped>

    .mission-form {
        overflow-x: hidden;
    }

    .content-slide-enter-active, .content-slide-leave-active {
        transition: all 0.5s;
    }
    .content-slide-enter, .content-slide-leave-to /* .list-leave-active below version 2.1.8 */ {
        opacity: 0;
        transform: translateX(-100%);
    }
    .content-slide-leave-to {
        opacity: 0;
        transform: translateX(100%);
    }

    .labeled-form-group {
        label-cols: 3
    }

</style>