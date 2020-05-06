<template>
    <div>
        <h1>Active missions</h1>
        <div v-for="missionHead in availableMissions">
            <mission-head-card :mission-head="missionHead"></mission-head-card>
        </div>

    </div>
</template>

<script>
    module.exports = {
        data() {
            return {
                availableMissions: null
            }
        },
        methods: {
        },
        components: {
            'mission-head-card': httpVueLoader('/author/components/mission-head-card.vue')
        },
        mounted() {
            axios.
                get("/missions")
                .then(res => {
                    this.availableMissions = res.data;
                })
        }
    }
</script>

<style scoped>

</style>