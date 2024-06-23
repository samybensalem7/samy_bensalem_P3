console.log("samy");

const api = "http://localhost:5678/api";

// récupere les works //
function getWorks() {
    fetch(api + "/works")
        .then(function (response) {
            return response.json();  
        })
        .then(function (data) {
          
            console.log(data);
            //on recupere recupere gallery qu'on met dans une constante 
            const gallery = document.querySelector(".gallery");
            for (let i in data) {
              let work = data[i]; 
              console.log(work);  
              console.log(work.title);
              console.log(work.imageUrl)

              let figcaption = document.createElement("figcaption");
              figcaption.textContent = work.title;

              let figure = document.createElement("figure");
              let images = document.createElement("img");
              
              images.src = work.imageUrl;

              figure.appendChild(images);
              figure.appendChild(figcaption);
              gallery.appendChild(figure);
            
            }

        })
}

getWorks();


