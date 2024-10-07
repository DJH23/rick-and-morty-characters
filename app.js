// API URL for fetching characters
const API_URL = "https://rickandmortyapi.com/api/character";

// Search input
const searchInput = document.getElementById("search");
const characterList = document.getElementById("character-list");

// Fetch characters
async function fetchCharacters(query = "") {
  const response = await fetch(`${API_URL}?name=${query}`);
  const data = await response.json();
  displayCharacters(data.results);
}

// Function to display characters
function displayCharacters(characters) {
    // Get the character list element
    const characterList = document.getElementById("character-list");
    // Clear the current list
    characterList.innerHTML = "";

    // Check if there are no characters to display
    if (!characters || characters.length === 0) {
        characterList.innerHTML = "<p>No characters found</p>";
        return;
    }

    // Loop through each character and create a div element for it
    characters.forEach((character) => {
        const div = document.createElement("div");
        div.className = "character";

        // Set the inner HTML of the div with character details
        div.innerHTML = `
                <h3>${character.name}</h3>
                <img src="${character.image}" alt="${character.name}">
                <p><strong>Status:</strong> ${character.status}</p>
                <p><strong>Species:</strong> ${character.species}</p>
                <p><strong>Gender:</strong> ${character.gender}</p>
                <p><strong>Origin:</strong> ${character.origin.name}</p>
                <p><strong>Location:</strong> ${character.location.name}</p>
            `;

        // Append the character div to the character list
        characterList.appendChild(div);
    });
}

// Event listener for search input
searchInput.addEventListener("input", (e) => {
  const query = e.target.value;
  fetchCharacters(query);
});

// Initial fetch
fetchCharacters();
