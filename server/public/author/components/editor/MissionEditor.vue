<template>
    <div class="mission-form">
        <mission-form :mission-head="missionHead"></mission-form>
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
            'mission-form': httpVueLoader('/author/components/editor/MissionHeadForm.vue')
        }
    }
</script>

<style scoped>
</style>