// Sample grocery items
const groceryItems = [
    { id: 1, name: "Apples", price: 2.99 },
    { id: 2, name: "Bananas", price: 1.29 },
    { id: 3, name: "Carrots", price: 0.99 },
    { id: 4, name: "Milk", price: 1.49 }
  ];
  
  // Retrieve existing cart from localStorage or start a new cart
  let cart = JSON.parse(localStorage.getItem('cart')) || [];
  
  // Display grocery items on the page
  function displayGroceryItems() {
    const groceryContainer = document.getElementById("grocery-items");
    groceryItems.forEach(item => {
      const itemElement = document.createElement("div");
      itemElement.classList.add("grocery-item");
      itemElement.innerHTML = `
        <h3>${item.name}</h3>
        <p>Price: $${item.price.toFixed(2)}</p>
        <button onclick="addToCart(${item.id})">Add to Cart</button>
      `;
      groceryContainer.appendChild(itemElement);
    });
  }
  
  // Add item to cart and save it to localStorage
  function addToCart(itemId) {
    const item = groceryItems.find(product => product.id === itemId);
    const existingItem = cart.find(product => product.id === itemId);
    
    if (existingItem) {
      existingItem.quantity += 1;
    } else {
      cart.push({ ...item, quantity: 1 });
    }
  
    localStorage.setItem('cart', JSON.stringify(cart));
    alert(`${item.name} has been added to your cart.`);
  }
  
  // Initialize page by displaying grocery items
  document.addEventListener("DOMContentLoaded", displayGroceryItems);
  