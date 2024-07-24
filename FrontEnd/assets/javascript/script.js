console.log("samy")


const api = "http://localhost:5678/api";

//variable globale (grand portée)
let data;

// on récupère les données des works 
async function start() {
    const response = await fetch(api + "/works");
    data = await response.json();
    displayWorks(data);
    //debug

}


function displayWorks(data) {

    let gallery = document.querySelector(".gallery");
    let modalGallery = document.querySelector(".modal-gallery");

    gallery.innerHTML = "";
    modalGallery.innerHTML = "";

    for (let i in data) {
        let work = data[i];


        let figcaption = document.createElement("figcaption");
        figcaption.textContent = work.title;


        let figure = document.createElement("figure");
        let images = document.createElement("img");

        let figureModal = document.createElement("figure");
        let imageModal = document.createElement("img");
        let corbeille = document.createElement("button");
        let binIcon = document.createElement("i");


        
        corbeille.addEventListener('click', async function(event) {
            event.preventDefault();

            let token = localStorage.getItem("accesToken"); 
            let workID = work.id;
        
            try {
                const response = await fetch(`http://localhost:5678/api/works/${workID}`, {
                    method: 'DELETE',
                    headers: {Authorization: "Bearer " + token }
                });
        
                if (response.ok) {
                    console.log("L'élément a été supprimé avec succès.");
                } else {
                    console.log("Problème lors de la suppression de l'élément.");
                }
            } catch (erreur) {
                console.log("Erreur lors de la requête DELETE:", erreur);
            }
        });
        

        corbeille.className = 'btn-bin';
        binIcon.className = 'fa-solid fa-trash-can';
        figureModal.className = 'figure-modal-style';

        images.src = work.imageUrl
        imageModal.src = work.imageUrl;


        figure.appendChild(images);
        figure.appendChild(figcaption);
        gallery.appendChild(figure);



        figureModal.appendChild(imageModal);
        figureModal.appendChild(corbeille);
        corbeille.appendChild(binIcon);
        modalGallery.appendChild(figureModal);



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

async function getCategories() {
    const response = await fetch("http://localhost:5678/api/categories");
    dataCategories = await response.json();


    for (let i in dataCategories) {
        let categorie = dataCategories[i];
        console.log(categorie.name);
        console.log(categorie.id);
        console.log(categorie);
    }



    dataCategories.forEach(category => createFilterButton(category.name));


}

getCategories();

const filterArea = document.querySelector(".filterArea")

createFilterButton("Tous");

function createFilterButton(categorie) {
    const filterButton = document.createElement("button");
    const textButton = document.createElement("span");
    textButton.textContent = categorie;
    filterButton.classList.add("filter-button");
    if (categorie === "Tous") {
        filterButton.classList.add("active");
    }
    textButton.classList.add("textButton");
    filterArea.appendChild(filterButton);
    filterButton.appendChild(textButton);

    filterButton.addEventListener("click", () => {
        filterWorks(categorie, data)
        setActiveCategorie(filterButton);
    })
}


function filterWorks(categorie, data) {
    if (categorie === "Tous") {
        displayWorks(data)
    }
    else {
        const filteredProject = data.filter(item => item.category.name === categorie);
        displayWorks(filteredProject);
    }

}


function setActiveCategorie(activeButton) {
    const filterButtons = document.querySelectorAll(".filterArea .filter-button");
    // on recupère tout les boutons de la section filterArea pour leur supprimé la valeur active
    filterButtons.forEach(button => {
        button.classList.remove("active");
    })
    activeButton.classList.add("active");

}




/*
function stayConnected(){
    const token = localStorage.getItem("accessToken")
    if(token !== null){
        editionMode.style.display = 'block';
        modificationButton.style.display = 'block';
        console.log("ca marche")
    }
    else {
        console.log("bah ca marche pas ")
        /* ne rien faire*/
//   }
//}

const editionMode = document.getElementById("edition-mode");
const modificationButton = document.querySelector(".modification-btn");

let logout = document.getElementById("login");


// 173
//document.addEventListener('DOMContentLoaded', function() {
const token = localStorage.getItem("accesToken");
console.log(token);
if (token !== null) {
    editionMode.style.display = 'flex';
    modificationButton.style.display = 'block';
    console.log("C'est bon, le token est présent.");
    logout.textContent = "logout";
} else {
    console.log("Pas de token trouvé.");

}
//});


logout.addEventListener('click', function () {
    localStorage.removeItem('accesToken');
    /* location.reload();*/
})


// ouverture et fermeture de la modale 
const modal = document.querySelector(".modal");
const editButton = document.querySelector(".modification-btn");
const closeButton = document.querySelector(".close-button");
const addPhotoBtn = document.getElementById("add-photo-button");
const modalAjout = document.getElementById("modale-ajout");
const modalSuppression = document.getElementById("modale-suppression");
const closeBtnAjout = document.querySelector(".close-button-ajout");
const backButton = document.querySelector(".back-btn");

editButton.addEventListener('click', function () {
    modal.classList.remove("hidden");
});

closeButton.addEventListener('click', function () {
    modal.classList.add("hidden");
    modalAjout.classList.add("hidden");
});

addPhotoBtn.addEventListener('click', function () {
    modalSuppression.classList.add("hidden");
    modalAjout.classList.remove("hidden");

    closeBtnAjout.addEventListener('click', function () {
        modal.classList.add('hidden');
    })

    backButton.addEventListener('click', function () {
        modalAjout.classList.add("hidden");
        modalSuppression.classList.remove("hidden");
    })



})

















