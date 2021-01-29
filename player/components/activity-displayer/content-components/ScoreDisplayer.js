Vue.component('score-displayer', {
    template: ` <div>
                    <p class=score>Punteggio: {{score}}</p>
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