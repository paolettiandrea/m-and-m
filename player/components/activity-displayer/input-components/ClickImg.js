Vue.component("click-img", {
    template: `
    <div :align="inputData.pos" >
        <img :src="inputData.url" alt="Workplace" usemap="#workmap" :width="inputData.w" :height="inputData.h" v-on:click="test">

        <map name="workmap">
        <area shape="rect" :coords="inputData.computer" alt="Computer" v-on:click="imgClick('Computer')">
        <area shape="rect" :coords="inputData.telefono" alt="Phone" v-on:click="imgClick('iPhone')">
        <area shape="circle" :coords="inputData.caffe" alt="Cup of coffee" v-on:click="imgClick('Caffè')">
        </map>
    </div>
    `,
    props: {
        inputData: null
    },
    methods: {
        imgClick(x) {
            alert(x);
        },
        test() {
            alert("NO");
        }
    }


})