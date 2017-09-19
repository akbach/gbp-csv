// ==UserScript==
// @name         bpnet.gbp.ma CSV
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  télécharger historique des opérations bpnet.gbp.ma en format csv
// @author       Akbach abdelfattah
// @match        https://bpnet.gbp.ma/Compte/Compte
// @grant        none
// ==/UserScript==

function addJQuery(callback) {
  var script = document.createElement("script");
  script.setAttribute("src", "//ajax.googleapis.com/ajax/libs/jquery/1/jquery.min.js");
  script.addEventListener('load', function() {
    var script = document.createElement("script");
    script.textContent = "window.jQ=jQuery.noConflict(true);(" + callback.toString() + ")();";
    document.body.appendChild(script);
  }, false);
  document.body.appendChild(script);
}

function main() {
    $('.download_links').append(' | <a href="#" id="csv_download" style="color:#FFF; background:#854e56; padding:0px 3px; border-radius: 5px;">CSV</a>');
    $("body").on('click',"#csv_download",function(e){
        var csvData = [];
        event.preventDefault();
        $('.dataTable tr').each(function(index,trElm){
            var trData = [];
            $(trElm).find('td').each(function(index,tdElm){
                if(!$(tdElm).hasClass('resume_forMobile')){
                    trData.push($(tdElm).text().replace("\n",' ').trim());
                }
            });
            csvData.push(trData.join(';'));
        });
        var csvStr = csvData.join("\n");
        var file = new Blob([csvStr], {type: 'text/csv'});
        var a = document.createElement("a");
        var url = URL.createObjectURL(file);
        a.href = url;
        a.download = 'compte.csv';
        document.body.appendChild(a);
        a.click();
        setTimeout(function() {
            document.body.removeChild(a);
            window.URL.revokeObjectURL(url);
        }, 0);
    });
}


(function() {
    'use strict';
    addJQuery(main);
})();
