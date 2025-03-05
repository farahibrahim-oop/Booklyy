// Wait for the DOM content to be fully loaded before executing the script
document.addEventListener('DOMContentLoaded', () => {
    // Define the base URL of the dictionary API
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    
    // Select the result area and the search button
    const result = document.getElementById("result"); // Where the word details will be displayed
    const btn = document.getElementById("search-btn"); // The button user clicks to initiate the search

    // Add an event listener to the search button
    btn.addEventListener("click", () => {
        // Get the word entered by the user in the input field
        let inpWord = document.getElementById("inp-word").value;

        // Fetch data from the API using the word entered by the user
        fetch(`${url}${inpWord}`)  // API request to the dictionary service
            .then((response) => response.json())  // Parse the response as JSON
            .then((data) => {
                // Log the response data for debugging purposes
                console.log(data);

                // Extract the relevant information from the API response
                let word = data[0].word; // The word the user searched for
                let phonetic = data[0].phonetic || "No phonetic available"; // Phonetic representation of the word (if available)
                let partOfSpeech = data[0].meanings[0].partOfSpeech || "N/A"; // The part of speech (e.g., noun, verb)
                let definition = data[0].meanings[0].definitions[0].definition || "No definition found"; // Definition of the word
                let example = data[0].meanings[0].definitions[0].example; // Example sentence using the word (if available)

                // Update the result area in HTML with the fetched word information
                result.innerHTML = `
                    <div class="world">
                        <h3>${word}</h3>  <!-- Display the word -->
                    </div>
                    <div class="details">
                        <p>${partOfSpeech}</p> <!-- Display part of speech -->
                        <p>${phonetic}</p>     <!-- Display phonetic spelling -->
                    </div>
                    <p class="world-meaning">
                        ${definition}  <!-- Display the definition -->
                    </p>                       
                    <p class="world-example">
                        ${example}  <!-- Display an example sentence (if available) -->
                    </p>`;
            });
    });
});
