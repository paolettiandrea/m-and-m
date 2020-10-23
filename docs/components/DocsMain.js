Vue.component('docs-main', {
    template: `<div>
		<div v-if="this.parsed" v-html="this.parsed"></div>
    </div>`,
		
	data() { return {
			parsed: null,
	}},

	mounted() {
			this.loadDocPage("pages/index.md");
	},
		
    updated() {
			let links = document.getElementsByTagName("a");
			for (link of links) {
				if (!link.hash) {

					let fullPath = link.origin + link.pathname;
					console.log("O:", link.origin, "\nP: ", link.pathname);

					link.addEventListener("click", (ev) => {

						this.loadDocPage(fullPath);
						ev.preventDefault();
					});
				}
			}
			console.log(links);
    },

		methods: {
			loadDocPage(path) {
				axios.get(path).
					then(res => {
						var converter = new showdown.Converter();
						console.log("Loading page", path);
						this.parsed = converter.makeHtml(res.data);
					})
			}
		}
})
		
