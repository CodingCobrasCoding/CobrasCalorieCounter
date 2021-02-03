var apikey = "3c48ac9f4fb24f0da8619831bed373c0"
        var recipeInput = "tacos"
        var queryURL = "https://api.spoonacular.com/recipes/complexSearch?apiKey=" + apikey + "&query=" + recipeInput + "&addRecipeNutrition=true&sort=calories&sortDirection=asc&number=10"


        $.ajax({
            url: queryURL,
            method: "GET"
        }).then(function(response){
            var recipeCalories = response.results[0].nutrition.nutrients[0].amount;
            var recipeCaloriesPerc = response.results[0].nutrition.nutrients[0].percentOfDailyNeeds;
            var recipeIMG = response.results[0].image;
            var recipeName = response.results[0].title;
            var recipeURL = response.results[0].sourceUrl;
            console.log(response);
            console.log(recipeCalories, recipeIMG, recipeName, recipeURL, recipeCaloriesPerc);

        })