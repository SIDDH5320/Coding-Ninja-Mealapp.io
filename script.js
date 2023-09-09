// Check if the "favouritesList" array exists in local storage; if not, initialize it as an empty array
if (localStorage.getItem("favouritesList") == null) {
    localStorage.setItem("favouritesList", JSON.stringify([]));
}

// Function to fetch meals from the API and return the data
async function fetchMealsFromApi(url, value) {
    const response = await fetch(`${url + value}`);
    const meals = await response.json();
    return meals;
}

// Function to display meals based on search input
function showMealList() {
    let inputValue = document.getElementById("my-search").value;
    let arr = JSON.parse(localStorage.getItem("favouritesList"));
    let url = "https://www.themealdb.com/api/json/v1/1/search.php?s=";
    let html = "";
    let meals = fetchMealsFromApi(url, inputValue);
    meals.then((data) => {
        if (data.meals) {
            data.meals.forEach((element) => {
                let isFav = false;
                for (let index = 0; index < arr.length; index++) {
                    if (arr[index] == element.idMeal) {
                        isFav = true;
                    }
                }
                if (isFav) {
                    // Display meal card with a heart icon for favorites
                    html += `
                    <div id="card" class="card mb-3" style="width: 20rem;">
                        <!-- Meal image -->
                        <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <!-- Meal title -->
                            <h5 class="card-title">${element.strMeal}</h5>
                            <div class="d-flex justify-content-between mt-5">
                                <!-- Link to more details -->
                                <a href="meal-details.html?id=${element.idMeal}" class="btn btn-outline-light">More Details</a>
                                <!-- Button to add/remove from favorites -->
                                <button id="main${element.idMeal}" class="btn btn-outline-light active" onclick="addRemoveToFavList(${element.idMeal})" style="border-radius:50%"><i class="fa-solid fa-heart" style="color: #ff0000;"></i></button>
                            </div>
                        </div>
                    </div>
                    `;
                } else {
                    // Display meal card without a heart icon for non-favorites
                    html += `
                    <div id="card" class="card mb-3" style="width: 20rem;">
                        <!-- Meal image -->
                        <img src="${element.strMealThumb}" class="card-img-top" alt="...">
                        <div class="card-body">
                            <!-- Meal title -->
                            <h5 class="card-title">${element.strMeal}</h5>
                            <div class="d-flex justify-content-between mt-5">
                                <!-- Link to more details -->
                                <a href="meal-details.html?id=${element.idMeal}" class="btn btn-outline-light">More Details</a>
                                <!-- Button to add/remove from favorites -->
                                <button id="main${element.idMeal}" class="btn btn-outline-light" onclick="addRemoveToFavList(${element.idMeal})" style="border-radius:50%"><i class="fa-solid fa-heart"></i></button>
                            </div>
                        </div>
                    </div>
                    `;
                }
            });
        } else {
            // Display a message if no matching meals are found
            html += `
            <div class="page-wrap d-flex flex-row align-items-center">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <span class="display-1 d-block"></span>
                            <div class="mb-4 lead">
                                The meal you are looking for was not found.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            `;
        }
        // Display the generated HTML in the "main" element
        document.getElementById("main").innerHTML = html;
    });
}

// Function to display a meal's details (currently commented out)
// async function showMealDetails(id) {
//     // Fetch meal details from the API
//     let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
//     let html = "";
//     await fetchMealsFromApi(url, id).then((data) => {
//         // Generate HTML to display meal details
//         html += `
//           <div id="meal-details" class="mb-5">
//             <div id="meal-header" class="d-flex justify-content-around flex-wrap">
//               <div id="meal-thumbail">
//                 <!-- Meal image -->
//                 <img class="mb-2" src="${data.meals[0].strMealThumb}" alt="" srcset="">
//               </div>
//               <div id="details">
//                 <!-- Meal name, category, and area -->
//                 <h3>${data.meals[0].strMeal}</h3>
//                 <h6>Category : ${data.meals[0].strCategory}</h6>
//                 <h6>Area : ${data.meals[0].strArea}</h6>
//               </div>
//             </div>
//             <div id="meal-instruction" class="mt-3">
//               <h5 class="text-center">Instruction :</h5>
//               <!-- Meal preparation instructions -->
//               <p>${data.meals[0].strInstructions}</p>
//             </div>
//           </div>
//         `;
//     });
//     // Display the generated HTML in the "main" element
//     document.getElementById("main").innerHTML = html;
// }

// Function to display favorite meals in the favorites body
async function showFavMealList() {
    // Get the list of favorite meal IDs from local storage
    let arr = JSON.parse(localStorage.getItem("favouritesList"));
    let url = "https://www.themealdb.com/api/json/v1/1/lookup.php?i=";
    let html = "";
    if (arr.length == 0) {
        // Display a message if there are no favorite meals
        html += `
            <div class="page-wrap d-flex flex-row align-items-center">
                <div class="container">
                    <div class="row justify-content-center">
                        <div class="col-md-12 text-center">
                            <span class="display-1 d-block">404</span>
                            <div class="mb-4 lead">
                                No meal added in your favorites list.
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        `;
    } else {
        for (let index = 0; index < arr.length; index++) {
            // Fetch each favorite meal's data from the API
            await fetchMealsFromApi(url, arr[index]).then((data) => {
                // Generate HTML for displaying favorite meals
                html += `
                <div id="card" class="card mb-3" style="width: 20rem;">
                    <!-- Meal image -->
                    <img src="${data.meals[0].strMealThumb}" class="card-img-top" alt="...">
                    <div class="card-body">
                        <!-- Meal title -->
                        <h5 class="card-title">${data.meals[0].strMeal}</h5>
                        <div class="d-flex justify-content-between mt-5">
                            <!-- Button to show more details -->
                            <button type="button" id="details-btn" class="btn btn-outline-light" onclick="showMealDetails(${data.meals[0].idMeal})">More Details</button>
                            <!-- Button to add/remove from favorites -->
                            <button id="main${data.meals[0].idMeal}" class="btn btn-outline-light active" onclick="addRemoveToFavList(${data.meals[0].idMeal})" style="border-radius:50%"><i class="fa-solid fa-heart" style="color: #ff0000;"></i></button>
                        </div>
                    </div>
                </div>
                `;
            });
        }
    }
    // Display the generated HTML in the "favourites-body" element
    document.getElementById("favourites-body").innerHTML = html;
}

// Function to add or remove a meal from the favorites list
function addRemoveToFavList(id) {
    let arr = JSON.parse(localStorage.getItem("favouritesList")) || [];
    let contain = arr.includes(id);

    if (contain) {
        // Remove the meal from favorites and display a message
        arr = arr.filter(item => item !== id);
        alert("Meal removed from favorites list");
    } else {
        // Add the meal to favorites and display a message
        arr.push(id);
        alert("Meal added to favorites list");
    }

    // Update the "favouritesList" array in local storage
    localStorage.setItem("favouritesList", JSON.stringify(arr));
}

// Function to display favorite meals on another page (currently commented out)
function showFavMealList() {
    // Redirect to the favorites page
    window.location.href = "favourite.html";
}
