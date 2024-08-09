const api = "http://localhost:5678/api";

const form = document.querySelector("form");

function login() {
  form.addEventListener("submit", async function (event) {
    event.preventDefault();

    // récupération des valeurs des champs
    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let errorMessage = document.getElementById("error-message");

    // création de l'objet à formater en json
    const infoLogin = {
      email,
      password,
    };

    //formatage en Json
    const informationSent = JSON.stringify(infoLogin);

    try {
      const response = await fetch(api + "/users/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: informationSent,
      });
      const data = await response.json();
      if (response.ok) {
        const token = data.token;
        localStorage.setItem("accesToken", token);
        location.href = "index.html";
      } else {
        errorMessage.textContent = "Email ou mot de passe incorrect";
      }
    } catch (erreur) {
      errorMessage.textContent =
        " une erreur est survenu veuillez réessayez plus tard";
    }
  });
}

login();
