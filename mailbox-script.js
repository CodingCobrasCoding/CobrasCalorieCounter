var apiKey = "1c11c9eb7b6dc935f81409e69895f7dc";
var queryUrl = "http://apilayer.net/api/check?access_key=";
var emailCheck = "&email=gsonnier3@gmail.com";
var msg = "This is the body.";
msg = msg.replace(" ", "%20");


var meals = [] //stores objects with meal name and link to recipe


$(document).ready(function(){
    var days = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"];
    var startDay = days[new Date().getDate()];
    startDayIndex = days.indexOf(startDay);
    console.log(startDayIndex);
    daysShifted = days.splice(0, startDayIndex);
    console.log(daysShifted);
    days = days.concat(daysShifted);
    msg = "";
    for(var j = 0; j<7; j++){
        msg += days[j] + ":\n";
        for(var i = 0; i <3; i++){
            var meal = {name: "Tacos", link: "https://www.google.com"};
            meals.push(meal); //populates meals with 7 blank objects
            msg += "\n" + meal.name + " | " + meal.link + "\n";
        }
        msg+="\n\n\n";
    }
    console.log(meals);
    msg += "\n\n\n";
    
    window.open("mailto:gsonnier3@gmail.com?subject=Test&body=" + encodeURI(msg));
    // console.log(encodeURI(JSON.stringify(meals)));
    // window.open("mailto:gsonnier3@gmail.com?subject=Test&body=" + encodeURI(JSON.stringify(meals)));
        //code for using the mailbox api
//    $.ajax({
//        url: queryUrl + apiKey + emailCheck,
//        dataType: "jsonp"
//    }).then(function(response){
//        console.log(response);
//        window.open("mailto:gsonnier3@gmail.com?subject=Test&body=" + msg);
//    });

    function restructureDays(){
        $("option").each(function(i){
            $(this).text(days[i]).attr("value", days[i]);
        });
    }
});