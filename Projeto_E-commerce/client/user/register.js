document.getElementById("register-form").addEventListener("submit", function(event) {
    event.preventDefault();

    const name = document.getElementById("name").value;
    const age = document.getElementById("age").value;
    const gender = document.getElementById("gender").value;
    const address = document.getElementById("address").value;
    const email = document.getElementById("email").value;
    const phone = document.getElementById("phone").value;
    const password = document.getElementById("password").value;

    let customers = JSON.parse(localStorage.getItem("customers")) || [];

    // Verifica se o e-mail já foi cadastrado
    if (customers.some(c => c.email === email)) {
        alert("Este e-mail já está cadastrado!");
        return;
    }

    // Armazena os dados no localStorage
    customers.push({ name, age, gender, address, email, phone, password });
    localStorage.setItem("customers", JSON.stringify(customers));

    alert("Cadastro realizado com sucesso!");
    window.location.href = "login.html"; // Redireciona para login
});
