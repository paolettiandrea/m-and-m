function openQRCamera(node) {
    var reader = new FileReader();
    reader.onload = function() {
      node.value = "";
      qrcode.callback = function(res) {
        if(res instanceof Error) {
          alert("Non riesco a leggere il QR code. Per favore riprova.");
        } else {
          console.log("Code found: ", res);
          node.parentNode.previousElementSibling.value = res;
          window.location.href = "/player?missionId=" + res;
        }
      };
      qrcode.decode(reader.result);
    };
    reader.readAsDataURL(node.files[0]);
  }
  
  function showQRIntro() {
    return confirm("Utilizza la fotocamera per leggere il QR code.");
  }