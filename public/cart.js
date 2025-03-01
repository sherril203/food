// cart.js

// Store cart items in localStorage with proper initialization
let cart = [];
try {
    const savedCart = localStorage.getItem('cart');
    cart = savedCart ? JSON.parse(savedCart).filter(item => item && item.id && item.name) : [];
} catch (error) {
    console.error('Error loading cart:', error);
    cart = [];
}

function AddToCart(productId, quantity) {
    if (!productId || !quantity || quantity < 1) {
        console.error('Invalid product or quantity');
        return;
    }

    const products = {
        'urad-1kg': { name: 'Urad Dhal', price: 120, weight: '1kg' },
        'urad-2kg': { name: 'Urad Dhal', price: 205, weight: '2kg' },
        'urad-3kg': { name: 'Urad Dhal', price: 300, weight: '3kg' },
        'urad-4kg': { name: 'Urad Dhal', price: 450, weight: '4kg' },
        'urad-50g': { name: 'Urad Dhal', price: 50, weight: '50g' },
        'Idly-rice-1kg': { name: 'Idly Rice', price: 120, weight: '1kg' },
        'Idly-rice-2kg': { name: 'Idly Rice', price: 205, weight: '2kg' },
        'Idly-rice-3kg': { name: 'Idly Rice', price: 300, weight: '3kg' },
        'Black-pepper-1kg': { name: 'Black Pepper', price: 120, weight: '1kg' },
        'Black-pepper-2kg': { name: 'Black Pepper', price: 205, weight: '2kg' },
        'Black-pepper-3kg': { name: 'Black Pepper', price: 300, weight: '3kg' },
        'cumin-seeds-1kg': { name: 'Cumin Seeds', price: 120, weight: '1kg' },
        'cumin-seeds-2kg': { name: 'Cumin Seeds', price: 205, weight: '2kg' },
        'cumin-seeds-3kg': { name: 'Cumin Seeds', price: 300, weight: '3kg' },
        'fenugreek-1kg': { name: 'Fenugreek', price: 120, weight: '1kg' },
        'fenugreek-2kg': { name: 'Fenugreek', price: 205, weight: '2kg' },
        'fenugreek-3kg': { name: 'fenugreek', price: 300, weight: '3kg' },
        'kismis-raisin-1kg': { name: 'Kismis Raisin', price: 120, weight: '1kg' },
        'kismis-raisin-2kg': { name: 'Kismis Raisin', price: 205, weight: '2kg' },
        'kismis-raisin-3kg': { name: 'Kismis Raisin', price: 300, weight: '3kg' },
        'cashew-nut-1kg': { name: 'Cashew Nut', price: 120, weight: '1kg' },
        'cashew-nut-2kg': { name: 'Cashew Nut', price: 205, weight: '2kg' },
        'cashew-nut-3kg': { name: 'Cashew Nut', price: 300, weight: '3kg' },
        'moong-dhal-1kg': { name: 'Moong Dhal', price: 120, weight: '1kg' },
        'moong-dhal-2kg': { name: 'Moong Dhal', price: 205, weight: '2kg' },
        'moong-dhal-3kg': { name: 'Moong Dhal', price: 300, weight: '3kg' },
    };
    
    const product = products[productId];
    
    if (!product) {
        console.error('Product not found:', productId);
        return;
    }

    try {
        // Check if item already exists in cart
        const existingItemIndex = cart.findIndex(item => item.id === productId);
        
        if (existingItemIndex !== -1) {
            cart[existingItemIndex].quantity += quantity;
        } else {
            cart.push({
                id: productId,
                name: product.name,
                price: product.price,
                weight: product.weight,
                quantity: quantity
            });
        }
        
        // Save to localStorage
        localStorage.setItem('cart', JSON.stringify(cart));
        
        // Update cart display
        updateCartDisplay();
        
        // Show confirmation message
        alert(`Added ${product.name} (${product.weight}) to cart`);
    } catch (error) {
        console.error('Error adding to cart:', error);
        alert('Error adding item to cart. Please try again.');
    }
}

function updateCartDisplay() {
    const cartContainer = document.getElementById('cart-items');
    if (!cartContainer) return;

    cartContainer.innerHTML = '';
    
    let total = 0;
    
    // Filter out any invalid items
    const validCart = cart.filter(item => 
        item && 
        item.name && 
        item.price && 
        item.quantity && 
        !isNaN(item.price) && 
        !isNaN(item.quantity)
    );
    
    validCart.forEach(item => {
        const itemTotal = Number(item.price) * Number(item.quantity);
        if (!isNaN(itemTotal)) {
            total += itemTotal;
        }
        
        const itemElement = document.createElement('div');
        itemElement.className = 'cart-item';
        itemElement.innerHTML = `
            <p>${item.name} (${item.weight || ''})</p>
            <p>Quantity: ${item.quantity}</p>
            <p>Price: ₹${item.price}</p>
            <p>Total: ₹${itemTotal}</p>
            <button onclick="removeFromCart('${item.id}')" class="remove-button">Remove</button>
        `;
        
        cartContainer.appendChild(itemElement);
    });
    
    // Add total only if it's a valid number
    const totalElement = document.createElement('div');
    totalElement.className = 'cart-total';
    totalElement.innerHTML = `<h3>Total: ₹${isNaN(total) ? 0 : total}</h3>`;
    cartContainer.appendChild(totalElement);

    // Add purchase button only if cart has items
    if (validCart.length > 0) {
        const purchaseButton = document.createElement('button');
        purchaseButton.className = 'purchase-button';
        purchaseButton.textContent = 'Proceed to Checkout';
        purchaseButton.onclick = () => {
            window.location.href = 'purchase.html';
        };
        cartContainer.appendChild(purchaseButton);
    }
}

function removeFromCart(productId) {
    if (!productId) return;
    
    try {
        cart = cart.filter(item => item && item.id && item.id !== productId);
        localStorage.setItem('cart', JSON.stringify(cart));
        updateCartDisplay();
    } catch (error) {
        console.error('Error removing item from cart:', error);
        alert('Error removing item. Please try again.');
    }
}

// Initialize cart display when page loads
document.addEventListener('DOMContentLoaded', () => {
    try {
        updateCartDisplay();
    } catch (error) {
        console.error('Error initializing cart display:', error);
    }
});
