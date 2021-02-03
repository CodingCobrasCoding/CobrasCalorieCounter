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
            var recipeCalories = response.results[i].nutrition.nutrients[i].amount;
            var recipeCaloriesPerc = response.results[i].nutrition.nutrients[i].percentOfDailyNeeds;
            var recipeIMG = response.results[i].image;
            var recipeName = response.results[i].title;
            var recipeURL = response.results[i].sourceUrl;
            var recipeIngredients = JSON.stringify(response.results[i].nutrition.ingredients);
            var recipeResults = response.results[i];
            // console.log(response);
            

              //once they choose a recipe, dynamically create the nutirition info, recipes steps, and ingredients    
            $("<button>", {text: recipeName + "   -   " + recipeCalories + "Cal"}).addClass("button is-danger recipebuttons").appendTo("#recipeinfo");
            }

            $(".recipebuttons").on("click", function(){
            console.log(this)
            console.log(recipeCalories, recipeIMG, recipeName, recipeURL, recipeCaloriesPerc,);
            });
           
            //dynamically append that info to the DOM
            
        }) //ajax closers

    }) //recipeBtn click closers