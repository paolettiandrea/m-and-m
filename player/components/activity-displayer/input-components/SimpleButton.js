Vue.component('modeled-button', {
    template: `<b-button :style="buttonStyle">{{buttonData.label}}</b-button>`,
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
    }
})

Vue.component('simple-button', {
    template: `
        <modeled-button :buttonData="inputData.buttonData" :buttonDefaults="defaults.buttonData"></modeled-button>
    `,

    props: {
        inputData: null,
        defaults: null,
    },

    computed: {

    }
})