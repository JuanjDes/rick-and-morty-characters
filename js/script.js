let currentPage = 1; // Empieza en la primera página
const characterList = document.getElementById("character-list");
const prevPageButton = document.getElementById("prev-page");
const nextPageButton = document.getElementById("next-page");

// FUNCION PARA OBTENER Y MOSTRAR PERSONAJES
function fetchCharacters(page) {
    fetch(`https://rickandmortyapi.com/api/character/?page=${page}`)
        .then((response) => {
            if (!response.ok) {
                throw new Error('Error al obtener la respuesta');
            }
            return response.json();
        })
        .then((data) => {
            displayCharacters(data.results);
        })
        .catch((error) => {
            characterList.innerHTML = '<p>Error: no se pudo obtener los datos</p>';
            console.error(error);
        });
}

// FUNCION PARA MOSTRAR PERSONAJES EN EL HTML
function displayCharacters(characters) {
    characterList.innerHTML = ""; // Limpiar la lista de personajes

    characters.forEach(character => {
        const listItem = document.createElement("li");
        listItem.classList.add("character-item");

        const img = document.createElement("img");
        img.src = character.image;
        img.alt = character.name;
        img.classList.add("character-image");

        const name = document.createElement("h2");
        name.textContent = character.name;

        const species = document.createElement("p");
        species.textContent = character.species;

        listItem.appendChild(img);
        listItem.appendChild(name);
        listItem.appendChild(species);

        characterList.appendChild(listItem);
    });
}

// CONFIGURAR LA PAGINACION CON LOS BOTONES
nextPageButton.addEventListener("click", () => {
    currentPage++;
    fetchCharacters(currentPage);
});

prevPageButton.addEventListener("click", () => {
    if (currentPage > 1) {
        currentPage--;
        fetchCharacters(currentPage);
    }
});

// CARGAR LA PRIMERA PAGINA AL CARGAR EL DOM
document.addEventListener("DOMContentLoaded", () => {
    fetchCharacters(currentPage);
});

