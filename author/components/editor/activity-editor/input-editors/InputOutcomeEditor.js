export default {
    template: `
        <div>
            <b-list-group>
                <b-list-group-item button v-for="(inputOutcome, index) in inputOutcomeData.outcomes" :key="index"> {{inputOutcome.outcomeType}}</b-list-group-item>
                <b-list-group-item button v-on:click="addOutcome"><b-icon icon="plus"></b-icon></b-list-group-item>
</b-list-group>
        </div>`,

    props: {
        //inputOutcomeData: null
    },

    data() {
        return {
            inputOutcomeData: { outcomes: []}
        }
    },

    methods: {
        addOutcome() {
            this.inputOutcomeData.outcomes.push({
                outcomeType: "popup",
                popupContent: {
                    //
                }
            })
        }
    }
}