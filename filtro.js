const formulario = document.getElementById("formulario2");
const inputGenero = document.getElementById("genero");
const inputPelo = document.getElementById("pelo");
const inputOcupacion = document.getElementById("ocupacion");
const card = document.getElementById("card");
const templateCard = document.getElementById("template-card").content;
const fragment = document.createDocumentFragment();
const urlCharacters = "https://bobsburgers-api.herokuapp.com/characters"
const urlCharacters2 = "https://bobsburgers-api.herokuapp.com/characters?"

async function getCharactersByGender(gender) {
    const urlFetch = urlCharacters + "?gender=" +gender;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}

async function getCharactersByHair(hair) {
    const urlFetch = urlCharacters + "?hairColor=" +hair;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}

async function getCharactersByOccupation(occupation) {
    const urlFetch = urlCharacters + "?occupation=" +occupation;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}

async function getCharactersByGenderAndHair(gender,hair) {
    const urlFetch = urlCharacters2 + "gender=" +gender+ "&hairColor=" +hair;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}

async function getCharactersByGenderAndOccupation(gender,occupation) {
    const urlFetch = urlCharacters2 + "gender=" +gender+ "&occupation=" +occupation;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}
async function getCharactersByHairAndOccupation(hair,occupation) {
    const urlFetch = urlCharacters2 + "hairColor=" +hair+ "&occupation=" +occupation;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
}

async function getCharactersByAll(gender, hair,occupation) {
    const urlFetch = urlCharacters2 + "gender="+gender+ "&hairColor=" +hair+ "&occupation=" +occupation;
    const response = await fetch(urlFetch);
    const json = await response.json();
    return json;
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
    const gender = inputGenero.value.trim(); 
    const hair = inputPelo.value.trim();
    const occupation = inputOcupacion.value.trim();

if (gender && hair && occupation) {

    getCharactersByAll(gender,hair,occupation)
        .then(characters => {
            console.log(characters)

            characters.forEach(element => {
                console.log(element.name)

            });
            pintarCards(characters);


        });

}else if(gender && hair) {
    getCharactersByGenderAndHair(gender,hair)
        .then(characters => {
            console.log(characters)

            characters.forEach(element => {
                console.log(element.name)

            });
            pintarCards(characters);


        });
      
    }else if(occupation && hair) {
        getCharactersByHairAndOccupation(hair,occupation)
            .then(characters => {
                console.log(characters)
    
                characters.forEach(element => {
                    console.log(element.name)
    
                });
                pintarCards(characters);
    
    
            });
          
} else if (gender && occupation) {
    getCharactersByGenderAndOccupation(gender,occupation)
        .then(characters => {
            console.log(characters)

            characters.forEach(element => {
                console.log(element.name)

            });
            pintarCards(characters);


        });

} else if(hair) {

    getCharactersByHair(hair)
        .then(characters => {
            console.log(characters)

            characters.forEach(element => {
                console.log(element.name)

            });
            pintarCards(characters);


        });

} else if(occupation) {

    getCharactersByOccupation(occupation)
        .then(characters => {
            console.log(characters)

            characters.forEach(element => {
                console.log(element.name)

            });
            pintarCards(characters);


        });
} else if(gender) {

    
        getCharactersByGender(gender)
        .then(characters => {
            console.log(characters)

            characters.forEach(element => {
                console.log(element.name)

            });
            pintarCards(characters);


        });

} 



  
});