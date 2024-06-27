console.log("samy")

const api = "http://localhost:5678/api";

//variable globale (grand portéé)
let data;

// on récupère les données des works 
async function start(){
    const response = await fetch(api + "/works");
    data = await response.json();
    displayWorks(data);
    //debug

}

function displayWorks(data){

    let gallery = document.querySelector(".gallery");

    gallery.innerHTML = "";

    for (let i in data){
        let work = data[i];

        let figcaption = document.createElement("figcaption");
            figcaption.textContent = work.title;

              let figure = document.createElement("figure");
              let images = document.createElement("img");
              
              images.src = work.imageUrl;

              figure.appendChild(images);
              figure.appendChild(figcaption);
              gallery.appendChild(figure);

}


}

start();

// récupere les works //

//async function getWorks() {
    /*fetch(api + "/works")
        .then(function (response) {
            return response.json();  
        })
        .then(function (data) { */
/*
        const response = await fetch(api + "/works");
        data = await response.json();
          
            console.log(data);
            //on recupere recupere gallery qu'on met dans une constante 
            const gallery = document.querySelector(".gallery");
            for (let i in data) {
              let work = data[i]; 
              console.log(work);  
              console.log(work.title);
              console.log(work.categoryId);

              let figcaption = document.createElement("figcaption");
              figcaption.textContent = work.title;

              let figure = document.createElement("figure");
              let images = document.createElement("img");
              
              images.src = work.imageUrl;

              figure.appendChild(images);
              figure.appendChild(figcaption);
              gallery.appendChild(figure);
            
            }

        }


getWorks();*/

async function getCategories(){
   const response = await fetch("http://localhost:5678/api/categories");
   dataCategories = await response.json();
   

   for(let i in dataCategories){
    let categorie = dataCategories[i];
    console.log(categorie.name);
    console.log(categorie.id);
    console.log(categorie); 
    }


    
    dataCategories.forEach(category => createFilterButton(category.name));

    
}

getCategories();

const filterArea = document.querySelector(".filterArea")

createFilterButton("Tous")

function createFilterButton(categorie){
    const filterButton = document.createElement("button");
    const textButton = document.createElement("span"); 
    textButton.textContent = categorie;
    filterButton.classList.add("filter-button");
    textButton.classList.add("textButton");
    filterArea.appendChild(filterButton);
    filterButton.appendChild(textButton);

    filterButton.addEventListener("click", () => {
        filterWorks(categorie, data)
    })
}



function filterWorks(categorie, data){
    if( categorie === "Tous"){
        displayWorks(data)
    }
    else {
        const filteredProject = data.filter(item => item.category.name === categorie);
        displayWorks(filteredProject);
    }

}

/*    let monBouton = document.getElementById("monBouton");
monBouton.addEventListener("click", function () {
    console.log("Vous avez cliqué sur le bouton")
});*/




