// Definir um array de produtos
const products = [
    { id: 1, name: 'Produto 1', price: 99.99, image: 'produto1.jpg' },
    { id: 2, name: 'Produto 2', price: 149.99, image: 'produto2.jpg' },
    { id: 3, name: 'Produto 3', price: 79.99, image: 'produto3.jpg' }
];

// Referência à seção de produtos no HTML
const productsContainer = document.getElementById('products');

// Gerar os cards dos produtos
products.forEach(product => {
    const productCard = document.createElement('div');
    productCard.classList.add('product-card'); // A classe para o card do produto
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}">
        <h2>${product.name}</h2>
        <p>R$ ${product.price.toFixed(2)}</p>
        <button onclick="addToCart(${product.id})">Adicionar ao Carrinho</button>
    `;
    productsContainer.appendChild(productCard);
});

let cart = []; // Carrinho vazio no começo

// Função para adicionar um produto ao carrinho
function addToCart(productId) {
    // Encontre o produto pelo ID
    const product = products.find(p => p.id === productId);
    if (product) {
        cart.push(product); // Adiciona o produto ao carrinho
        document.getElementById('cart-count').textContent = cart.length; // Atualiza o contador de itens
        animateCartAddition(); // Função de animação (vamos adicionar depois)
        updateCartDisplay();
    }
}

// Função para atualizar o carrinho visualmente
function updateCartDisplay() {
    const cartDetails = document.getElementById('cart-details');
    cartDetails.innerHTML = ''; // Limpar o conteúdo antes de adicionar

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

// Função para calcular o total do carrinho
function calculateTotal() {
    return cart.reduce((total, product) => total + product.price, 0);
}

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
            updateCartDisplay(); // Limpar a exibição do carrinho

            checkoutButton.textContent = 'Checkout';
            checkoutButton.disabled = false;
        }, 2000); // Simula um processamento de 2 segundos
    } else {
        alert('Carrinho vazio!');
    }
});



