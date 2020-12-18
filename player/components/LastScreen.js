Vue.component('lastScreen-displayer', {
    template: `
<div style="background-image:url(https://img.freepik.com/free-photo/white-parchment-paper_53876-92954.jpg?size=626&ext=jpg)">
   <div style="font-family:American Typewriter; text-align:center; font-style:serif;">
        <transition name="content-slide" mode="out-in">
          <div>
              <h1 style="text-align: center; "> </h1>
                <div>
                <p> Punteggio finale: </p>
                    <p> {{score}} </p>
                </div>
            </div>
        </transition>
        <div> Durante questo percorso avrai imparato diverse cose, tra cui.... </div>
        </div>
        </div>
    `,
    props:
        {
            score:0
        }
})