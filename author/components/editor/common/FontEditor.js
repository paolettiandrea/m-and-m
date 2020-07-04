export default {
    template: `
    <div >
        <div >
        <b-list-group class="font-list">
            <b-list-group-item button href="#" @click="fontSelected(font)" v-for="font in fontDB.fontOrderArray" > 
                <span :style="{ fontFamily: font }">{{font}}</span>
            </b-list-group-item>
            <b-form-input type="number"></b-form-input>
</b-list-group>
</div>
    </div>`,

    props: {
        fontData: null
    },

    computed: {
        ... Vuex.mapGetters(['fontDB'])
    },

    methods: {
        fontSelected(fontName) {
            this.fontData.fontFamily = fontName;
        }
    }



}