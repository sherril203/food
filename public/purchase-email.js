// purchase.js
async function handlePurchase(event) {
    event.preventDefault();
    
    // Show loading state
    const submitButton = event.target.querySelector('button[type="submit"]');
    const originalButtonText = submitButton.textContent;
    submitButton.disabled = true;
    submitButton.textContent = 'Processing...';
    
    try {
        const orderId = generateOrderId();
        const orderDetails = {
            orderId,
            name: document.getElementById('name').value,
            email: document.getElementById('email').value,
            address: document.getElementById('address').value,
            mobile: document.getElementById('mobile').value,
            paymentMethod: document.querySelector('input[name="payment"]:checked').value
        };

        const cart = JSON.parse(localStorage.getItem('cart')) || [];

        const response = await fetch('http://localhost:3000/api/orders', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ orderDetails, cart })
        });

        const result = await response.json();
        
        if (result.success) {
            // Update modal content
            document.getElementById('order-id').textContent = orderId;
            
            // Show success message
            const modalContent = document.querySelector('.modal-content');
            modalContent.innerHTML = `
                <h3>Order Placed Successfully!</h3>
                <p>Your order ID: <span id="order-id">${orderId}</span></p>
                <p>A confirmation email has been sent to ${orderDetails.email}</p>
                <p>Thank you for shopping with us!</p>
                <button onclick="window.location.href='user-data.html'" class="continue-btn">Continue Shopping</button>
            `;
            
            document.getElementById('success-modal').style.display = 'block';
            
            // Clear cart
            localStorage.removeItem('cart');
        } else {
            throw new Error(result.message || 'Failed to process order');
        }
    } catch (error) {
        console.error('Error:', error);
        alert(`Error processing order: ${error.message}. Please try again or contact support.`);
    } finally {
        // Restore button state
        submitButton.disabled = false;
        submitButton.textContent = originalButtonText;
    }
}

// Close modal when clicking outside
window.onclick = function(event) {
    const modal = document.getElementById('success-modal');
    if (event.target === modal) {
        modal.style.display = 'none';
    }
}