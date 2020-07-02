## Materiali utili

- [Styling dinamico con Vue](https://www.digitalocean.com/community/tutorials/vuejs-dynamic-styles)


# Components

## Data

Ogni component deve avere un prop attraverso cui riceve tutti i dati necessari per il suo funzionamento (`contentData` per i content components e `inputData` per gli input components).

#### Strutture dati comuni

###### Resource

Probabilmente sarà utile avere una rappresentazione uniforme di tutte le risorse "da url", che possono venire da un url di un altro dominio o possono essere state caricate sul server dall'autore, per esempio immagini, font, video... Alcune di queste informazioni sono utili all'ambiente autore, invece ai content/input component il più delle volte dovrebbe bastare l'url.

```json
{
    "url": "some url to the resource",
    "originalName": "if this resource was uploaded on the server here the original file name is stored (used by the author)"
}
```



###### Font

```json
{
    "fontFamily": "font-family-name",
    "size": "12",
    "color": "come rappresentarlo?"
}
```

###### Dimensions

```JSON
{
    "width": 132,
    "height": 123,
}
```

###### BorderStyle

```json
{
    ...
}
```

###### InputOutcome

```json

```



## Content components

Componenti utilizzati nelle schermate attività per mostrare contenuti.

### `text-displayer`

Mostra un paragrafo testuale

*Personalizzazione*:

- Font
  - Family
  - Size
  - Colore
- Allineamento 
- Markdown 



```json
{
    "text": "text content",
    
    "fontData": { },   // FONT 
    "alignment": "right|center|left",
    "markdownText": true|false
}
```



### `img-displayer`

*Personalizzazione*:

- Allineamento ?
- Dimensioni || riempi larghezza

```json
{
	

	"imgResource": {}, // RESOURCE
	

	"alignment": "right|center|left",
	"imgDimensions": {}, // DIMENSIONS
	"imgFillWidth": true|false,
    "imgBorders": {} // BORDERSTYLE
}
```



### `card-displayer` ?





## Input components

Componenti utilizzati nelle schermate attività (uno per schermata) per permettere l'avanzamento della storia.

Questi componenti contengono internamente tutte le informazioni riguardanti l'esito degli input che potrebbero ricevere sotto forma di oggetti `inputOutcome`. Una volta ricevuto un input sta a loro determinare quale di questi oggetti scegliere ed emettere un evento `input-received` avente come payload tale oggetto. Questo sarà recuperato dall' `ActivityDisplayer` e verrà utilizzato per determinare cosa accadrà.

A questi componenti non interessa cosa è contenuto negli `inputOutcome` che hanno a disposizione, ciò viene determinato dall'autore e gestito dall'`ActivityDisplayer`.  Allo stesso modo tali componenti possono aspettarsi di avere a disposizione gli `inputOutcome` e gli ulteriori dati di cui hanno bisogno in una data modalità, anche questo è a carico dell'autore dove tale modalità viene scelta e definita. Il loro compito è in base a questi dati determinare quale di questi outcome "lanciare".

### `text-insert`
"inputType": "text-insert",
"inputData": {
  "correctAnswer": [
      "answer-1":"ciao",
      "answer-2":"ciaone",
      "answer-3":"ciaissimo"
    ],
  "fontData":{
    "family":"verdana",
    "size":"1em",
    "color":"black",
    "background-color":"white"
  },
  "alignment":"center",
  "markdonText":true,

  "wrongOutcome":{

  },

  "rightOutcome":{

  }
}



### `multiple-checkboxes`







