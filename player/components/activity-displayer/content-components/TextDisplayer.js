Vue.component('text-displayer', {
    template: ` <div>
                    <div :style="{fontFamily: contentData.fontData.fontFamily,
                                  fontSize: 30 + 'px'}" 
                            v-html="this.parsed"></div>
                </div>`,

    props: {
        contentData: null
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
