const API_URL = 'http://localhost:5000/products';

let cart = [];

async function fetchProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        renderProducts(products);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

function renderProducts(products) {
    const productsContainer = document.getElementById('products');
    productsContainer.innerHTML = '';

    products.forEach(product => {
        const productCard = document.createElement('div');
        productCard.classList.add('product-card');

        productCard.innerHTML = `
            <img src="${product.imageUrl}" alt="${product.name}">
            <h2>${product.name}</h2>
            <p>R$ ${product.price.toFixed(2)}</p>
            <div class="button-container">
                <button class="add-to-cart" onclick="addToCart('${product._id}', '${product.name}', ${product.price})">
                    Adicionar ao Carrinho
                </button>
                <div class="quantity-controls">
                    <button onclick="changeQuantity('${product._id}', -1)">-</button>
                    <span id="quantity-${product._id}">1</span>
                    <button onclick="changeQuantity('${product._id}', 1)">+</button>
                </div>
            </div>
        `;

        productsContainer.appendChild(productCard);
    });
}

function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    const quantity = parseInt(document.getElementById(`quantity-${productId}`).textContent) || 1;

    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += quantity; 
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity }); 
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0); 
    document.getElementById('cart-count').textContent = totalQuantity;

    animateCartAddition(); 
}

function removeFromCart(productId) {
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        if (cart[productIndex].quantity > 1) {
            cart[productIndex].quantity -= 1; 
        } else {
            cart.splice(productIndex, 1); 
        }
    }

    document.getElementById('cart-count').textContent = cart.length;
    updateCartDisplay();
}

function updateCartDisplay() {
    const cartDetails = document.getElementById('cart-details');
    cartDetails.innerHTML = '';

    if (cart.length === 0) {
        cartDetails.innerHTML = '<p>O carrinho está vazio.</p>';
        return;
    }

    cart.forEach(product => {
        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');
        productElement.innerHTML = `
            <span>${product.name} (x${product.quantity}) - R$ ${(product.price * product.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart('${product.id}')">Remover</button>
        `;
        cartDetails.appendChild(productElement);
    });
}

function animateCartAddition() {
    const cartElement = document.getElementById('cart');
    cartElement.classList.add('animate');
    setTimeout(() => cartElement.classList.remove('animate'), 500);
}

function calculateTotal() {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
}

function changeQuantity(productId, change) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    let currentQuantity = parseInt(quantityElement.textContent);

    currentQuantity = Math.max(1, currentQuantity + change);

    quantityElement.textContent = currentQuantity;

    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productInCart = cart.find(item => item.id === productId);
    
    if (productInCart) {
        productInCart.quantity = currentQuantity;
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

fetchProducts();
