Vue.component('backgroundSecondo-screen', {
    template: `
<div style="background-image:url(https://www.storicang.it/medio/2019/12/16/i-santuari-di-poseidone-a-destra-costruito-attorno-al-460-ac-e-di-era-a-sinistra-denominato-anche-basilica-e-risalente-al-530-ac-circa_49f5346a_800x412.jpg)">
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
