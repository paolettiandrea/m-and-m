**Indice**:
* [TODO](pages/todos.md)
* [Author todos](https://trello.com/b/WmFyaZqN/author-todos)
* Storie
    * [Musica nel mondo](pages/storie/musica-nel-mondo.md)  
    * [Un'altra storia](pages/storie/nuova-missione.md)
    * [Uncharted](pages/storie/pseudo-uncharted.md)
## Bacheca temporanea
Dove segnare note a caso e robe di cui parlare all'incontro successivo

- Tipo bacheca di trello per l'implementazione dei component?
- Organizzarsi su come usarei branch git


# Player
Dal punto di vista dell'utente in seguito alla scelta di una missione (attraverso il puntamento ad un QRcode) il player permette di riprodurre quest'ultima. Il giocatore, partendo dall'attività iniziale avanzerà di attività in attività fino a raggiungere un'attività conclusiva, che terminerà la missione. Al termine sarà visualizzato un qualche tipo di punteggio o classifica, durante il gioco sarà possibile interagire con il supervisore.

## Caricamento di una missione
In seguito alla scelta di una missione viene mandata al server una richiesta API con struttura `/player/?missionId=<id_della_missione>`, la cui risposta sarà un oggetto contenente tutti i dati necessari per riprodurre la missione, denominato `missionContent`.

## Struttura di una missione
Una missione è costituita da una singola **attività iniziale** (quella che il giocatore si troverà di fronte all'apertura) e da un numero arbitrario di altre attività. Ogni attività definisce a livello del componente di input (vedi [qui](#inputcomponents)) una o più altre **attività successive**, oppure se non definisce attività successive viene considerata una **attività conclusiva**, che termina la missione.

Tali informazioni sono rappresentate come segue:

```js
var missionContent = {
	defaults: {}					// I default di una missione, contenete informazioni che i content/input component possono utilizzare come fallback
	activities: {					// Oggetto che contiene tutte le attività della missione, identificandole con un id univoco o con "initial" per l'attività iniziale della missione
		initial: {...},			
		unique_id1: {...},
		unique_id2: {...}
	}
}
```

## Struttura di una attivià
Una attività consiste in una schermata di gioco in cui viene mostrato un qualche tipo di contenuto
e un qualche tipo di input che permetta la progressione all'attività successiva (o il termine della missione).

```js
var someActivity = {
	title: "some title",		// Un titolo utilizzato dall'autore per identificare l'attività
	content: [...],					// array che contiene i dati per tutti i componenti di contenuto dell'attività nell'ordine in cui devono essere presentati
	inputComponent: {...}		// dati per il componente di input che verrà mostrato in fondo alla schermata
}
```

### ContentComponents
Sono componenti che mostrano un qualche tipo di contenuto non interattivo, sono rappresentati con la seguente struttura base:
```c
var someContentData = {
	contentType: "some-content-type",		// Nome con cui è stato registrato il componente a cui sono destinati questi dati, l'ActivityDisplayer provvederà a istanziarlo e a passargli i dati seguenti
	contentData: {},										// Tutti i dati necessari per questo componente nello specifico
	commonData: {}											// Tutti i dati che caratterizzano un componente di contenuto/input qualsiasi (come padding, colore sfondo e simili)
}
```

#### Implementazione

Per il momento vedi `player/components/activity-displayer/content-components/TextDisplayer.js` per un po' di commenti sull'implementazione 

### InputComponents
Sono componenti che permettono un qualche tipo di interazione, potenzialmente causando il passaggio ad un altra attività, l'apparizione di un popup o la terminazione della missione.

Sono rappresentati con la seguente struttura base (in maniera simile ai `ContentComponents`):

```js
var someContentData = {
	inputType: "some-input-type",			// Nome con cui è stato registrato il componente a cui sono destinati questi dati, l'ActivityDisplayer provvederà a istanziarlo e a passargli i dati seguenti
	inputData: {},										// Tutti i dati necessari per questo componente nello specifico
	commonData: {}										// Tutti i dati che caratterizzano un componente di contenuto/input qualsiasi (come padding, colore sfondo e simili)
}
```