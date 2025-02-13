document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();
    console.log("Formulário enviado!"); // Verifica se o evento está disparando corretamente
});

document.getElementById("login-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const email = document.getElementById("email").value;
    const password = document.getElementById("password").value;

    let customers = JSON.parse(localStorage.getItem("customers")) || [];

    // Verifica se o usuário existe e se a senha está correta
    const user = customers.find(c => c.email === email && c.password === password);

    if (user) {
        alert("Login bem-sucedido! Bem-vindo, " + user.name);
        localStorage.setItem("loggedInUser", JSON.stringify(user)); // Salvar usuário logado
        window.location.href = "../index.html"; // Redireciona para a página principal
    } else {
        alert("E-mail ou senha incorretos!");
    }
});
