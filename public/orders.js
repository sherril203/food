function displayOrders() {
  const ordersContainer = document.getElementById('orders-list');
  const orders = JSON.parse(localStorage.getItem('orders') || '[]');
  const loadingElement = document.getElementById('loading');

  if (loadingElement) {
      loadingElement.style.display = 'none';
  }

  if (orders.length === 0) {
      ordersContainer.innerHTML = '<p class="no-orders">No orders found.</p>';
      return;
  }

  ordersContainer.innerHTML = orders.map(order => `
      <div class="order-card">
          <div class="order-header">
              <h3>Order ID: ${order.orderId}</h3>
              <span class="order-date">${order.date} ${order.time}</span>
          </div>
          <div class="order-details">
              <p><strong>Name:</strong> ${order.name}</p>
              <p><strong>Address:</strong> ${order.address}</p>
              <p><strong>Mobile:</strong> ${order.mobile}</p>
              <p><strong>Payment Method:</strong> ${order.paymentMethod}</p>
              <p><strong>Payment Details:</strong> ${order.paymentDetails}</p>
          </div>
          <div class="order-items">
              <h4>Ordered Items:</h4>
              <p>${order.items}</p>
              <p class="total-cost"><strong>Total Amount:</strong> ${order.orderAmount}</p>
          </div>
      </div>
  `).join('');
}

// Call displayOrders when the orders page loads
if (document.getElementById('orders-list')) {
  displayOrders();
}