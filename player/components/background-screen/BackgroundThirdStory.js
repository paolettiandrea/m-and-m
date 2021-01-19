Vue.component('backgroundThird-screen', {
    template: `
<div style="background-image:url(https://www.unb.ca/cel/_assets/images/enrichment/music/workshops-header.jpg)">
   <div style="font-family:American Typewriter; text-align:center; font-style:serif; margin: 30px; backgroundColor: #ffffff; border: 1px solid black; opacity: 0.6;">
        <transition name="content-slide" mode="out-in">
          <div>
              <h1 style="text-align: center; "> </h1>
                <div>
                <p style="margin: 5%; fontWeight: bold; color: #000000;"> domanda </p>
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
