var apiKey = "1c11c9eb7b6dc935f81409e69895f7dc";
var queryUrl = "http://apilayer.net/api/check?access_key=";
var emailCheck = "&email=gsonnier3@gmail.com";

$(document).ready(function(){
    
   $.ajax({
       url: queryUrl + apiKey + emailCheck,
       dataType: "jsonp"
   }).then(function(response){
       console.log(response);
   });
});