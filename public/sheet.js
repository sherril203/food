// sheet.js

class PurchaseDataHandler {
  constructor() {
      // Initialize local storage if not exists
      if (!localStorage.getItem('purchaseData')) {
          localStorage.setItem('purchaseData', JSON.stringify([]));
      }
      if (!localStorage.getItem('lastOrderId')) {
          localStorage.setItem('lastOrderId', '0');
      }
  }

  // Generate unique order ID
  generateOrderId() {
      const lastId = parseInt(localStorage.getItem('lastOrderId'));
      const newId = lastId + 1;
      const paddedId = newId.toString().padStart(6, '0');
      const prefix = 'ORD';
      const timestamp = new Date().getFullYear().toString().substr(-2);
      
      localStorage.setItem('lastOrderId', newId.toString());
      return `${prefix}${timestamp}${paddedId}`;
  }

  // Save purchase data
  savePurchaseData(formData) {
      const orderId = this.generateOrderId();
      const timestamp = new Date().toISOString();

      const purchaseRecord = {
          orderId: orderId,
          timestamp: timestamp,
          customerName: formData.name,
          address: formData.address,
          mobile: formData.mobile,
          paymentMethod: formData.paymentMethod,
          paymentDetails: formData.paymentMethod === 'card' ? 
              {
                  cardNumber: this.maskCardNumber(formData.cardNumber),
                  expiry: formData.expiry
              } : 
              {
                  upiId: formData.upiId
              },
          orderAmount: formData.orderAmount,
          items: formData.items
      };

      const existingData = JSON.parse(localStorage.getItem('purchaseData'));
      existingData.push(purchaseRecord);
      localStorage.setItem('purchaseData', JSON.stringify(existingData));

      return orderId;
  }

  // Mask card number for security
  maskCardNumber(cardNumber) {
      return `****-****-****-${cardNumber.slice(-4)}`;
  }

  // Get all purchase records
  getAllPurchases() {
      return JSON.parse(localStorage.getItem('purchaseData'));
  }

  // Get purchase by order ID
  getPurchaseByOrderId(orderId) {
      const purchases = this.getAllPurchases();
      return purchases.find(purchase => purchase.orderId === orderId);
  }

  // Export data to CSV format
  exportToCSV() {
      const purchases = this.getAllPurchases();
      const headers = [
          'Order ID',
          'Timestamp',
          'Customer Name',
          'Address',
          'Mobile',
          'Payment Method',
          'Payment Details',
          'Order Amount',
          'Items'
      ];

      const csvRows = [headers];

      for (const purchase of purchases) {
          const row = [
              purchase.orderId,
              purchase.timestamp,
              purchase.customerName,
              purchase.address,
              purchase.mobile,
              purchase.paymentMethod,
              JSON.stringify(purchase.paymentDetails),
              purchase.orderAmount,
              JSON.stringify(purchase.items)
          ];
          csvRows.push(row);
      }

      return csvRows.map(row => row.join(',')).join('\n');
  }
}

// Handle form submission
function handlePurchase(event) {
  event.preventDefault();
  
  const form = event.target;
  const dataHandler = new PurchaseDataHandler();

  // Get form data
  const formData = {
      name: form.querySelector('#name').value,
      address: form.querySelector('#address').value,
      mobile: form.querySelector('#mobile').value,
      paymentMethod: form.querySelector('input[name="payment"]:checked').value,
      orderAmount: calculateOrderAmount(), // You'll need to implement this based on your cart
      items: getCartItems() // You'll need to implement this based on your cart
  };

  // Add payment details based on method
  if (formData.paymentMethod === 'card') {
      formData.cardNumber = form.querySelector('#card-number').value;
      formData.expiry = form.querySelector('#expiry').value;
  } else {
      formData.upiId = form.querySelector('#upi-id').value;
  }

  // Save data and get order ID
  const orderId = dataHandler.savePurchaseData(formData);

  // Show success modal
  const modal = document.getElementById('success-modal');
  const orderIdSpan = document.getElementById('order-id');
  orderIdSpan.textContent = orderId;
  modal.style.display = 'block';

  // Clear form
  form.reset();
}

// Helper function to calculate order amount (implement based on your cart)
function calculateOrderAmount() {
  // Implement based on your cart implementation
  return 0;
}

// Helper function to get cart items (implement based on your cart)
function getCartItems() {
  // Implement based on your cart implementation
  return [];
}

// Event listeners for payment method toggle
document.addEventListener('DOMContentLoaded', () => {
  const paymentInputs = document.querySelectorAll('input[name="payment"]');
  const cardDetails = document.getElementById('card-details');
  const upiDetails = document.getElementById('upi-details');

  paymentInputs.forEach(input => {
      input.addEventListener('change', (e) => {
          if (e.target.value === 'card') {
              cardDetails.style.display = 'block';
              upiDetails.style.display = 'none';
              document.getElementById('upi-id').removeAttribute('required');
              document.getElementById('card-number').setAttribute('required', '');
              document.getElementById('expiry').setAttribute('required', '');
              document.getElementById('cvv').setAttribute('required', '');
          } else {
              cardDetails.style.display = 'none';
              upiDetails.style.display = 'block';
              document.getElementById('upi-id').setAttribute('required', '');
              document.getElementById('card-number').removeAttribute('required');
              document.getElementById('expiry').removeAttribute('required');
              document.getElementById('cvv').removeAttribute('required');
          }
      });
  });
});