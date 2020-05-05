<template>
    <div>
        <form @submit.prevent="handleSubmit">
            <label> Title
                <input v-model="title" type="text">
            </label>
        </form>
    </div>
</template>

<script>
    module.exports = {
        data() {
            return {
                title: ''
            }
        },
        methods: {
            handleSubmit() {
                console.log("Submitting " + this.title)
            }
        }
    }
</script>

<style scoped>

</style>