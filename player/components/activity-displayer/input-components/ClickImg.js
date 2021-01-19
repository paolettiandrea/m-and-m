// TODO funziona con larghezza variabile?
Vue.component("click-img", {
    template: `
    <div style="width: 100%" >
        <img :src="inputData.url" alt="Workplace" usemap="#workmap" style="width:100%" :height="inputData.h" v-on:click="test">

        <map name="workmap">
        <area v-for="areaData in inputData.areas" shape="rect" :coords="areaData.coords" alt="areaData.alt" v-on:click="imgClick(areaData)">
        </map>
    </div>
    `,
    props: {
        inputData: null
    },
    methods: {
        imgClick(areaData) {
            alert("Found area: [" + areaData.alt + "]");
            this.$emit('input-received', areaData.outcome);
        },
        test() {
            alert("No area here");
        }
    }


})