Vue.component("click-img", {
    template: `
    <div :align="data.pos" >
        <img :src="data.url" alt="Workplace" usemap="#workmap" :width="data.w" :height="data.h" v-on:click="test">

        <map name="workmap">
        <area shape="rect" :coords="data.computer" alt="Computer" v-on:click="imgClick('Computer')">
        <area shape="rect" :coords="data.telefono" alt="Phone" v-on:click="imgClick('iPhone')">
        <area shape="circle" :coords="data.caffe" alt="Cup of coffee" v-on:click="imgClick('Caffè')">
        </map>
    </div>
    `,
    props: {
        data: null
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