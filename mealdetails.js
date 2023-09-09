// Get the meal ID from the URL query parameter
const urlParams = new URLSearchParams(window.location.search);
const mealId = urlParams.get('id');

// Function to fetch and display meal details
async function showMealDetails() {
    // Construct the URL to fetch meal details using the meal ID
    const url = `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`;
    
    // Fetch data from the URL
    const response = await fetch(url);
    const data = await response.json();
    const meal = data.meals[0];

    // Display meal details on the page
    const mealDetails = document.getElementById("meal-details");
    mealDetails.innerHTML = `
    <div id="meal-details" class="mb-5">
    <div id="meal-header" class="d-flex justify-content-around flex-wrap">
      <div id="meal-thumbail">
        <img class="mb-2" src="${data.meals[0].strMealThumb}" alt="" srcset="">
      </div>
      <div id="details">
        <h3>${data.meals[0].strMeal}</h3>
        <h6>Category : ${data.meals[0].strCategory}</h6>
        <h6>Area : ${data.meals[0].strArea}</h6>
      </div>
    </div>
    <div id="meal-instruction" class="mt-3">
      <h5 class="text-center">Instruction :</h5>
      <p>${data.meals[0].strInstructions}</p>
    </div>
    
  </div>
    `;
}

// Call the function to display meal details when the page loads
showMealDetails();
