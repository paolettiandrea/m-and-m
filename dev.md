## Materiali utili

- [Styling dinamico con Vue](https://www.digitalocean.com/community/tutorials/vuejs-dynamic-styles)





## Content components

Componenti utilizzati nelle schermate attività per mostrare contenuti.

### `text-displayer`

Mostra un paragrafo testuale

*Personalizzazione*: 

- Font
  - Family
  - Size
  - Colore
- Allineamento ?
- Markdown



### `img-displayer`

*Personalizzazione*:

- Allineamento ?
- Dimensioni || riempi larghezza



### `card-displayer` ?





## Input components

Componenti utilizzati nelle schermate attività (uno per schermata) per permettere l'avanzamento della storia.

Questi componenti contengono internamente tutte le informazioni riguardanti l'esito degli input che potrebbero ricevere sotto forma di oggetti `inputOutcome`. Una volta ricevuto un input sta a loro determinare quale di questi oggetti scegliere ed emettere un evento `input-received` avente come payload tale oggetto. Questo sarà recuperato dall' `ActivityDisplayer` e verrà utilizzato per determinare cosa accadrà.

A questi componenti non interessa cosa è contenuto negli `inputOutcome` che hanno a disposizione, ciò viene determinato dall'autore e gestito dall'`ActivityDisplayer`.  Allo stesso modo tali componenti possono aspettarsi di avere a disposizione gli `inputOutcome` e gli ulteriori dati di cui hanno bisogno in una data modalità, anche questo è a carico dell'autore dove tale modalità viene scelta e definita. Il loro compito è in base a questi dati determinare quale di questi outcome "lanciare".

### `text-insert`





### `multi-choice`



