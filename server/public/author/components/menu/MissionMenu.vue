<template>
    <div>
        <h3>Active missions</h3>
            <div v-for="missionHead in availableMissions" :key="missionHead.uid">
                <mission-head-card :mission-head="missionHead"  @mission:selected="missionSelected"></mission-head-card>
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
            missionSelected(missionHead) {
                this.$emit('mission:selection:changed', missionHead);
            }
        },
        components: {
            'mission-head-card': httpVueLoader('/common/components/MissionHeadCard.vue')
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