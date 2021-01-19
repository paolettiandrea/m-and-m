Vue.component('lastScreen-displayer', {
    template: `
<div class="lastscreenbackground" style="height:100%; background-image:url(https://c.wallhere.com/photos/39/ae/dinosaurs_Brachiosaurus_Stegosaurus_Triceratops_Pterodactyl-290781.jpg!d)">
   <div style="font-family:American Typewriter; text-align:center; font-style:serif; text-color:black;">
        <transition name="content-slide" mode="out-in">
          <div style=" margin: 30px;
                       background-color: #ffffff;
                       border: 1px solid black;
                       opacity: 0.6;">
              <h1 style="text-align: center; "> </h1>
              <div style=" margin: 5%;
                           font-weight: bold;
                           color: #000000;">
                <p> Punteggio finale: </p>
                <p> {{score}} </p>
              </div>
            </div>
        </transition>
        <div style=" margin: 5%;
                     font-weight: bold;
                     color: #000000;"> Durante questo percorso avrai imparato diverse cose, tra cui.... </div>
        </div>
        </div>
    `,
    props:
    {
      score:0
    }
})
