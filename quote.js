const quote = document.querySelector(".quote"),
  generate = document.getElementById("generate"),
  category = document.getElementById("category"),
  likeQuote = document.getElementById("likeQuote"),
  likeList = document.getElementById("likeList"),
  quoteArea = document.querySelector(".quoteArea"),
  favoriteList = document.querySelector(".favoriteList"),
  favoriteData = document.querySelector(".favoriteData"); // Fixed selector

let storedData = localStorage.getItem("favoriteListItems");
let favoriteListArr = storedData ? JSON.parse(storedData) : [];
console.log(favoriteListArr);

window.addEventListener("load", () => {
  generateQuotes();
  favoriteList.style.display = "none";

  if (favoriteListArr.length == 0) {
    likeList.style.opacity = "0.6";
    likeList.style.pointerEvents = "none";
  } else {
    likeList.style.opacity = "1";
    likeList.style.pointerEvents = "auto";
  }
});

function generateQuotes() {
  let div = document.createElement("div");
  quote.innerHTML = `Loading New Quotes...<i class="fa-solid fa-sync fa-spin"></i>`;
  generate.innerHTML = "Generating...";
  
  fetch("https://api.api-ninjas.com/v1/quotes", {
    headers: { "X-Api-Key": "ye1t9IUuGbSiFzOIaYSe2Q==80NVE4R4Zc9e1g6I" }
  })
  .then((response) => response.json())
  .then((data) => {
    console.log(data);
    generate.innerHTML = "New Quote";
    quote.innerHTML = "";
    
    div.innerHTML += '<i class="fa-solid fa-quote-left"></i> &nbsp  ';
    div.innerHTML += data[0].quote;
    div.innerHTML += '<i class="fa-solid fa-quote-right"></i>  ';
    div.innerHTML += `<div class="author"><span>_</span>${data[0].author}</div>`;
    
    quote.append(div);
    category.innerHTML = data[0].category;
    likeQuote.setAttribute("class", "fa-regular fa-heart");
    likeQuote.style.color = "black";
  });
 
}

function LikeQuote() {
  if (likeQuote.style.color == "red") {
    likeQuote.removeAttribute("class");
    likeQuote.setAttribute("class", "fa-regular fa-heart");
    likeQuote.style.color = "black";
     
    favoriteListArr = favoriteListArr.filter(function(e){
      return e!== quote.innerHTML;
    }),
      localStorage.setItem("favoriteListItems", JSON.stringify(favoriteListArr));
    
  } else {
    likeQuote.setAttribute("class", "fa-solid fa-heart");
    likeQuote.style.color = "red";
    favoriteListArr.push(quote.innerHTML);
    localStorage.setItem("favoriteListItems", JSON.stringify(favoriteListArr));
  }
  if (favoriteListArr.length == 0) {
    likeList.style.opacity = "0.6";
    likeList.style.pointerEvents = "none";
  } else {
    likeList.style.opacity = "1";
    likeList.style.pointerEvents = "auto";
  }
}

function CopyQuote() {
  navigator.clipboard.writeText(quote.innerText);
}

likeList.addEventListener("click", () => {
  quoteArea.style.display = "none";
  favoriteList.style.display = "block";
  
  favoriteData.innerHTML = ""; // Clear previous items before appending

  favoriteListArr.forEach((item) => {
    let li = document.createElement("li");  
    li.innerHTML = item;
    favoriteData.append(li);
  });
});

function switchQuotes() {
  quoteArea.style.display = "block";
  favoriteList.style.display = "none";
  if (favoriteListArr.length == 0) {
    likeList.style.opacity = "0.6";
    likeList.style.pointerEvents = "none";
  } else {
    likeList.style.opacity = "1";
    likeList.style.pointerEvents = "auto";
  }
}
function clearFavoriteList(){
  favoriteData.innerHTML="";
  favoriteListArr = [];
  localStorage.setItem("favoriteListItems", JSON.stringify(favoriteListArr));
  likeQuote.removeAttribute("class");
  likeQuote.setAttribute("class", "fa-regular fa-heart");
  likeQuote.style.color = "black";
   
}