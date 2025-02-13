document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("Formulário enviado!");
});

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let customers = JSON.parse(localStorage.getItem("customers")) || [];

    const user = customers.find(c => c.email === email && c.password === password);

    if (user) {
        alert("Login bem-sucedido! Bem-vindo, " + user.name);
        localStorage.setItem("loggedInUser", JSON.stringify(user));
        window.location.href = "../index.html";
    } else {
        alert("E-mail ou senha incorretos!");
    }
});
