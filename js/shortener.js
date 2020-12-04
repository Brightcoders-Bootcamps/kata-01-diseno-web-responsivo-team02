//const fetch = require("node-fetch");
const URL_SERVICE = 'https://cutt.ly/api/api.php?key=3fc4586da4f404ec2b2b63028ba72699f6403&short=';

//shortenerUrl('http://andresubilla.com')

/* funcion que acorta una url dada */
function shortenerUrl(url) {
   if (isValidUrl(url)) {
      $.ajax({
         crossDomain: true,
         crossOrigin: true,
         type: "GET",
         url: URL_SERVICE+url,
         dataType: 'json',
         accepts: "application/json",
         headers: {
            "Access-Control-Allow-Origin":"*",
            "Access-Control-Allow-Credentials":true,
            "Access-Control-Allow-Methods":"GET",
            "Access-Control-Allow-Headers":"Origin, X-Requested-With, Content-Type, Accept",
            'Content-Type': 'application/javascript'
         },
         success: function(response) {
            var jsonData = JSON.parse(response);
            console.log(jsonData)
         },
         error: function() {
            console.log('There was some error performing the AJAX call!');
         }
      })
      /*
      fetch(URL_SERVICE+url, {
         'mode': 'no-cors',
         'headers': {
            'Access-Control-Allow-Origin': '*',
            "Access-Control-Allow-Credentials" : true
         }
      })
      .then((response) => {
         return response.text();
      })
      .then(function(json) {
         console.log(JSON.parse(json))
         if (json.status < 7) {
            console.log("ERROR EN EL SERVICIO: " + json.status)
         } else {
            //console.log("URL SHORT: " + json.url.shortLink)
            //TODO guardar la url en algun lado para persistencia
            //TODO set respuesta en un textbox/label en el template
            //saveDataLocalStorage(json.shortLink);
         }
      })
       */
   } else {
      console.log("NO ES UNA URL VALIDA");
      //alert("NO ES UNA URL VALIDA");
   }
}

/* funcion que copia la url corta en un link */
function copyUrlShort() {
   var copyText = document.getElementById("myInput");                         //SET REAL NAME INPUT
   copyText.select();
   copyText.setSelectionRange(0, 99999);                                     //For mobile devices
   document.execCommand("copy");
   console.log("texto copiado: " + copyText.value);
   //alert("texto copiado: " + copyText.value);
}

/* funcion para validar url */
function isValidUrl(url) {
   var regexp = new RegExp('^(https?:\\/\\/)?'+ // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|'+ // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))'+ // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*'+ // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?'+ // query string
      '(\\#[-a-z\\d_]*)?$','i'); // fragment locator

   return !!regexp.test(url);
}

function saveDataLocalStorage(data) {
   if (window.localStorage) {
      localStorage.setItem("link",data);
   } else {
      console.log("NO TIENE LOCAL STORAGE");
   }
}