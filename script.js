//get current day and sort array correctly
var days = [
  "Sunday",
  "Monday",
  "Tuesday",
  "Wednesday",
  "Thursday",
  "Friday",
  "Saturday",
];
var startDay = days[new Date().getDate()];
startDayIndex = days.indexOf(startDay);
console.log(startDayIndex);
daysShifted = days.splice(0, startDayIndex);
console.log(daysShifted);
days = days.concat(daysShifted);
//now the days should be sorted from current day
$("#day0").text(days[0]);
$("#day1").text(days[1]);
$("#day2").text(days[2]);

$("#recipeBtn").on("click", function (event) {
  event.preventDefault();
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
      $("<button>", { text: recipeName + "   -   " + recipeCalories + "Cal" })
        .addClass("button is-danger recipebuttons")
        .attr("value", [i])
        .appendTo("#recipeinfo");
    } //end for loop

    ////////////////////////////////////////
    var nutritionDiv = $("<div>").addClass("container").appendTo("#recipeinfo");

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
        .text("Recipe Name: " + recipeName)
        .appendTo(nutritionDiv);
      $("<p>")
        .text("Recipe Calories: " + recipeCalories)
        .appendTo(nutritionDiv);
      $("<p>")
        .text("% of Daily Cal: " + recipeCaloriesPerc)
        .appendTo(nutritionDiv);
      $("<img>").attr("src", recipeIMG).appendTo(nutritionDiv);
      $("<a>")
        .text("Link to Recipe")
        .attr("href", recipeURL)
        .attr("target", "_blank")
        .appendTo(nutritionDiv);
      $("<button>", { text: "Choose Recipe" })
        .addClass("button is-dark pickrecipe")
        .appendTo(nutritionDiv);

      //event listener for pick a recipe
      $(".pickrecipe").on("click", function () {
        console.log("You Picked a Recipe!");
        var notif = $("<div>")
          .addClass("notification is-link is-light")
          .text("Choose a Day to Place Recipe");
        $("<button>").addClass("delete").appendTo(notif);

        var daySelect = $("<div>")
          .addClass("select is-warning")
          .appendTo(notif);
        var select = $("<select>").attr("id", "chosen").appendTo(daySelect);
        $("<option>").text("Monday").attr("value", "Monday").appendTo(select);
        $("<option>").text("Tuesday").attr("value", "Tuesday").appendTo(select);
        $("<option>")
          .text("Wednesday")
          .attr("value", "Wednesday")
          .appendTo(select);
        $("<option>")
          .text("Thursday")
          .attr("value", "Thursday")
          .appendTo(select);
        $("<option>").text("Friday").attr("value", "Friday").appendTo(select);
        $("<option>")
          .text("Saturday")
          .attr("value", "Saturday")
          .appendTo(select);
        $("<option>").text("Sunday").attr("value", "Sunday").appendTo(select);
        $("<button>", { text: "Confirm Date" })
          .addClass("button is-warning confirmdate")
          .appendTo(notif);

        notif.appendTo(nutritionDiv);

        function restructureDays() {
          $("option").each(function (i) {
            $(this).text(days[i]).attr("value", days[i]);
            console.log($(this).text());
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
        });
      }); //end event listener for pick recipe
    }); //end event listener for recipe options
  }); //ajax closers
}); //recipeBtn click closers
