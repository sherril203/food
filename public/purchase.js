// Update purchase.js
// Get current date and time
const now = new Date();
const date = `${now.getDate().toString().padStart(2, '0')}/${(now.getMonth() + 1).toString().padStart(2, '0')}/${now.getFullYear()}`;

async function handlePurchase1(event) {
    event.preventDefault();
    
    // Debug: Log cart data first
    const cartData = localStorage.getItem('cart');
    console.log('Raw cart data:', cartData);
    
    // Get cart items and validate
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    console.log('Parsed cart:', cart);
    
    if (!cart.length) {
        alert('Your cart is empty!');
        return;
    }

    // Get form elements
    const name = document.getElementById('name').value;
    const email = document.getElementById('email').value;
    const address = document.getElementById('address').value;
    const mobile = document.getElementById('mobile').value;
    
    // Get current date and time
    const now = new Date();
    const date = `${now.getDate()}/${now.getMonth() + 1}/${now.getFullYear()}`;
    const time = now.toLocaleTimeString('en-US', {
        hour: '2-digit',
        minute: '2-digit',
        hour12: true
    }).toLowerCase();

    // Get payment method and details
    const paymentMethod = document.querySelector('input[name="payment"]:checked').value;
    let paymentDetails = '';
    
    if (paymentMethod === 'card') {
        const cardNumber = document.getElementById('card-number').value;
        paymentDetails = `Card ending in ${cardNumber.slice(-4)}`;
    } else {
        const upiId = document.getElementById('upi-id').value;
        paymentDetails = `UPI ID: ${upiId}`;
    }

    // Calculate total amount and format items
    let total = 0;
    const formattedItems = [];
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        formattedItems.push(`${item.name} (${item.quantity}x ₹${item.price})`);
    });

    // Create order object with proper item formatting
    const order = {
        orderId: `ORD${Date.now().toString().slice(-8)}`,
        date: date,
        time: time,
        customerName: name,
        address: address,
        mobile: mobile,
        paymentMethod: paymentMethod,
        paymentDetails: paymentDetails,
        orderAmount: `₹${total.toFixed(2)}`,
        items: formattedItems.join(', ')
    };

    console.log('Order being saved:', order); // Debug log

    // TODO:
    // try {
    //     const response = await fetch('http://localhost:4010/orders', {
    //       method: 'POST', // Specify the HTTP method
    //       headers: {
    //         'Content-Type': 'application/json', // Inform the server about the data format
    //       },
    //       body: JSON.stringify(order), // Convert the order data to JSON
    //     });
    
    //     if (response.ok) {
    //       const result = await response.json();
    //       console.log('Order submitted successfully:', result);

    //       if(result.status === "success") {
    //         // document.getElementById("text").innerHTML = "Success"
    //       }
    //     } else {
    //       console.error('Failed to submit order:', response.statusText);
    //     }
    //   } catch (error) {
    //     console.error('Error sending order data:', error);
    //   }

    // Save order to localStorage
    const existingOrders = JSON.parse(localStorage.getItem('orders')) || [];
    existingOrders.push(order);
    localStorage.setItem('orders', JSON.stringify(existingOrders));
    
    // Update order ID in success modal
    document.getElementById('order-id').textContent = order.orderId;
    
    // Show success modal
    document.getElementById('success-modal').style.display = 'block';
    
    // Clear cart
    localStorage.removeItem('cart');

    // Debug: Log final order
    console.log('All orders after save:', JSON.parse(localStorage.getItem('orders')));


}

