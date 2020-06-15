Vue.component('text-displayer', {
    template: `<div><div v-html="this.parsed"></div></div>`,

    props: {
        data: null
    },

    computed: {
        parsed() {
            if (this.data.parseMarkdown) {
                var converter = new showdown.Converter();
                return converter.makeHtml(this.data.text);
            } else {
                return this.data.text;
            }

        }
    }
})
