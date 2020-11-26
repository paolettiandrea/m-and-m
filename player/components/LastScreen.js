Vue.component('lastScreen-displayer', {
    template: `
        <body style="background-image: url:("//www.google.com/imgres?imgurl=https%3A%2F%2Fimg.freepik.com%2Ffree-photo%2Fwhite-parchment-paper_53876-92954.jpg%3Fsize%3D626%26ext%3Djpg&imgrefurl=https%3A%2F%2Fit.freepik.com%2Ffoto-vettori-gratuito%2Fpergamena&tbnid=iNyvbZSeM8iB5M&vet=12ahUKEwiD5uqT4KDtAhUwPewKHaDwDMgQMygAegUIARDAAQ..i&docid=2tleApFEMicmuM&w=626&h=417&q=pergamena%20background&ved=2ahUKEwiD5uqT4KDtAhUwPewKHaDwDMgQMygAegUIARDAAQ") ">
        <div align="center" style:"font-family:American Typewriter; font-style:serif;>
        <transition name="content-slide" mode="out-in">
              <h1 style="text-align: center; "> </h1>
                <div>
                <p " > Punteggio finale: </p>
                    <text-displayer :activityContent="this.pointedActivity" :defaults="this.missionData.defaults"
                                            @next:activity="handleNextActivity"></activity-displayer>
                </div>
        </transition>
        <div> Durante questo percorso avrai imparato diverse cose, tra cui.... </div>
        </div>
        </body>
    `
  }
