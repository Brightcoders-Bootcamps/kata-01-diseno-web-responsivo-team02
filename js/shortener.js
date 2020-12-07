const URL_SERVICE = 'https://api.shrtco.de/v2/shorten?url=';

/* funcion que acorta una url dada */
function shortenerUrl(url) {
   console.log('call');
   if (isValidUrl(url)) {
      axios.get(URL_SERVICE + url)
         .then(response => console.log(response))
         .catch(error => console.log(error))
   } else {
      console.log("NO ES UNA URL VALIDA");
      alert("NO ES UNA URL VALIDA");
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
   var regexp = new RegExp('^(https?:\\/\\/)?' + // protocol
      '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' + // domain name
      '((\\d{1,3}\\.){3}\\d{1,3}))' + // OR ip (v4) address
      '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' + // port and path
      '(\\?[;&a-z\\d%_.~+=-]*)?' + // query string
      '(\\#[-a-z\\d_]*)?$', 'i'); // fragment locator

   return !!regexp.test(url);
}

function saveDataLocalStorage(data) {
   if (window.localStorage) {
      localStorage.setItem("link", data);
   } else {
      console.log("NO TIENE LOCAL STORAGE");
   }
}