// Add this function to verify the cart data
function validateCart() {
    try {
        const cart = JSON.parse(localStorage.getItem('cart')) || [];
        console.log('Current cart contents:', cart);
        return cart.length > 0;
    } catch (error) {
        console.error('Error validating cart:', error);
        return false;
    }
}
// Form submission handler
function handlePurchase2(event) {
    event.preventDefault();
    console.log("function enter"); 
    const form = event.target;
    const dataHandler = new ExcelDataHandler();

    try {
        console.log("form entered");
        // Validate cart
       // const cart = JSON.parse(localStorage.getItem('cart') || '[]');
       // if (cart.length === 0) {
       //     alert('Your cart is empty! Please add items before checking out.');
      //      return;
       // }

       console.log('chec:',form.querySelector('input[name="payment"]:checked'));
        // Get form data
        const formData = {
            name: form.querySelector('#name').value,
            address: form.querySelector('#address').value,
            mobile: form.querySelector('#mobile').value,
            paymentMethod: form.querySelector('input[name="payment"]:checked').value
        };
        console.log('formData:',formData);

        // Add payment details based on method
        if (formData.paymentMethod === 'card') {
            formData.cardNumber = form.querySelector('#card-number').value;
            formData.expiry = form.querySelector('#expiry').value;
            if (!formData.cardNumber || !formData.expiry) {
                alert('Please fill in all card details');
                return;
            }
        } else {
            formData.upiId = form.querySelector('#upi-id').value;
            if (!formData.upiId) {
                alert('Please enter UPI ID');
                return;
            }
        }
        

        // Save data and get order ID
        const orderId = dataHandler.savePurchaseData(formData);

        // Show success modal
        //const modal = document.getElementById('success-modal');
        //const orderIdSpan = document.getElementById('order-id');
       // orderIdSpan.textContent = orderId;
        //modal.style.display = 'block';

        // Clear form
        //form.reset();
        
        // Automatically close modal after 5 seconds
        //setTimeout(() => {
       //     modal.style.display = 'none';
       //     window.location.href = 'user-data.html'; // Redirect to home page
        //}, 5000);

    } catch (error) {
        console.error('Error processing purchase:', error);
        alert('There was an error processing your purchase. Please try again.');
    }
}

function generateOrderId(lastOrderId) {
    lastOrderId++;
    localStorage.setItem('lastOrderId', lastOrderId.toString());
    const paddedId = lastOrderId.toString().padStart(6, '0');
    const prefix = 'ORD';
    const timestamp = new Date().getFullYear().toString().substr(-2);
    return `${prefix}${timestamp}${paddedId}`;
}


// Update the event listener to include cart validation
document.getElementById('purchase-form').addEventListener('submit', function(event) {
    event.preventDefault();
    
    // if (!validateCart()) {
    //     alert('Please add items to your cart before proceeding with purchase');
    //     return;
    // }

    console.log('Here');
    
    
    handlePurchase2(event);
});

// Function to display order summary on purchase page
function displayOrderSummary() {
    const summaryElement = document.querySelector('.order-summary');
    const cart = JSON.parse(localStorage.getItem('cart')) || [];
    
    if (!cart.length) {
        summaryElement.innerHTML = '<p>Your cart is empty</p>';
        return;
    }
    
    let total = 0;
    let summaryHTML = '<h3>Order Summary</h3>';
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        summaryHTML += `
            <div class="summary-item">
                <p>${item.name} (${item.quantity}x ₹${item.price})</p>
                <p>Subtotal: ₹${itemTotal.toFixed(2)}</p>
            </div>
        `;
    });
    
    summaryHTML += `<div class="summary-total"><h4>Total Amount: ₹${total.toFixed(2)}</h4></div>`;
    summaryElement.innerHTML = summaryHTML;
}

// Initialize order summary when page loads
document.addEventListener('DOMContentLoaded', () => {
    displayOrderSummary();
    console.log('Current cart:', JSON.parse(localStorage.getItem('cart')));
    console.log('here 1');
    
    const cardDetails = document.getElementById('card-details');
    const upiDetails = document.getElementById('upi-details');
    const paymentInputs = document.querySelectorAll('input[name="payment"]');
    console.log('sajnd');
    

    // Select the radio buttons
    const cardRadio = document.getElementById('card');
    const upiRadio = document.getElementById('upi');

    // Add event listeners to each radio button
    cardRadio.addEventListener('change', ()=> {
        if (cardRadio.checked) {
            console.log('Card  selected');
            cardDetails.style.display = 'block';
            upiDetails.style.display = 'none';
            document.getElementById('upi-id').removeAttribute('required');
            document.getElementById('card-number').setAttribute('required', '');
            document.getElementById('expiry').setAttribute('required', '');
            document.getElementById('cvv').setAttribute('required', '');
        }
    });

    upiRadio.addEventListener('change', function() {
        if (upiRadio.checked) {
            console.log('UPI  selected');
            cardDetails.style.display = 'none';
            upiDetails.style.display = 'block';
            document.getElementById('upi-id').setAttribute('required', '');
            document.getElementById('card-number').removeAttribute('required');
            document.getElementById('expiry').removeAttribute('required');
            document.getElementById('cvv').removeAttribute('required');
        }
    });
    

  // paymentInputs.forEach(input => {
 //   input.addEventListener('change', function() {
  //     if (this.value === 'card') {
  //  cardDetails.style.display = 'block';
 //   upiDetails.style.display = 'none';
 //   document.getElementById('upi-id').removeAttribute('required');
   // document.getElementById('card-number').setAttribute('required', '');
  //  document.getElementById('expiry').setAttribute('required', '');
  //  document.getElementById('cvv').setAttribute('required', '');
   // document.getElementById('card-number').focus();
//} else if (this.value === 'upi') {
 //   cardDetails.style.display = 'none';
  //  upiDetails.style.display = 'block';
 //   document.getElementById('upi-id').setAttribute('required', '');
//    document.getElementById('card-number').removeAttribute('required');
 //   document.getElementById('expiry').removeAttribute('required');
 //   document.getElementById('cvv').removeAttribute('required');
 //   });
//});
});
// ExcelDataHandler class with improved cart integration
class ExcelDataHandler {
    constructor() {
        this.lastOrderId = parseInt(localStorage.getItem('lastOrderId') || '0');
        this.purchases = JSON.parse(localStorage.getItem('purchases') || '[]');
    }

