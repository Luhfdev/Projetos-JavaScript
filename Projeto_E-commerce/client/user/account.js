document.addEventListener("DOMContentLoaded", () => {
    const user = JSON.parse(localStorage.getItem("loggedUser"));

    if (!user) {
        alert("Você precisa estar logado para acessar esta página!");
        window.location.href = "../client/login.html";
        return;
    }

    // Exibir informações do usuário
    document.getElementById("user-name").textContent = user.name;
    document.getElementById("user-age").textContent = user.age;
    document.getElementById("user-gender").textContent = user.gender;
    document.getElementById("user-address").textContent = user.address;
    document.getElementById("user-email").textContent = user.email;
    document.getElementById("user-phone").textContent = user.phone;

    const editButton = document.getElementById("edit-button");
    const logoutButton = document.getElementById("logout-button");
    const editForm = document.getElementById("edit-form");

    editButton.addEventListener("click", () => {
        editForm.style.display = "block";
        document.getElementById("edit-name").value = user.name;
        document.getElementById("edit-age").value = user.age;
        document.getElementById("edit-gender").value = user.gender;
        document.getElementById("edit-address").value = user.address;
        document.getElementById("edit-phone").value = user.phone;
    });

    document.getElementById("save-button").addEventListener("click", () => {
        user.name = document.getElementById("edit-name").value;
        user.age = document.getElementById("edit-age").value;
        user.gender = document.getElementById("edit-gender").value;
        user.address = document.getElementById("edit-address").value;
        user.phone = document.getElementById("edit-phone").value;

        localStorage.setItem("loggedUser", JSON.stringify(user));

        alert("Dados atualizados com sucesso!");
        window.location.reload();
    });

    logoutButton.addEventListener("click", () => {
        localStorage.removeItem("loggedUser");
        alert("Você saiu da conta!");
        window.location.href = "../client/login.html";
    });
});
