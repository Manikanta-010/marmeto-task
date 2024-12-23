// Sample Cart Data
const cartData = {
    "original_total_price": 250000,
    "items": [
        {
            "id": 49839206859071,
            "quantity": 1,
            "title": "Asgaard sofa",
            "price": 25000000,
            "line_price": 25000000,
            "final_line_price": 25000000,
            "image": "https://cdn.shopify.com/s/files/1/0883/2188/4479/files/Asgaardsofa3.png?v=1728384481",
            "product_description": "The Asgaard sofa offers unparalleled comfort and style with its sleek design and high-quality materials."
        }
    ],
    "currency": "INR"
};

// DOM Elements
const cartItemsContainer = document.getElementById('cart-items');
const subtotalElement = document.getElementById('subtotal');
const totalElement = document.getElementById('total');
const checkoutButton = document.getElementById('checkout-button');

// Function to render cart items
function renderCartItems() {
    cartItemsContainer.innerHTML = ''; // Clear previous items
    let subtotal = 0; // Initialize subtotal

    cartData.items.forEach(item => {
        const itemSubtotal = item.price * item.quantity;
        subtotal += itemSubtotal; // Update subtotal

        // Create item element
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
        <div class="output">
            <img src="${item.image}" alt="${item.title}" style="width: 100px; height: auto;">
            <span class="output-title">${item.title}</span>
            <span class="output-price">₹${(item.price / 100).toFixed(2)}</span>
            <input type="number" value="${item.quantity}" min="1" data-id="${item.id}" class="quantity-input">
            <span>₹${(itemSubtotal / 100).toFixed(2)}</span>
            <i class="fa-solid fa-trash trash-icon" data-id="${item.id}"></i>
        </div>

      `;
        cartItemsContainer.appendChild(itemElement);
    });

    // Update totals
    subtotalElement.innerText = `₹${(subtotal / 100).toFixed(2)}`;
    totalElement.innerText = `₹${(subtotal / 100).toFixed(2)}`;
}

// Function to handle quantity change
function updateQuantity(event) {
    const itemId = parseInt(event.target.dataset.id);
    const newQuantity = parseInt(event.target.value);

    // Update the quantity in the cart data
    const item = cartData.items.find(i => i.id === itemId);
    if (item) {
        item.quantity = newQuantity;
        renderCartItems(); // Re-render items to update totals
    }
}

// Function to remove item from cart
function removeItem(event) {
    const itemId = parseInt(event.target.dataset.id);
    cartData.items = cartData.items.filter(item => item.id !== itemId); // Remove item
    renderCartItems(); // Re-render items to update totals
}

// Event listeners for quantity input and trash icon
cartItemsContainer.addEventListener('input', event => {
    if (event.target.classList.contains('quantity-input')) {
        updateQuantity(event);
    }
});

cartItemsContainer.addEventListener('click', event => {
    if (event.target.classList.contains('trash-icon')) {
        removeItem(event);
    }
});

// Checkout functionality
checkoutButton.addEventListener('click', () => {
    alert("Proceeding to checkout..."); // Implement checkout functionality as needed
});

// Initial rendering of cart items
renderCartItems();