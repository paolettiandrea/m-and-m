<template>
    <div class="mission-form">
        <b-row>
            <b-col>
                <mission-form :mission-head="missionHead"></mission-form>
            </b-col>
            <b-col>
                <mission-content-editor></mission-content-editor>
            </b-col>
        </b-row>
    </div>
</template>

<script>
    module.exports = {
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
            'mission-form': httpVueLoader('/author/components/editor/MissionHeadForm.vue'),
            'mission-content-editor': httpVueLoader('/author/components/editor/content-editor/MissionContentEditor.vue')
        }
    }
</script>

<style scoped>
</style>