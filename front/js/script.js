const charactersList = document.getElementById('character-list');
const searchInput = document.getElementById('characterName');
const searchButton = document.getElementById('searchBtn');
const linkCharacters = document.getElementById('link-characters');
const charactersURL = 'http://localhost:3000/characters';
const characterSearch = 'http://localhost:3000/characters/'

const characters = async () => {
    try {
        const response = await fetch(charactersURL);
        const characters =  await response.json();
        const slicedArray = characters.slice(0, 20); //En los resultados me sale repetidamente los mismos 20. Hago el corte para que solo me salgan los primero 20
       //console.log(slicedArray);

       slicedArray.forEach(character => {

            charactersList.innerHTML += `
                <div class='character-div'>
                    <img src='${character.image}' alt='Personaje de Rick & Morty: ${character.name}' />
                    <li><span>Name: </span>${character.name}</li>
                    <li><span>Status </span>${character.status}</li>
                    <li><span>Specie: </span>${character.species}</li>
                    <li><span>Gender: </span>${character.gender}</li>
                    <li><span>Origin: </span>${character.originName}</li>
                    
                </div>
            `
        
            });
        
    } catch (error) {
        charactersList.innerHTML = '<li>Error al obtener información</li>'
    }
}

const getCharacter = async () => {
    const inputValue = searchInput.value;
    
    try {
        const response = await fetch(`http://localhost:3000/characters/${inputValue}`);
        const character =  await response.json();
        //console.log(inputValue);

        character.forEach(character => {

            charactersList.innerHTML += `
                <div class='character-div'>
                    <img src='${character.image}' alt='Personaje de Rick & Morty: ${character.name}' />
                    <li><span>Name: </span>${character.name}</li>
                    <li><span>Status </span>${character.status}</li>
                    <li><span>Specie: </span>${character.species}</li>
                    <li><span>Gender: </span>${character.gender}</li>
                    <li><span>Origin: </span>${character.originName}</li>
                </div>
            `
        })
    } catch (error) {
        charactersList.innerHTML = '<li>Error al obtener el personaje</li>'
    }
}

window.addEventListener("load", () => {
    characters();
  });

searchButton.addEventListener('click', () => {
    charactersList.innerHTML = ' ';   
})

linkCharacters.addEventListener('click', () => {
    charactersList.innerHTML = ' ';   
})

