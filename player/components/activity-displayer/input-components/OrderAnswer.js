var myObj ='{"opzioni" : [ "opzione1", "opzione2", "opzione3", "opzione4"],"risposta" : "opzione2 opzione1 opzione3 opzione4"}';
var jsonFile = JSON.parse(myObj);
//var counter = 0;
//var divRispostaData;
var myDiv = console.log(document.getElementById("content"));

Vue.component('order-answer', {
    template: `
    <div>
      <div v-bind:id="content"></div>
          <button v-bind:id="hello"
          v-on:click="vai">Click me</button>
          <div v-bind:id="rispostaCorretta"></div>
          <div v-bind:id="rispostaDataDiv"></div>
      </div>
    `,

    props:
    {
      'counter': {
        type: Number,
        default: 0
      },
      'rispostaData':{
        type:String,
        default: null
      },
      'divRispostaData':{
        type:String,
        default: null
      },
      'rispostaGiusta':{
        type:String,
        default: null
      }
    },
    methods:{
      vai(){
        for (var i = 0; i < jsonFile.opzioni.length; i++) {
          var btn = console.log(document.createElement("BUTTON"));
          btn.id = "idDelButton";
          btn.innerHTML =
            "<div id='" +
            jsonFile.opzioni[i] +
            "'>" +
            jsonFile.opzioni[i] +
            "</div>";
          myDiv.append(btn);
        }

      //  var rispostaData = " ";
        //var
        this.rispostaGiusta = jsonFile.risposta;
        this.divRispostaData = console.log(document.getElementById("rispostaDataDiv"));
      
        $(function () {
          $(document).on("click", "#idDelButton", function () {
            //$(this).prop("disabled", true);
            this.counter++;
            var divIdTipoQuattro = event.srcElement.id;
            this.rispostaData += divIdTipoQuattro + " ";
            this.divRispostaData.innerHTML = this.rispostaData;
            if (this.counter == jsonFile.opzioni.length) {
              check();
            }
          });
        });
      },

      check(){
        if (this.rispostaGiusta === this.divRispostaData.innerHTML) alert("OK!");
        else alert("NOT OK!");
      }
    }

})
