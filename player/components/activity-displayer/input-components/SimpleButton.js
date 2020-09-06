Vue.component('modeled-button', {
    template: `<b-button @click="onClick" :style="buttonStyle">{{buttonData.label}}</b-button>`,
    props: {
        buttonData: { required: true },
        buttonDefaults: { required: true }
    },
    computed: {
        buttonStyle() {
            return buildButtonStyle(this.buttonData, this.buttonDefaults, uberDefaults.buttonData);
        }
    },

    methods: {
        onClick() {
            this.$emit('click')
        }
    }
})

Vue.component('simple-button', {
    template: `
        <modeled-button @click="buttonClicked" :buttonData="inputData.buttonData" :buttonDefaults="defaults.buttonData"></modeled-button>
    `,

    props: {
        inputData: null,
        defaults: null,
    },

    computed: {

    },
    methods: {
        buttonClicked() {
            this.$emit('input-received', this.inputData.outcome)
        }
    }
})