//get current day and sort array correctly
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
]
var startDay = days[new Date().getDay()];

startDayIndex = days.indexOf(startDay);

// console.log(startDayIndex);
daysShifted = days.splice(0, startDayIndex);

// console.log(daysShifted);
days = days.concat(daysShifted);

//now the days should be sorted from current day
$("#day0").text(days[0]);
$("#day1").text(days[1]);
$("#day2").text(days[2]);
$("#day3").text(days[3]);
$("#day4").text(days[4]);
$("#day5").text(days[5]);
$("#day6").text(days[6]);

var mealCount = [0, 0, 0, 0, 0, 0, 0]; //number of meals per day, index relative to "days" array

//create arrays for handling meal and notes data
var mealPlan = [];
var notes = ["","","","","","",""];
if (localStorage.getItem("mealPlan") === null) { //get meals if there are any in localStorage to load them on the page
  localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
  mealPlan = JSON.parse(localStorage.getItem("mealPlan"));
} else {
  mealPlan = JSON.parse(localStorage.getItem("mealPlan"));
}
if (localStorage.getItem("notes") === null) { //get notes if there are any in localStorage to load them on the page
  localStorage.setItem("notes", JSON.stringify(notes));
  notes = JSON.parse(localStorage.getItem("notes"));
} else {
  notes = JSON.parse(localStorage.getItem("notes"));
}

mealPlan.forEach(function (meal) {
  addToCalendar(meal); //add newly loaded meals to the calendar
});

for(var i = 0; i<7; i++){
  $("#notes" + i).val(notes[i]); //add newly loaded notes to the calendar
}

$("#clearBtn").click(function (event) {
  event.preventDefault();
  mealPlan = [];
  localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
  for (var i = 0; i < 7; i++) {
    $("#pday" + i).empty();
    mealCount[i] = 0;
    $("#day" + i).text(days[i]);
  }
});

$("#recipeBtn").on("click", function (event) {
  event.preventDefault();
  $("#mealbtn").empty();
  $("#recipeinfo").empty();
  //Make notif early and append later when we need to
  var notif = $("<div>")
    .attr("id", "notifDiv")
    .addClass("notification is-link is-light columns")
    .text("Choose a Day to Place Recipe ");
  $("<button>").addClass("delete").appendTo(notif);
  var daySelect = $("<div>").addClass("select is-warning").appendTo(notif);
  var select = $("<select>")
    .attr("id", "chosen")
    .addClass("column")
    .appendTo(daySelect);
  $("<option>").text("Monday").attr("value", "Monday").appendTo(select);
  $("<option>").text("Tuesday").attr("value", "Tuesday").appendTo(select);
  $("<option>").text("Wednesday").attr("value", "Wednesday").appendTo(select);
  $("<option>").text("Thursday").attr("value", "Thursday").appendTo(select);
  $("<option>").text("Friday").attr("value", "Friday").appendTo(select);
  $("<option>").text("Saturday").attr("value", "Saturday").appendTo(select);
  $("<option>").text("Sunday").attr("value", "Sunday").appendTo(select);
  $("<button>", { text: "Confirm Date" })
    .addClass("button is-warning confirmdate column")
    .appendTo(notif);
  //finish making notif for later use

  //keys:
  //7f70f995f82545cbaa83258381c1bff9
  //3c48ac9f4fb24f0da8619831bed373c0
  var apikey = "7f70f995f82545cbaa83258381c1bff9";
  var recipeInput = $("#recipeinput").val();
  var queryURL =
    "https://api.spoonacular.com/recipes/complexSearch?apiKey=" +
    apikey +
    "&query=" +
    recipeInput +
    "&addRecipeNutrition=true&number=10";
  console.log(recipeInput);
  //&sort=calories&sortDirection=asc

  $.ajax({
    url: queryURL,
    method: "GET",
  }).then(function (response) {
    $("#recipeinfo").empty();
    console.log(response);

    //dynamically create buttons for each recipe to choose from
    for (var i = 0; i < 5; i++) {
      var recipeCalories = response.results[i].nutrition.nutrients[0].amount;
      var recipeCaloriesPerc =
        response.results[i].nutrition.nutrients[0].percentOfDailyNeeds;
      var recipeIMG = response.results[i].image;
      var recipeName = response.results[i].title;
      var recipeURL = response.results[i].sourceUrl;
      var recipeIngredients = JSON.stringify(
        response.results[i].nutrition.ingredients
      );
      var recipeResults = response.results[i];

      //once they choose a recipe, dynamically create the nutirition info, recipes steps, and ingredients
      $("<button>", {
        html:
          "<strong>" +
          recipeName +
          "</strong>" +
          "   -   " +
          recipeCalories +
          "Cal",
      })
        .addClass("button is-success is-light recipebuttons")
        .attr("value", [i])
        .appendTo("#mealbtn");
    } //end for loop

    ////////////////////////////////////////
    var nutritionDiv = $("<div>")
      .addClass("nutritionDiv")
      .appendTo("#recipeinfo");

    $(".recipebuttons").on("click", function () {
      var v = $(this).attr("value");
      var recipeCalories = response.results[v].nutrition.nutrients[0].amount;
      var recipeCaloriesPerc =
        response.results[v].nutrition.nutrients[0].percentOfDailyNeeds;
      var recipeIMG = response.results[v].image;
      var recipeName = response.results[v].title;
      var recipeURL = response.results[v].sourceUrl;
      var recipeIngredients = JSON.stringify(
        response.results[v].nutrition.ingredients
      );

      nutritionDiv.empty();
      //dynamically append that info to the DOM
      $("<p>")
        .html("<strong>Recipe Name: </strong>" + recipeName)
        .appendTo(nutritionDiv);
      $("<p>")
        .html("<strong>Recipe Calories: </strong>" + recipeCalories)
        .appendTo(nutritionDiv);
      $("<p>")
        .html("<strong>% of Daily Cal: </strong>" + recipeCaloriesPerc)
        .appendTo(nutritionDiv);
      $("<img>")
        .attr("src", recipeIMG)
        .addClass("column")
        .appendTo(nutritionDiv);
      $("<a>")
        .text("Link to Recipe")
        .attr("href", recipeURL)
        .attr("target", "_blank")
        .appendTo(nutritionDiv);
      $("<button>", { text: "Choose Recipe" })
        .addClass("button is-dark pickrecipe")
        .addClass("column")
        .appendTo(nutritionDiv);
      nutritionDiv.addClass("nutrBorder");

      //event listener for pick a recipe
      $(".pickrecipe").on("click", function () {
        // console.log("You Picked a Recipe!");
        var mealChosen = response.results[v];
        var meal = {
          name: mealChosen.title,
          link: mealChosen.sourceUrl,
          calories: mealChosen.nutrition.nutrients[0].amount,
          percent: mealChosen.nutrition.nutrients[0].percentOfDailyNeeds,
          dayIndex: 0,
        };
        console.log("You Picked a Recipe!");
        console.log(meal);

        notif.appendTo($("#mealbtn"));

        function restructureDays() {
          $("option").each(function (i) {
            $(this).text(days[i]).attr("value", days[i]);
            // console.log($(this).text());
          });
        }
        restructureDays();

        $(".delete").on("click", function (event) {
          event.preventDefault();
          notif.remove();
        }); //end delete button event listener

        $(".confirmdate").on("click", function (event) {
          event.preventDefault();

          var dateChosen = $("#chosen option:selected").val();

          console.log(dateChosen);
          meal.dayIndex = days.indexOf(dateChosen);
          console.log(meal.dayIndex);
          mealPlan.push(meal); //add meal object to our mealPlan array
          localStorage.setItem("mealPlan", JSON.stringify(mealPlan)); //store the updated array in localStorage
          addToCalendar(meal);
          $(this).parent().remove();
        });
      }); //end event listener for pick recipe
    }); //end event listener for recipe options
  }); //ajax closers
}); //recipeBtn click closers

