Vue.component('score-displayer', {
    template: ` <div>
                    <p class=score aria-label="Punteggio">Punteggio: {{score}}</p>
                </div> `,

    props: {
        //contentData: null,
        //defaults: null
        score: 0
    }
})