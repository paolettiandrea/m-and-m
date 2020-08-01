Vue.component('modeled-button', {
    template: `<b-button @click="onClick" :style="buttonStyle">{{buttonData.label}}</b-button>`,
    props: {
        buttonData: { required: true },
        buttonDefaults: { required: true }
    },
    computed: {
        buttonStyle() {
            return mergeStyleData([
                buildBorderStyle(this.buttonData.buttonBorderData, this.buttonDefaults.buttonBorderData, uberDefaults.buttonData.buttonBorderData),
                buildFontStyle(this.buttonData.labelFontData, this.buttonDefaults.labelFontData, uberDefaults.buttonData.labelFontData),
                buildBackgroundData(this.buttonData.buttonBackgroundData, this.buttonDefaults.buttonBackgroundData, uberDefaults.buttonData.buttonBackgroundData),
            ])
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