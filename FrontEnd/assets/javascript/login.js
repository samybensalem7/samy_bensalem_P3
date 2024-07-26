const api = "http://localhost:5678/api";


const form = document.querySelector("form");


function login(){
form.addEventListener("submit", async function (event)
{
    event.preventDefault();
    console.log("pas de rechargement de la page")

    // récupération des valeurs des champs 
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;


    let errorMessage = document.getElementById("error-message");


    // création de l'objet à formater en json
    const infoLogin = {
        email,
        password
    };

    //formatage en Json
    const informationSent = JSON.stringify(infoLogin);

    try {

        const response = await fetch(api + "/users/login",{
            method: "POST",
            headers: {"Content-Type": "application/json"},
            body: informationSent
        });
        const  data = await response.json();
        if(response.ok){
           const token = data.token;
           localStorage.setItem("accesToken",token);
           location.href = "index.html";
           console.log("t'as reussi");
            
        }
        else{
            //const errorData = (await response).json();
            console.log("connexion échoué");
            errorMessage.textContent="Email ou mot de passe incorrect"
        }

        }
        catch(erreur) {
            console.log(erreur);
            errorMessage.textContent= " une erreur est survenu veuillez réessayez plus tard"

        }

    
        

    // debuggage
    console.log(email);
    console.log(password);

  /*  verifierChamp(email);
    verifierChamp(password);

    verifierEmail(email);
    verifierMotDePasse(password);*/



});
}


login();

/* 
function verifierChamp (balise) {
    if(balise === ""){
        console.log("le champ est vide")
    }

}

function verifierEmail(balise){
    let emailRegExp = new RegExp("");
    if(emailRegExp.test(balise)){
        console.log("l'email est conforme");
    }
    else{
        console.log("l'email n'est pas conforme");
    }
}

function verifierMotDePasse(balise){
    let mdpRegExp = new RegExp("/^.{6,}$/");
    if(mdpRegExp.test(balise)){
        console.log("le mot de passe est valide")
    }
    else {
        console.log("le mot de passe n'est pas valide")
    }
    

}*/



