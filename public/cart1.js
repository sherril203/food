// cart.js
// ... (previous code remains the same until updateCartDisplay function)

function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;

    cartContainer.innerHTML = '';
    
    let total = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <p>${item.name} (${item.weight})</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: ₹${item.price}</p>
            <p>Total: ₹${itemTotal}</p>
            <button onclick="removeFromCart('${item.id}')">Remove</button>
        `;
        
        cartContainer.appendChild(itemElement);
    });
    
    // Add total and purchase button
    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.innerHTML = `
        <h3>Total: ₹${total}</h3>
        ${total > 0 ? '<button onclick="proceedToPurchase()" class="purchase-btn">Proceed to Purchase</button>' : ''}
    `;
    cartContainer.appendChild(totalElement);
}

function proceedToPurchase() {
    window.location.href = 'purchase.html';
}

// ... (rest of the previous code remains the same)
