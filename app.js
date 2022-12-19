const formulario = document.getElementById("formulario");
const inputNombre = document.getElementById("nombre");
const card = document.getElementById("card");
const btnTodos = document.getElementById("todos");
const templateCard = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();
const urlCharacters = "https://bobsburgers-api.herokuapp.com/characters"

async function getCharactersByName(name) {
    const urlFetch = urlCharacters + "?name=" +name;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}

async function getCharacters() {
    const urlFetch2 = urlCharacters;
    const response = await fetch(urlFetch2);
    const json2 = await response.json();
    return json2;
}


const pintarCards = characters => {
    card.innerHTML= " ";

    characters.forEach(element =>{
        //cambiamos partes de la plantilla para cada personaje 
        templateCard.querySelector("img").setAttribute("src",element.image)
        templateCard.querySelector("h4").textContent = element.name;
        templateCard.querySelector(".card-text").textContent = element.gender;
        templateCard.querySelector(".color-pelo").textContent = element.hairColor;
        templateCard.querySelector(".ocupacion").textContent = element.occupation;
        templateCard.querySelector("a").textContent = element.firstEpisode;
        

        //clonamos la plantilla y la agregamos a un fragmento que ira acumulando todas las cards
        const clone = templateCard.cloneNode(true);
        fragment.appendChild(clone);
    })

    card.appendChild(fragment);

}

formulario.addEventListener("submit", e => {
    e.preventDefault();
    const name = inputNombre.value.trim(); 
if (name) {
    getCharactersByName(name)
        .then(characters => {
            console.log(characters)

            characters.forEach(element => {
                console.log(element.name)

            });
            pintarCards(characters);


        });
      
}
  
});
btnTodos.addEventListener("click", e => {
    e.preventDefault();
    getCharacters()
    .then(characters => {
        console.log(characters)

        characters.forEach(element => {
            console.log(element.name)

        });
        pintarCards(characters);


    });
});

