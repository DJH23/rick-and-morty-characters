// API URL for fetching characters
const API_URL = "https://rickandmortyapi.com/api/character";
let currentPage = 1; // Track the current page
let isLoading = false; // Prevent multiple API calls at the same time
let hasMoreCharacters = true; // Check if more characters are available

// Search input
const searchInput = document.getElementById("search");
const characterList = document.getElementById("character-list");

// Fetch characters
async function fetchCharacters(query = "", page = 1) {
  if (isLoading || !hasMoreCharacters) return;

  isLoading = true;
  const response = await fetch(`${API_URL}?name=${query}&page=${page}`);
  const data = await response.json();

  // Check if there are more characters to load
  if (data.info.next === null) {
    hasMoreCharacters = false;
  }

  displayCharacters(data.results);
  isLoading = false;
}

// Function to display characters
function displayCharacters(characters) {
  // Check if there are no characters to display
  if (!characters || characters.length === 0) {
    if (currentPage === 1) {
      // Only show the message on the first page
      characterList.innerHTML = "<p>No characters found</p>";
    }
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

// Infinite scroll event listener
window.addEventListener("scroll", () => {
  if (
    window.innerHeight + window.scrollY >= document.body.offsetHeight - 500 &&
    !isLoading
  ) {
    currentPage++; // Load the next page
    fetchCharacters(searchInput.value, currentPage);
  }
});

// Event listener for search input
searchInput.addEventListener("input", (e) => {
  const query = e.target.value;
  // Reset the page and load new characters for the search query
  characterList.innerHTML = "";
  currentPage = 1;
  hasMoreCharacters = true;
  fetchCharacters(query, currentPage);
});

// Initial fetch of the first page
fetchCharacters();
