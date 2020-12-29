Vue.component('backgroundDinosauri-screen', {
    template: `
<div style="background-image:url(https://ilbolive.unipd.it/sites/default/files/2020-11/dinosaurs-5568806_1280.jpg)">
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
