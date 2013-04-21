var selectedAbsinthe = new Object();


function calculate() {
    var temper = $("#absinthe-dilute-measure").attr("value") * (($("#absinthe-dilute-begin").attr("value") / $("#absinthe-dilute-final").attr("value"))-1);
    $("#absinthe-dilute-calculation").html("Temper this absinthe with " + temper.toPrecision(3) + " ounces of water.");
}

function clearCalculation() {
    $("#absinthe-dilute-name").html("Absinthe");
    $("#absinthe-dilute-calculation").html("");
}
    
function escapeFilter(s) {
    var t = s.replace("\"", "&#39;");
    return t.replace("\'", "&#39;");
}

function onBodyLoad() {
   document.addEventListener("deviceready", onDeviceReady, false);
}
 
function onDeviceReady() {
    checkDB();
    //dropTables();
}
    
$(document).bind("mobileinit", function () {
    $.support.cors = true;
    $.mobile.touchOverflowEnabled = true;
    $.mobile.allowCrossDomainPages = true;
    $.mobile.loadingMessage = "Loading...";
    $.mobile.pageLoadErrorMessage = "Error Loading Data";
    $.mobile.page.prototype.options.backBtnTheme = "b";
    $.mobile.page.prototype.options.backBtnText = "Back";
    $.mobile.defaultPageTransition = 'none';
    $.mobile.loadingMessageTextVisible = true;
    $.mobile.pushStateEnabled = false;

    $.extend($.mobile, {
        defaultPageTransition: 'none'
    });
});

function absintheClicked(t){
    selectedAbsinthe.id = $(t).attr("data-id");
    selectedAbsinthe.name = $(t).attr("data-name");
    selectedAbsinthe.abv = $(t).attr("data-abv");
    selectedAbsinthe.notes = $(t).attr("data-notes");
    
    console.log(selectedAbsinthe);
    
    $("#absinthe-id-update").attr("value", $(t).attr("data-id"));
    $("#absinthe-name-update").attr("value", $(t).attr("data-name"));
    $("#absinthe-abv-update").attr("value", $(t).attr("data-abv"));
    $("#absinthe-notes-update").html($(t).attr("data-notes"));
    
    $("#absinthe-dilute-name").html($(t).attr("data-name"));
    $("#absinthe-dilute-begin").attr("value", $(t).attr("data-abv"));
}