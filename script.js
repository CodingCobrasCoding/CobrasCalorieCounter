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
            var recipeCalories = response.results[0].nutrition.nutrients[0].amount;
            var recipeCaloriesPerc = response.results[0].nutrition.nutrients[0].percentOfDailyNeeds;
            var recipeIMG = response.results[0].image;
            var recipeName = response.results[0].title;
            var recipeURL = response.results[0].sourceUrl;
            var recipeIngredients = JSON.stringify(response.results[0].nutrition.ingredients);
            var recipeResults = response.results[0];

        
            console.log(response);
            // console.log(recipeCalories, recipeIMG, recipeName, recipeURL, recipeCaloriesPerc,);
            
            //dynamically create buttons for each recipe to choose from
            //once they choose a recipe, dynamically create the nutirition info, recipes steps, and ingredients 
            //compare nutrition with the inputs in the BMI form and discern how many calories they have left to eat each day
            //dynamically append that info to the DOM
            //
        })

    })