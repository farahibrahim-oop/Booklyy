document.addEventListener('DOMContentLoaded', () => {
    const url = "https://api.dictionaryapi.dev/api/v2/entries/en/";
    const result = document.getElementById("result");
    const btn = document.getElementById("search-btn");

    btn.addEventListener("click", () => {
        let inpWord = document.getElementById("inp-word").value;
        fetch(`${url}${inpWord}`)
            .then((response) => response.json())  
            .then((data) => {
                console.log(data);

                let word = data[0].word;
                let phonetic = data[0].phonetic || "No phonetic available";
                let partOfSpeech = data[0].meanings[0].partOfSpeech || "N/A";
                let definition = data[0].meanings[0].definitions[0].definition || "No definition found";
                let example = data[0].meanings[0].definitions[0].example;

                result.innerHTML = `
                <div class="world">
                    <h3>${word}</h3>
                </div>
                <div class="details">
                    <p>${partOfSpeech}</p>
                    <p>${phonetic}</p>
                </div>
                <p class="world-meaning">
                    ${definition}
                </p>                       
                <p class="world-example">
                    ${example}
                </p>`;
            });
    });
});

