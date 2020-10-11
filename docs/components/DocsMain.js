Vue.component('docs-main', {
    template: `<div>
        <p>Main</p>
								<div v-if="this.parsed"
												v-html="this.parsed"></div>
    </div>`,
		
		data() { return {
				parsed: null,
		}},

		mounted() {
				this.loadDocPage("index.md"); 
		},
		
    updated() {
			let links = document.getElementsByTagName("a");
			for (link of links) {
				if (!link.hash) {

					link.addEventListener("click", (ev) => {
						console.log("Custom click event");
						this.loadDocPage(link.origin + link.pathname);
						ev.preventDefault();
					});
				}
			}
			console.log(links);
    },

		methods: {
			loadDocPage(path) {
					axios.
            get(path).
            then(res => {
            var converter = new showdown.Converter({
						});
							console.log(converter.makeHtml(res.data));
            this.parsed = converter.makeHtml(res.data);
						})
			}
		}
})
		