    generateOrderId() {
        this.lastOrderId++;
        localStorage.setItem('lastOrderId', this.lastOrderId.toString());
        const paddedId = this.lastOrderId.toString().padStart(6, '0');
        const prefix = 'ORD';
        const timestamp = new Date().getFullYear().toString().substr(-2);
        return `${prefix}${timestamp}${paddedId}`;
    }

    savePurchaseData(formData) {
        const orderId = this.generateOrderId();
        const timestamp = new Date().toISOString();
        
        // Get cart data from localStorage
        const cart = JSON.parse(localStorage.getItem('cart') || '[]');
        const totalAmount = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
        
        const purchaseRecord = {
            orderId: orderId,
            timestamp: timestamp,
            customerName: formData.name,
            address: formData.address,
            mobile: formData.mobile,
            paymentMethod: formData.paymentMethod,
            paymentDetails: formData.paymentMethod === 'card' ? 
                `Card ending in ${formData.cardNumber.slice(-4)}` : 
                formData.upiId,
            orderAmount: totalAmount.toFixed(2),
            items: JSON.stringify(cart.map(item => ({
                name: item.name,
                quantity: item.quantity,
                price: item.price
            }))),
            status: 'Pending'
        };

        this.purchases.push(purchaseRecord);
        localStorage.setItem('purchases', JSON.stringify(this.purchases));
        
        // Clear the cart after successful purchase
        localStorage.removeItem('cart');
        
        // Create and download Excel file
        this.downloadExcel();
        
        return orderId;
    }

    downloadExcel() {
        // Format the data for better readability in Excel
        const wsData = [
            // Headers
            [
                'Order ID',
                'Date',
                'Time',
                'Customer Name',
                'Address',
                'Mobile',
                'Payment Method',
                'Payment Details',
                'Order Amount',
                'Items',
                'Status'
            ],
            // Data rows
            ...this.purchases.map(purchase => {
                const date = new Date(purchase.timestamp);
                return [
                    purchase.orderId,
                    date.toLocaleDateString(),
                    date.toLocaleTimeString(),
                    purchase.customerName,
                    purchase.address,
                    purchase.mobile,
                    purchase.paymentMethod,
                    purchase.paymentDetails,
                    `₹${purchase.orderAmount}`,
                    this.formatItems(purchase.items),
                    purchase.status
                ];
            })
        ];

        // Create workbook and add the worksheet
        const wb = XLSX.utils.book_new();
        const ws = XLSX.utils.aoa_to_sheet(wsData);

        // Set column widths
        const colWidths = [15, 12, 12, 20, 30, 15, 15, 20, 12, 40, 10];
        ws['!cols'] = colWidths.map(width => ({ width }));

        XLSX.utils.book_append_sheet(wb, ws, 'Purchase Records');

        // Generate Excel file
        const excelBuffer = XLSX.write(wb, { bookType: 'xlsx', type: 'array' });
        this.saveExcelFile(excelBuffer);
    }

    formatItems(itemsString) {
        try {
            const items = JSON.parse(itemsString);
            return items.map(item => 
                `${item.name} (${item.quantity}x ₹${item.price})`
            ).join(', ');
        } catch (e) {
            return itemsString;
        }
    }

    saveExcelFile(buffer) {
        const date = new Date().toLocaleDateString().replace(/\//g, '-');
        const fileName = `purchase_records_${date}.xlsx`;
        
        const blob = new Blob([buffer], { 
            type: 'application/vnd.openxmlformats-officedocument.spreadsheetml.sheet' 
        });
        
        const url = window.URL.createObjectURL(blob);
        const link = document.createElement('a');
        link.href = url;
        link.download = fileName;
        document.body.appendChild(link);
        link.click();
        document.body.removeChild(link);
        window.URL.revokeObjectURL(url);
    }
}


