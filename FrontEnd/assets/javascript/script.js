console.log("samy");

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

    corbeille.addEventListener("click", async function (event) {
      event.preventDefault();

      let token = localStorage.getItem("accesToken");
      let workID = work.id;

      try {
        const response = await fetch(
          `http://localhost:5678/api/works/${workID}`,
          {
            method: "DELETE",
            headers: {
              Authorization: `Bearer ${token}`,
              Accept: "*/*", // Spécifie que n'importe quel type de réponse est accepté
            },
          }
        );

        if (response.ok) {
          console.log("L'élément a été supprimé avec succès.");
          start();
        } else {
          console.log("Problème lors de la suppression de l'élément.");
        }
      } catch (erreur) {
        console.log("Erreur lors de la requête DELETE:", erreur);
      }
    });

    corbeille.className = "btn-bin";
    binIcon.className = "fa-solid fa-trash-can";
    figureModal.className = "figure-modal-style";

    images.src = work.imageUrl;
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

  const photoCategorie = document.getElementById("photo-category");

  for (let i in dataCategories) {
    let categorie = dataCategories[i];
    console.log(categorie.name);
    console.log(categorie.id);
    console.log(categorie);

    let option = document.createElement("option");
    option.textContent = categorie.name;
    option.value = categorie.id;

    photoCategorie.appendChild(option);
  }

  dataCategories.forEach((category) => createFilterButton(category.name));
}

getCategories();

const filterArea = document.querySelector(".filterArea");

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
    filterWorks(categorie, data);
    setActiveCategorie(filterButton);
  });
}

function filterWorks(categorie, data) {
  if (categorie === "Tous") {
    displayWorks(data);
  } else {
    const filteredProject = data.filter(
      (item) => item.category.name === categorie
    );
    displayWorks(filteredProject);
  }
}

function setActiveCategorie(activeButton) {
  const filterButtons = document.querySelectorAll(".filterArea .filter-button");
  // on recupère tout les boutons de la section filterArea pour leur supprimé la valeur active
  filterButtons.forEach((button) => {
    button.classList.remove("active");
  });
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
  editionMode.style.display = "flex";
  modificationButton.style.display = "block";
  console.log("C'est bon, le token est présent.");
  logout.textContent = "logout";
} else {
  console.log("Pas de token trouvé.");
}
//});

logout.addEventListener("click", function () {
  localStorage.removeItem("accesToken");
  /* location.reload();*/
});

// ouverture et fermeture de la modale
const modal = document.querySelector(".modal");
const editButton = document.querySelector(".modification-btn");
const closeButton = document.querySelector(".close-button");
const addPhotoBtn = document.getElementById("add-photo-button");
const modalAjout = document.getElementById("modale-ajout");
const modalSuppression = document.getElementById("modale-suppression");
const closeBtnAjout = document.querySelector(".close-button-ajout");
const backButton = document.querySelector(".back-btn");

editButton.addEventListener("click", function () {
  modal.classList.remove("hidden");
});

closeButton.addEventListener("click", function () {
  modal.classList.add("hidden");
  modalAjout.classList.add("hidden");
});

addPhotoBtn.addEventListener("click", function () {
  modalSuppression.classList.add("hidden");
  modalAjout.classList.remove("hidden");

  closeBtnAjout.addEventListener("click", function () {
    modal.classList.add("hidden");
  });

  backButton.addEventListener("click", function () {
    modalAjout.classList.add("hidden");
    modalSuppression.classList.remove("hidden");
  });
});

const photoCategorie = document.getElementById("photo-category");
const titre = document.getElementById("titre");

const validePicture = document.querySelector(".validate-picture");
const errorImg = document.getElementById("error-img");
const addfile = document.querySelector(".add-file");
const imgWork = document.getElementById("img-work");

console.log("test");
// ne fonctionne pas encore
addfile.addEventListener("click", () => {
  imgWork.click();
});

const photoUploadedContainer = document.getElementById(
  "photo-uploaded-container"
);

// affiche l'image en petit format
function displayPreview() {
  imgWork.addEventListener("change", function () {
    const file = this.files[0];
    if (file) {
      const reader = new FileReader();
      reader.addEventListener("load", function () {
        photoUploadedContainer.innerHTML = `<img src="${this.result}" alt="photo Preview" class="photo-preview">`;
      });

      reader.readAsDataURL(file);
    }
  });
}

displayPreview();

const validatePicture = document.querySelector(".validate-picture");

function addProject() {
  console.log(titre.value, photoCategorie.value, imgWork.file[0]);

  if (titre.value && photoCategorie.value && imgWork.files[0] !== null) {
    validatePicture.classList.add("filled");
  }

  console.log("bonjour");
  validePicture.addEventListener("click", async function (event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("title", titre.value);
    formData.append("category", photoCategorie.value);
    formData.append("image", imgWork.files[0]);

    // quand il n'y a pas d'image je n'ai pas le msg d'erreur prblm à régler

    if (!titre.value || !photoCategorie.value || imgWork.files[0] === null) {
      errorImg.classList.remove("hidden");
    } else {
      try {
        const response = await fetch(api + "/works", {
          method: "POST",
          headers: {
            Authorization: `Bearer ${token}`,
            Accept: "application/json",
          },
          body: formData,
        });

        if (response.ok) {
          console.log("projet ajouté avec succès");
          modalAjout.classList.add("hidden");
          modal.classList.add("hidden");

          start();
        } else {
          console.log("un problème est survenu lors de l'envoie du projet");
        }
      } catch (erreur) {
        console.log(erreur);
        errorMessage.textContent =
          " une erreur est survenu veuillez réessayez plus tard";
      }
    }
  });
}

addProject();
