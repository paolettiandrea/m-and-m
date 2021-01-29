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
            console.log(this.inputData)
            this.$emit('input-received', areaData.outcome);
        },
        test() {
            console.log("Clicked on a part of the click image that doesn't have any outcome associated with it. Doing nothing.")
        }
    },

    mounted: function(e) {
        $(document).ready(function(e) {
            $('img[usemap]').rwdImageMaps();
            
            $('area').on('click', function() {
                //alert($(this).attr('alt') + ' clicked');
            });
        });
    }


})