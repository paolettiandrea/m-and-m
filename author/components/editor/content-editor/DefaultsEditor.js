
export default {
    template: `
    <div >
        <p>default settings</p>
    </div>`,

    computed: {

    },

    props: {
        missionDefaults: null
    },

    data() {
        return {
            metaDefaults: {
                textFontData: {
                    fontFamily: "Roboto",
                    fontSize: "12px"
                }
            }
        }
    },

    methods: {
    },


}