let cart = JSON.parse(localStorage.getItem('cart')) || [];

function updateCartDisplay() {
    const cartDetails = document.getElementById('cart-details');
    cartDetails.innerHTML = '';

    if (cart.length === 0) {
        cartDetails.innerHTML = '<p>O carrinho está vazio.</p>';
        document.getElementById('total-price').textContent = '0.00';
        return;
    }

    let total = 0;

    cart.forEach((product, index) => {
        const productElement = document.createElement('div');
        productElement.classList.add('cart-item');
        productElement.innerHTML = `
            <div class="product-info">
                <span>${product.name} (x${product.quantity})</span>
                <span>R$ ${(product.price * product.quantity).toFixed(2)}</span>
            </div>
            <button class="remove" onclick="removeFromCart(${index})">Remover</button>
        `;
        cartDetails.appendChild(productElement);

        total += product.price * product.quantity;
    });

    document.getElementById('total-price').textContent = total.toFixed(2);
}

function removeFromCart(index) {
    if (cart[index].quantity > 1) {
        cart[index].quantity -= 1;
    } else {
        cart.splice(index, 1);
    }

    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartDisplay();
}

document.getElementById('checkout').addEventListener('click', () => {
    if (cart.length > 0) {
        alert(`Compra finalizada! Total: R$ ${cart.reduce((total, product) => total + product.price * product.quantity, 0).toFixed(2)}`);
        localStorage.removeItem('cart');
        cart = [];
        updateCartDisplay();
    } else {
        alert('Carrinho vazio!');
    }
});

updateCartDisplay();
