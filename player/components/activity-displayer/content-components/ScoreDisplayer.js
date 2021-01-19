Vue.component('score-displayer', {
    template: ` <div>
                    <label>Live score: {{score}}</label>
                </div> `,

    props: {
        //contentData: null,
        //defaults: null
        score: 0
    },

    computed: {
        parsed() {
            var converter = new showdown.Converter();
            return converter.makeHtml(this.contentData.text);
        },
        fontData() {
            return buildFontStyle(this.contentData.fontData, this.defaults.textFontData, uberDefaults.textFontData);
        }
    }
})