const URL_SERVICE = 'https://api.shrtco.de/v2/shorten?url=';

/* funcion que acorta una url dada */
function shortenerUrl() {
   let url = $("#linkToShort").val();

   if (url != '') {
      console.log('call: ' + url);

      if (isValidUrl(url)) {
         axios.get(URL_SERVICE + url)
            .then(function (response) {
               console.log(response.data)
               if (response.data.ok) {
                  let html = $("#linksShortendedList").html();
                  html += '<div class="links-Shortended-List">' +
                        '<div class="origin-link">'+response.data.result.original_link+'</div>' +
                        '<div class="separator-short"></div>' +
                        '<div class="copy-short-link">' +
                        '<div class="short-link">' +
                           '<input id="'+response.data.result.code+'" value="'+response.data.result.short_link+'" class="short-link-hidden">' +
                           '<a href="'+response.data.result.short_link+'" title="'+response.data.result.short_link+'" target="_blank">'+response.data.result.short_link+'</a>' +
                        '</div>' +
                        '<button class="btn-small" type="button" onClick="copyUrlShort(\''+response.data.result.code+'\',this)">Copy</button>' +
                     '</div>' +
                     '</div>';

                  $("#linksShortendedList").html(html).fadeIn('fast');

                  //guardo en local storage
                  saveDataLocalStorage(response.data.result);
               } else {
                  console.log("HA OCURRIDO UN ERROR EN EL WS");
                  alert("HA OCURRIDO UN ERROR EN EL WS");
               }
            })
            .catch(error => console.log(error))
      } else {
         console.log("NO ES UNA URL VALIDA");
         alert("NO ES UNA URL VALIDA");
      }
   } else {
      console.log("DEBE INGRESAR UNA URL");
      alert("DEBE INGRESAR UNA URL");
   }
}

/* funcion que copia la url corta en un link */
function copyUrlShort(code,ele) {
   console.log("code: " + code);

   var copyText = document.getElementById(code);                                       //SET REAL NAME INPUT
   copyText.select();
   copyText.setSelectionRange(0, 99999);                                     //For mobile devices
   document.execCommand("copy");
   $(ele).text("Copied").css("background-color","#4B3F6B");
   console.log("texto copiado: " + copyText.value);
   //alert("texto copiado: " + copyText.value);
}

/* funcion para validar url */
function isValidUrl(url) {
   console.log('url: ' + url);
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
      let obj = localStorage.getItem("listUrlShortened");
      let objTmp;
      if (obj != null) {
         objTmp = JSON.parse(obj);
         objTmp["links"].push({ "code": data.code, "link": data.original_link, "short": data.short_link });
      } else {
         objTmp = { "links": [{ "code": data.code, "link": data.original_link, "short": data.short_link }]};
      }

      localStorage.setItem("listUrlShortened", JSON.stringify(objTmp));
   } else {
      console.log("NO TIENE LOCAL STORAGE");
      return;
   }
}

/* funcion que es llamada al cargar la pagina para cargar la data del local storage si existe */
function getDataLocalStorage() {
   if (window.localStorage) {
      let obj = localStorage.getItem("listUrlShortened");
      let objTmp;
      if (obj != null) {
         objTmp = JSON.parse(obj);
         let html = "";
         for (var i = 0; i < objTmp["links"].length; i++) {
            html += '<div class="links-Shortended-List">' +
                  '<span class="origin-link">'+objTmp["links"][i].link+'</span>' +
                  '<div class="separator-short"></div>' +
                  '<div class="copy-short-link">' +
                     '<div class="short-link">' +
                        '<input id="'+objTmp["links"][i].code+'" class="short-link-hidden" value="'+objTmp["links"][i].short+'">' +
                        '<a href="'+objTmp["links"][i].short+'" title="'+objTmp["links"][i].short+'" target="_blank">'+objTmp["links"][i].short+'</a>' +
                     '</div>' +
                     '<button class="btn-small" type="button" onClick="copyUrlShort(\''+objTmp["links"][i].code+'\',this)">Copy</button>'+
                  '</div>' +
               '</div>';
         }

         $("#linksShortendedList").html(html).fadeIn('fast');
      } else {
         return;
      }
   } else {
      console.log("NO TIENE LOCAL STORAGE");
      return;
   }
}
