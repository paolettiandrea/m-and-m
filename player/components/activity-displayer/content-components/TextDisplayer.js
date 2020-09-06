Vue.component('text-displayer', {
    template: ` <div>
                    <div class="paragraph-container" :style="fontData" 
                            v-html="this.parsed"></div>
                </div>`,

    props: {
        contentData: null,
        defaults: null
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