$("#emailBtn").click(function (event) {
  event.preventDefault();
  var apiKey = "1c11c9eb7b6dc935f81409e69895f7dc";
  var queryUrl = "http://apilayer.net/api/check?access_key=";
  var email = $("#emailForm").val(); //use a selector to get their email from a text box once this is working
  var daysText = []; //text for each individual day, each element being a string with "[day name]: [recipes]"
  days.forEach(function (day) {
    daysText.push(day + ": \n");
  });
  var msg = ""; //the full body of the email
  mealPlan.forEach(function (meal) {
    daysText[meal.dayIndex] +=
      "\n" + meal.name + " | " + meal.percent + "% D/V";
  });
  daysText.forEach(function (day) {
    msg += day + "\n\n\n";
  });
  console.log(msg);
  $.ajax({
    url: queryUrl + apiKey + "&email=" + email,
    dataType: "jsonp"
  }).then(function(response){
    console.log(response);
    if(response.format_valid){
      $("#emailLabel").text("Email");
      window.open("mailto:" + email + "?subject=Meal%20Plan&body=" + encodeURI(msg));
    }
    else{
      $("#emailLabel").text("Error: Invalid email");
    }
  });
});

function addToCalendar(meal) {
  var day = "#day" + meal.dayIndex;
  var pday = "#pday" + meal.dayIndex;
  console.log(pday);
  var hundred = 100 - meal.percent;
  var delbtn = $("<button>").addClass("delete");
  var itemEl = $("<div>")
    .attr("class", "columns nutrBorder")
    .attr("id", meal.name)
    .html(
      "<p>" +
        meal.name +
        "<br/><a href=" +
        meal.link +
        ">" +
        meal.link +
        "</a><br/>" +
        meal.calories +
        " - Calories <br/>" +
        meal.percent +
        " - % of Daily Calories <br/>" +
        hundred +
        " - % of Daily Left</p>"
    )
    .append(delbtn);
  $(pday).append(itemEl);
  console.log("appended");
  mealCount[meal.dayIndex]++;
  $(day).text(days[meal.dayIndex] + " (" + mealCount[meal.dayIndex] + ")");
  delbtn.click(function () {
    mealPlan.splice(mealPlan.indexOf(meal), 1); //remove the meal from the mealplan array
    localStorage.setItem("mealPlan", JSON.stringify(mealPlan));
    mealCount[meal.dayIndex]--;
    if (mealCount[meal.dayIndex] <= 0) {
      $(day).text(days[meal.dayIndex]);
    } else {
      $(day).text(days[meal.dayIndex] + " (" + mealCount[meal.dayIndex] + ")");
    }
    $(this).parent().remove();
  });
}

for(var i=0; i<7; i++){ //add input listeners to the notes boxes
  $("#notes" + i).on("input", function(){
    notes[parseInt($(this).data("num"))] = $(this).val();
    localStorage.setItem("notes", JSON.stringify(notes));
  });
}
