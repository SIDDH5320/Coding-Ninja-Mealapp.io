// Function to fetch and display favorite meals
async function showFavMealList() {
    let arr = JSON.parse(localStorage.getItem("favouritesList")) || [];
    let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    let html = "";

    if (arr.length === 0) {
        html = `
            <div class="page-wrap d-flex flex-row align-items-center">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <span class="display-1 d-block">404</span>
                            <div class="mb-4 lead">
                                No meals added to your favorites list.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        html = '<div class="d-flex flex-wrap justify-content-between">';
        for (let index = 0; index < arr.length; index++) {
            await fetchMealsFromApi(url, arr[index]).then((data) => {
                html += `
                    <div id="card" class="card mb-3" style="width: 20rem;">
                        <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <h5 class="card-title">${data.meals[0].strMeal}</h5>
                            <div class="d-flex justify-content-between mt-5">
                                <button
                                    type="button"
                                    id="details-btn"
                                    class="btn btn-outline-light"
                                    onclick="showMealDetails(${data.meals[0].idMeal})"
                                >
                                    More Details
                                </button>
                                <button
                                    id="main${data.meals[0].idMeal}"
                                    class="btn btn-outline-light active"
                                    onclick="addRemoveToFavList(${data.meals[0].idMeal})"
                                    style="border-radius:50%"
                                >
                                    <i class="fa-solid fa-heart" style="color: #ff0000;"></i>
                                </button>
                                
                            </div>
                           
                        </div>
                        <button class="btn btn-dark "><a href="index.html"> Back Home</a></button>
                    </div>
                    
                `;// Function to fetch and display favorite meals
                async function showFavMealList() {
                    // Get the list of favorite meals from local storage or initialize an empty array
                    let arr = JSON.parse(localStorage.getItem("favouritesList")) || [];
                    let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
                    let html = "";
                
                    // Check if there are no favorite meals
                    if (arr.length === 0) {
                        // Display a message if there are no favorite meals
                        html = `
                            <div class="page-wrap d-flex flex-row align-items-center">
                                <div class="container">
                                    <div class="row justify-content-center">
                                        <div class="col-md-12 text-center">
                                            <span class="display-1 d-block">404</span>
                                            <div class="mb-4 lead">
                                                No meals added to your favorites list.
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        `;
                    } else {
                        // Initialize the HTML with a flex container for displaying favorite meals
                        html = '<div class="d-flex flex-wrap justify-content-between">';
                        for (let index = 0; index < arr.length; index++) {
                            // Fetch meal data for each favorite meal
                            await fetchMealsFromApi(url, arr[index]).then((data) => {
                                html += `
                                    <div id="card" class="card mb-3" style="width: 20rem;">
                                        <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
                                        <div class="card-body">
                                            <h5 class="card-title">${data.meals[0].strMeal}</h5>
                                            <div class="d-flex justify-content-between mt-5">
                                                <button
                                                    type="button"
                                                    id="details-btn"
                                                    class="btn btn-outline-light"
                                                    onclick="showMealDetails(${data.meals[0].idMeal})"
                                                >
                                                    More Details
                                                </button>
                                                <button
                                                    id="main${data.meals[0].idMeal}"
                                                    class="btn btn-outline-light active"
                                                    onclick="addRemoveToFavList(${data.meals[0].idMeal})"
                                                    style="border-radius:50%"
                                                >
                                                    <i class="fa-solid fa-heart" style="color: #ff0000;"></i>
                                                </button>
                                            </div>
                                        </div>
                                        <button class="btn btn-dark "><a href="index.html"> Back Home</a></button>
                                    </div>
                                `;
                            });
                        }
                        html += '</div>'; // Close the flex container
                    }
                
                    // Display the generated HTML in the "favourites-body" element
                    document.getElementById("favourites-body").innerHTML = html;
                }
                
                // Call the function to display favorite meals when the page loads
                showFavMealList();
                
            });
        }
        html += '</div>'; // Close the flex container
    }

    document.getElementById("favourites-body").innerHTML = html;
}

// Call the function to display favorite meals when the page loads
showFavMealList();
