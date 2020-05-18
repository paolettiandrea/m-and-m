<template>
    <div>
        <b-card class="m-head-card" :title="missionHead.title" :sub-title="missionHead.summary"
                v-on:click="handleSelection" v-on:keyup.enter="handleSelection"
                tabindex="0" role="button">
        </b-card>
    </div>
</template>

<script>
    module.exports = {
        props: {
            missionHead: Object
        },
        methods: {
            handleSelection() {
                this.$emit('mission:selected', this.missionHead);
            }
        }
    }
</script>

<style scoped>
.m-head-card:hover {
    background: beige;
}
</style>