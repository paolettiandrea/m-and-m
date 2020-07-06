Vue.component('text-displayer', {
    template: ` <div>
                    <div :style="{fontFamily: (contentData.fontData.fontFamily || defaults.textFontData.fontFamily),
                                  fontSize: null || defaults.textFontData.fontSize}" 
                            v-html="this.parsed"></div>
                </div>`,

    props: {
        contentData: null,
        defaults: null
    },

    computed: {
        parsed() {
            if (this.contentData.parseMarkdown) {
                var converter = new showdown.Converter();
                return converter.makeHtml(this.contentData.text);
            } else {
                return this.contentData.text;
            }

        }
    }
})
