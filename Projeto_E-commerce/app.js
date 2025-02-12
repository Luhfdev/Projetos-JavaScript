const API_URL = 'http://localhost:5000/products'; // URL do backend

let cart = []; // Carrinho vazio no começo

// Buscar produtos do backend e exibir na página
async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

// Renderizar produtos na página
function renderProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = ''; // Limpa antes de carregar

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');
        productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>R$ ${product.price.toFixed(2)}</p>
            <button onclick="addToCart('${product._id}', '${product.name}', ${product.price})">Adicionar ao Carrinho</button>
            <button onclick="deleteProduct('${product._id}')">Remover</button>
        `;
        productsContainer.appendChild(productCard);
    });
}

// Adicionar um produto ao carrinho
function addToCart(productId, productName, productPrice) {
    cart.push({ id: productId, name: productName, price: productPrice });
    document.getElementById('cart-count').textContent = cart.length;
    animateCartAddition();
    updateCartDisplay();
}

// Atualizar a exibição do carrinho
function updateCartDisplay() {
    const cartDetails = document.getElementById('cart-details');
    cartDetails.innerHTML = ''; // Limpa antes de exibir

    if (cart.length === 0) {
        cartDetails.innerHTML = '<p>O carrinho está vazio.</p>';
        return;
    }

    cart.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');
        productElement.innerHTML = `
            <span>${product.name}</span> - R$ ${product.price.toFixed(2)}
        `;
        cartDetails.appendChild(productElement);
    });
}

// Função para animação de adicionar ao carrinho
function animateCartAddition() {
    const cartElement = document.getElementById('cart');
    cartElement.classList.add('animate');
    setTimeout(() => cartElement.classList.remove('animate'), 500);
}

// Calcular o total do carrinho
function calculateTotal() {
    return cart.reduce((total, product) => total + product.price, 0);
}

// Finalizar compra (simulado)
document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length > 0) {
        const checkoutButton = document.getElementById('checkout');
        checkoutButton.textContent = 'Processando...';
        checkoutButton.disabled = true;

        setTimeout(() => {
            const total = calculateTotal();
            alert(`Compra finalizada com sucesso!\nTotal: R$ ${total.toFixed(2)}`);

            cart = [];
            document.getElementById('cart-count').textContent = '0';
            updateCartDisplay();

            checkoutButton.textContent = 'Checkout';
            checkoutButton.disabled = false;
        }, 2000);
    } else {
        alert('Carrinho vazio!');
    }
});

// Adicionar novo produto ao backend
async function addProduct() {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const imageUrl = document.getElementById('product-image').value;

    if (!name || !price || !imageUrl) {
        alert('Preencha todos os campos!');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, imageUrl })
        });

        if (response.ok) {
            alert('Produto adicionado com sucesso!');
            fetchProducts(); // Atualiza a lista de produtos
        }
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
    }
}

// Remover produto do backend
async function deleteProduct(productId) {
    try {
        const response = await fetch(`${API_URL}/${productId}`, { method: 'DELETE' });

        if (response.ok) {
            alert('Produto removido com sucesso!');
            fetchProducts(); // Atualiza a lista de produtos
        }
    } catch (error) {
        console.error('Erro ao remover produto:', error);
    }
}

// Carregar produtos ao iniciar a página
fetchProducts();
