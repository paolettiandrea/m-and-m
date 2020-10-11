// Vue.component è una funzione che registra un component di vue. 
// Il primo parametro è il nome con cui viene registrato, ovvero il nome che si potrà poi utilizzare come fosse un elemento html (con una sintassi che in questo caso sarebbe <text-displayer contentData=.... ></text-displayer>
// Il secondo parametro è un oggetto che definisce i vari aspetti del componente che vogliamo registrare
Vue.component('text-displayer', {
    // [Vue template] La stringa che vue utilizzerà per generare l'html che infilerà nella pagina al posto del component laddove il component viene utilizzato 
		template: ` <div>
                    <div class="paragraph-container" :style="fontData" 
                            v-html="this.parsed"></div>
                </div>`,

		// [Vue props] I "parametri" del component, sono riferimenti passati del component genitore
    props: {
        contentData: null, 				// I dati che rappresentano i contenuti del ContentComponent, in questo caso per esempio il testo da mostrare e informazioni sul suo stile
        defaults: null 						// I default della missione, se qualche informazione (spesso stili) che dovrebbe essere definita in contentData significa che è da cercare nei default, in questo caso viene poi utilizzata dal component in fontData() per utilizzare gli stili di font di default dove necessario  
    },
		
		// [Vue computed] Funzioni che possono essere poi utilizzate come variabili.
		// Il loro vantaggio è che se qualche variabile che utilizzano viene modificata vengono eseguite nuovamente,
		// fungono quindi da variabili (dipendenti da altre variabili) che si autoaggiornano quando le dipendenze cambiano
		// Per esempio in questo caso se la stringa this.contentData.text cambia la funzione parsed() viene eseguita nuovamente e il suo nuovo output sarâ utilizzato come contenuto html nel template.
    computed: {
				
				// Restituisce la stringa html equivalente alla stringa markdown contenuta in contentData.text
        parsed() {
            var converter = new showdown.Converter();
            return converter.makeHtml(this.contentData.text);
        },
				
				// Restituisce un oggetto contenente informazioni di stile per un font, avendo i campi i nomi corretti può essere usata direttamente come stile (vedi template sopra) 
        fontData() {
						// Questo è un esempio di utility functions contenute in "player/components/activity-displayer/CommonDataUtils.js" che costruisce un oggetto utilizzabile come stile a partire da vari oggetti aventi diversa priorioritâ, 
						// dando la priorioritâ al primo stile, poi al secondo e poi al terzo. Questo permette di non ripetere le informazioni di stile se sono di default. 
						// In tal caso le informazioni di default non saranno presenti in contentData.fontData e saranno cercate in defaults.textFontData (i default della missione), se non sono presenti nemmeno lì
						// saranno presi da uberDefault, oggetto che definisce gli stili base per ogni missione dell'applicazione.
            return buildFontStyle(this.contentData.fontData, this.defaults.textFontData, uberDefaults.textFontData);
        }
    }
})


