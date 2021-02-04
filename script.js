 $("#recipeBtn").on("click", function(event){
    event.preventDefault();

        var apikey = "3c48ac9f4fb24f0da8619831bed373c0";
        var recipeInput = $("#recipeinput").val();
        var queryURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apikey + "&query=" + recipeInput + "&addRecipeNutrition=true&number=10";
        console.log(recipeInput);
        //&sort=calories&sortDirection=asc
       
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
          $("#recipeinfo").empty();
          
        //dynamically create buttons for each recipe to choose from
            for (var i = 0; i < 5; i++) {
            var recipeCalories = response.results[i].nutrition.nutrients[0].amount;
            var recipeCaloriesPerc = response.results[i].nutrition.nutrients[0].percentOfDailyNeeds;
            var recipeIMG = response.results[i].image;
            var recipeName = response.results[i].title;
            var recipeURL = response.results[i].sourceUrl;
            var recipeIngredients = JSON.stringify(response.results[i].nutrition.ingredients);
            var recipeResults = response.results[i];
            console.log(response);
              //once they choose a recipe, dynamically create the nutirition info, recipes steps, and ingredients    
            $("<button>", {text: recipeName + "   -   " + recipeCalories + "Cal"}).addClass("button is-danger recipebuttons").attr("value", [i]).appendTo("#recipeinfo");
            } //end for loop

////////////////////////////////////////

            $(".recipebuttons").on("click", function(){
                var v = $(this).attr("value");
                var recipeCalories = response.results[v].nutrition.nutrients[0].amount;
            var recipeCaloriesPerc = response.results[v].nutrition.nutrients[0].percentOfDailyNeeds;
            var recipeIMG = response.results[v].image;
            var recipeName = response.results[v].title;
            var recipeURL = response.results[v].sourceUrl;
            var recipeIngredients = JSON.stringify(response.results[v].nutrition.ingredients);

            var nutritionDiv = $("<div>").addClass("box").appendTo("#recipeinfo");
             //dynamically append that info to the DOM
            $("<p>").text("Recipe Name: " + recipeName).appendTo(nutritionDiv);
            $("<p>").text("Recipe Calories: " + recipeCalories).appendTo(nutritionDiv);
            $("<p>").text("% of Daily Cal: " + recipeCaloriesPerc).appendTo(nutritionDiv);
            $("<img>").attr("src", recipeIMG).appendTo(nutritionDiv);
            $("<a>").text(recipeURL).attr("src", recipeURL).appendTo(nutritionDiv);
            $("<button>", {text: "Search"}).addClass("button is-dark pickrecipe").appendTo(nutritionDiv);
            }); //end event listener for recipe choices

            $(".pickrecipe").on("click", function(){

                console.log("You Picked a Recipe!");

            }) //end event listener for selecting 
           
            
        }) //ajax closers

    }) //recipeBtn click closers