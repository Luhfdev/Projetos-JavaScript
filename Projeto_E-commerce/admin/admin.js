const API_URL = 'http://localhost:5000/products'; // URL do backend

// Buscar produtos e exibir na página de administração
async function fetchAdminProducts() {
    try {
        const response = await fetch(API_URL);
        const products = await response.json();
        renderAdminProducts(products);
    } catch (error) {
        console.error('Erro ao buscar produtos:', error);
    }
}

// Renderizar produtos na tela de administração
function renderAdminProducts(products) {
    const adminProductsContainer = document.getElementById('admin-products-list');
    adminProductsContainer.innerHTML = '';

    products.forEach(product => {
        const productRow = document.createElement('div');
        productRow.classList.add('admin-product');
        productRow.innerHTML = `
            <div class="product-image">
                <img src="${product.imageUrl}" alt="${product.name}">
            </div>
            <div class="product-details">
                <span><strong>${product.name}</strong> - R$ ${product.price.toFixed(2)} - Estoque: ${product.stock}</span>
            </div>
            <button onclick="deleteProduct('${product._id}')">🗑 Excluir</button>
        `;
        adminProductsContainer.appendChild(productRow);
    });
}

// Adicionar novo produto ao backend
async function addProduct() {
    const name = document.getElementById('product-name').value;
    const price = parseFloat(document.getElementById('product-price').value);
    const stock = parseInt(document.getElementById('product-stock').value); // Garantir que seja um número inteiro
    const imageUrl = document.getElementById('product-image').value;

    // Validar campos
    if (!name || !price || !imageUrl || isNaN(stock) || stock < 0) {
        alert('Preencha todos os campos corretamente!');
        return;
    }

    try {
        const response = await fetch(API_URL, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, price, stock, imageUrl }) // Enviar estoque corretamente
        });

        if (response.ok) {
            alert('Produto adicionado com sucesso!');
            fetchAdminProducts(); // Recarregar os produtos após adicionar
        } else {
            const result = await response.json();
            alert(result.error || 'Erro ao adicionar o produto');
        }
    } catch (error) {
        console.error('Erro ao adicionar produto:', error);
    }
}

// Remover produto do backend
async function deleteProduct(productId) {
    const confirmDelete = confirm("Tem certeza que deseja excluir este produto?");
    if (!confirmDelete) return;

    try {
        const response = await fetch(`${API_URL}/${productId}`, { method: 'DELETE' });

        if (response.ok) {
            alert('Produto removido com sucesso!');
            fetchAdminProducts(); // Recarregar os produtos após remoção
        } else {
            alert('Erro ao remover o produto.');
        }
    } catch (error) {
        console.error('Erro ao remover produto:', error);
    }
}

// Carregar produtos ao iniciar a página de administração
fetchAdminProducts();
