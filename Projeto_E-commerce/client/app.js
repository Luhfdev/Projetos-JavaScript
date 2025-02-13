const API_URL = 'http://localhost:5000/products'; // URL do backend

let cart = []; // Carrinho vazio no início

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


// Adicionar um produto ao carrinho e salvar no localStorage
function addToCart(productId, productName, productPrice) {
    let cart = JSON.parse(localStorage.getItem('cart')) || [];

    // Obter a quantidade atual do produto
    const quantity = parseInt(document.getElementById(`quantity-${productId}`).textContent) || 1;

    const existingProduct = cart.find(item => item.id === productId);
    if (existingProduct) {
        existingProduct.quantity += quantity;  // Soma a quantidade se já existir no carrinho
    } else {
        cart.push({ id: productId, name: productName, price: productPrice, quantity });  // Caso contrário, adiciona novo item
    }

    localStorage.setItem('cart', JSON.stringify(cart));

    // Atualiza o contador no carrinho com a quantidade total de produtos
    const totalQuantity = cart.reduce((total, item) => total + item.quantity, 0);  // Soma todas as quantidades
    document.getElementById('cart-count').textContent = totalQuantity;  // Exibe o total de itens no carrinho

    animateCartAddition();  // Animação do carrinho
}

// Remover um produto do carrinho
function removeFromCart(productId) {
    const productIndex = cart.findIndex(item => item.id === productId);

    if (productIndex !== -1) {
        if (cart[productIndex].quantity > 1) {
            cart[productIndex].quantity -= 1; // Reduz a quantidade
        } else {
            cart.splice(productIndex, 1); // Remove o item se for a última unidade
        }
    }

    document.getElementById('cart-count').textContent = cart.length;
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
            <span>${product.name} (x${product.quantity}) - R$ ${(product.price * product.quantity).toFixed(2)}</span>
            <button onclick="removeFromCart('${product.id}')">Remover</button>
        `;
        cartDetails.appendChild(productElement);
    });
}

// Animação ao adicionar ao carrinho
function animateCartAddition() {
    const cartElement = document.getElementById('cart');
    cartElement.classList.add('animate');
    setTimeout(() => cartElement.classList.remove('animate'), 500);
}

// Calcular o total do carrinho
function calculateTotal() {
    return cart.reduce((total, product) => total + product.price * product.quantity, 0);
}

function changeQuantity(productId, change) {
    const quantityElement = document.getElementById(`quantity-${productId}`);
    let currentQuantity = parseInt(quantityElement.textContent);

    // Atualiza a quantidade, mas não permite que seja menor que 1
    currentQuantity = Math.max(1, currentQuantity + change);

    quantityElement.textContent = currentQuantity; // Atualiza o valor mostrado

    // Atualiza no carrinho armazenado em localStorage
    let cart = JSON.parse(localStorage.getItem('cart')) || [];
    const productInCart = cart.find(item => item.id === productId);
    
    if (productInCart) {
        productInCart.quantity = currentQuantity;
    }
    
    localStorage.setItem('cart', JSON.stringify(cart));
}

// Carregar produtos ao iniciar a página
fetchProducts();
