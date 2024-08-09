const api = "http://localhost:5678/api";

let data;

// on récupère les données des works
async function start() {
  const response = await fetch(api + "/works");
  data = await response.json();
  displayWorks(data);
}
// fonction pour l'affichage dynamique et la suppression des projets
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
          start();
        } else {
          console.log("Problème lors de la suppression de l'élément.");
        }
      } catch (erreur) {
        console.log("Erreur lors de la requête DELETE:", erreur);
      }
    });
    //
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
//récupération des categories et création de la liste deroulante pour le choix des catgeories
async function getCategories() {
  const response = await fetch("http://localhost:5678/api/categories");
  dataCategories = await response.json();

  const photoCategorie = document.getElementById("photo-category");

  for (let i in dataCategories) {
    let categorie = dataCategories[i];

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
//fonction pour la création des boutons de filtrage
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
// fonction pour filtrer les categories des projets
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
//changemenrt de couleur pour le bouton de la catégorie concernée
function setActiveCategorie(activeButton) {
  const filterButtons = document.querySelectorAll(".filterArea .filter-button");
  // on recupère tout les boutons de la section filterArea pour leur supprimé la valeur active
  filterButtons.forEach((button) => {
    button.classList.remove("active");
  });
  activeButton.classList.add("active");
}

const editionMode = document.getElementById("edition-mode");
const modificationButton = document.querySelector(".modification-btn");

let logout = document.getElementById("login");
// verification du token pour savoir si l'admin est encore connecté
const token = localStorage.getItem("accesToken");
if (token !== null) {
  editionMode.style.display = "flex";
  modificationButton.style.display = "block";
  logout.textContent = "logout";
} else {
  console.log("aucun token trouvé.");
}
//suppression du token en cas de deconnexion
logout.addEventListener("click", function () {
  localStorage.removeItem("accesToken");
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
  modalSuppression.classList.remove("hidden");
  modalAjout.classList.add("hidden");
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

addfile.addEventListener("click", () => {
  imgWork.click();
});

const photoUploadedContainer = document.getElementById(
  "photo-uploaded-container"
);

// affiche l'image du projet en petit format
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
//changement de couleur pour le bouton d'ajout d'un projet
const validatePicture = document.querySelector(".validate-picture");

photoCategorie.addEventListener("change", function (event) {
  if (titre.value && photoCategorie.value && imgWork.files.length > 0) {
    validatePicture.disabled = false;
  } else {
    validatePicture.disabled = true;
  }
});

titre.addEventListener("change", function (event) {
  if (titre.value && photoCategorie.value && imgWork.files.length > 0) {
    validatePicture.disabled = false;
  } else {
    validatePicture.disabled = true;
  }
});
//fonction pour ajouter un projet
function addProject() {
  validePicture.addEventListener("click", async function (event) {
    event.preventDefault();

    const formData = new FormData();

    formData.append("title", titre.value);
    formData.append("category", photoCategorie.value);
    formData.append("image", imgWork.files[0]);

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
