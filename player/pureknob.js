//creo la manopola
var myKnob = pureknob.createKnob (300, 300);
//properties
      myKnob.setProperty ('angleStart', -0.75*Math.PI);
      myKnob.setProperty ('angleEnd', 0.75*Math.PI);
      //myKnob.setProperty (angleOffset, offset);
      //myKnob.setProperty (colorBG, black);
      myKnob.setProperty ('colorFG', '#88ff88');
      //myKnob.setProperty (needle, marker);
      //myKnob.setProperty (readonly, false);
      myKnob.setProperty ('trackWidth', 0.4);
      //myKnob.setProperty (textScale, 1.0);
      myKnob.setProperty ('valMin', 0);
      myKnob.setProperty ('valMax', 100);
      //myKnob.setProperty (val, 0);
      //myKnob.setProperty (fnStringToValue, 0);
      //myKnob.setProperty (fnValueToString, 0);

      //valore iniziale
      myKnob.setValue(0);

      //valore di picco
      myKnob.setPeaks([100]);

      //aggiungi un listener davanti alla manopola
      var listener = function(myKnob, value){
        //function listener(myKnob, value){
        console.log(value);
      };
    //  myKnob.addListener.listener();
    myKnob.addListener(listener);

      //creo un elemento node
      var node = myKnob.node();
      //lo aggiungo al DOM
      var elem = document.getElementById('demo')
      elem.appendChild(node);
