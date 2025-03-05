// Select the necessary DOM elements
const quote = document.querySelector(".quote"), // The element where the quote will be displayed
  generate = document.getElementById("generate"), // Button to generate new quotes
  category = document.getElementById("category"), // Element displaying the category of the quote
  likeQuote = document.getElementById("likeQuote"), // Heart icon to like/unlike the quote
  likeList = document.getElementById("likeList"), // List of liked quotes
  quoteArea = document.querySelector(".quoteArea"), // Area displaying the current quote
  favoriteList = document.querySelector(".favoriteList"), // Area displaying the favorite quotes list
  favoriteData = document.querySelector(".favoriteData"); // Container to hold the favorite quotes

// Retrieve the stored favorite quotes from localStorage (if any)
let storedData = localStorage.getItem("favoriteListItems"); 
let favoriteListArr = storedData ? JSON.parse(storedData) : []; // Parse the stored data, or initialize as an empty array
console.log(favoriteListArr);

// When the page is loaded, execute the following functions
window.addEventListener("load", () => {
  generateQuotes(); // Generate and display a new quote
  favoriteList.style.display = "none"; // Initially hide the favorite list

  // If there are no favorite quotes, disable the "like list" button
  if (favoriteListArr.length == 0) {
    likeList.style.opacity = "0.6";
    likeList.style.pointerEvents = "none";
  } else {
    likeList.style.opacity = "1"; // Enable the button if there are favorite quotes
    likeList.style.pointerEvents = "auto";
  }
});

// Function to generate a new quote
function generateQuotes() {
  let div = document.createElement("div"); // Create a new div element to hold the quote
  quote.innerHTML = `Loading New Quotes...<i class="fa-solid fa-sync fa-spin"></i>`; // Display loading message
  generate.innerHTML = "Generating..."; // Change the button text to "Generating..."

  // Fetch a new quote from the external API
  fetch("https://api.api-ninjas.com/v1/quotes", {
    headers: { "X-Api-Key": "ye1t9IUuGbSiFzOIaYSe2Q==80NVE4R4Zc9e1g6I" } // Provide API key in the request headers
  })
  .then((response) => response.json()) // Parse the response as JSON
  .then((data) => {
    console.log(data); // Log the data for debugging purposes
    generate.innerHTML = "New Quote"; // Change button text back to "New Quote"
    quote.innerHTML = ""; // Clear the previous quote

    // Build the HTML structure for the new quote
    div.innerHTML += '<i class="fa-solid fa-quote-left"></i> &nbsp  '; 
    div.innerHTML += data[0].quote; // Insert the quote text
    div.innerHTML += '<i class="fa-solid fa-quote-right"></i>  ';
    div.innerHTML += `<div class="author"><span>_</span>${data[0].author}</div>`; // Insert author name

    // Append the new quote to the quote element
    quote.append(div);
    category.innerHTML = data[0].category; // Display the category of the quote
    likeQuote.setAttribute("class", "fa-regular fa-heart"); // Set the heart icon to "empty" state
    likeQuote.style.color = "black"; // Set the heart color to black
  });
}

// Function to handle liking or unliking a quote
function LikeQuote() {
  // If the quote is already liked (heart is red)
  if (likeQuote.style.color == "red") {
    likeQuote.removeAttribute("class"); // Remove the "liked" heart class
    likeQuote.setAttribute("class", "fa-regular fa-heart"); // Set it to the "empty heart" class
    likeQuote.style.color = "black"; // Set the heart color back to black

    // Remove the current quote from the favorite list array
    favoriteListArr = favoriteListArr.filter(function(e) {
      return e !== quote.innerHTML;
    });
    localStorage.setItem("favoriteListItems", JSON.stringify(favoriteListArr)); // Save updated favorites to localStorage
  } else {
    // If the quote is not liked (heart is black)
    likeQuote.setAttribute("class", "fa-solid fa-heart"); // Set the heart to "filled" state
    likeQuote.style.color = "red"; // Set the heart color to red

    // Add the current quote to the favorite list array
    favoriteListArr.push(quote.innerHTML);
    localStorage.setItem("favoriteListItems", JSON.stringify(favoriteListArr)); // Save updated favorites to localStorage
  }

  // If the favorite list is empty, disable the "like list" button
  if (favoriteListArr.length == 0) {
    likeList.style.opacity = "0.6";
    likeList.style.pointerEvents = "none";
  } else {
    likeList.style.opacity = "1"; // Re-enable the button if there are favorites
    likeList.style.pointerEvents = "auto";
  }
}

// Function to copy the current quote to clipboard
function CopyQuote() {
  navigator.clipboard.writeText(quote.innerText); // Copy the text of the quote to clipboard
}

// Event listener to show the favorite quotes list when the "Like List" button is clicked
likeList.addEventListener("click", () => {
  quoteArea.style.display = "none"; // Hide the quote area
  favoriteList.style.display = "block"; // Show the favorite list area
  
  favoriteData.innerHTML = ""; // Clear the previous favorite list

  // Display all the liked quotes in the favorite list
  favoriteListArr.forEach((item) => {
    let li = document.createElement("li");  
    li.innerHTML = item; // Add each favorite quote as a list item
    favoriteData.append(li); // Append the list item to the favorite list
  });
});

// Function to switch back to the quote area from the favorite list
function switchQuotes() {
  quoteArea.style.display = "block"; // Show the quote area again
  favoriteList.style.display = "none"; // Hide the favorite list
  
  // If there are no favorite quotes, disable the "like list" button
  if (favoriteListArr.length == 0) {
    likeList.style.opacity = "0.6";
    likeList.style.pointerEvents = "none";
  } else {
    likeList.style.opacity = "1"; // Re-enable the button if there are favorites
    likeList.style.pointerEvents = "auto";
  }
}

// Function to clear the favorite quotes list
function clearFavoriteList() {
  favoriteData.innerHTML = ""; // Clear the displayed favorite quotes
  favoriteListArr = []; // Reset the favorite list array to empty
  localStorage.setItem("favoriteListItems", JSON.stringify(favoriteListArr)); // Save the empty list to localStorage
  
  // Reset the heart icon to the "empty" state
  likeQuote.removeAttribute("class");
  likeQuote.setAttribute("class", "fa-regular fa-heart");
  likeQuote.style.color = "black";
}
