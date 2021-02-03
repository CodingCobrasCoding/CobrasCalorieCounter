 $("#recipeBtn").on("click", function(event){
event.preventDefault();

var apikey = "3c48ac9f4fb24f0da8619831bed373c0";
        var recipeInput = $("#recipeinput").val();
        var queryURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apikey + "&query=" + recipeInput + "&addRecipeNutrition=true&sort=calories&sortDirection=asc&number=10";
        console.log(recipeInput);
       
        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            // var recipeCalories = response.results[0].nutrition.nutrients[0].amount;
            // var recipeCaloriesPerc = response.results[0].nutrition.nutrients[0].percentOfDailyNeeds;
            // var recipeIMG = response.results[0].image;
            // var recipeName = response.results[0].title;
            // var recipeURL = response.results[0].sourceUrl;
            // var recipeIngredients = JSON.stringify(response.results[0].nutrition.ingredients);
            // var recipeResults = response.results[0];

        
            
            
            //dynamically create buttons for each recipe to choose from
            for (var i = 0; i < 5; i++) {
var recipeCalories = response.results[i].nutrition.nutrients[i].amount;
            var recipeCaloriesPerc = response.results[i].nutrition.nutrients[i].percentOfDailyNeeds;
            var recipeIMG = response.results[i].image;
            var recipeName = response.results[i].title;
            var recipeURL = response.results[i].sourceUrl;
            var recipeIngredients = JSON.stringify(response.results[i].nutrition.ingredients);
            var recipeResults = response.results[i];
            console.log(response);
            console.log(recipeCalories, recipeIMG, recipeName, recipeURL, recipeCaloriesPerc,);

                
            $("<buttons>", {text: recipeName + "   -   " + recipeCalories + "Cal"}).addClass("button is-primary").appendTo("#recipeinfo");
            }
            //once they choose a recipe, dynamically create the nutirition info, recipes steps, and ingredients 
            //dynamically append that info to the DOM
            //
        }) //ajax closers

    }) //recipeBtn click closers