var Gust;

// export to nodejs or browser window
if(typeof exports != "undefined"){
    Gust = exports;
} else {
    Gust = window.Gust = {};
}

if (typeof define == 'function' && typeof define.amd == 'object' && define.amd) {

    define(function() {
      return Gust;
    });

}

Gust.$ = function(id){
    return document.getElementById(id.substr(1));
};