// Cart array to store items
let cart = [];

// Function to add an item to the cart
function addToCart(itemName, itemPrice, itemImage) {
    const item = { name: itemName, price: parseFloat(itemPrice), image: itemImage };
    cart.push(item);
    localStorage.setItem('cart', JSON.stringify(cart));
    updateCartCount();
    // console.log("Cart:", cart); // Debugging: Log the cart contents
}

// Function to update the cart count
function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        cartCount.textContent = cart.length;
    }
}

// Function to display cart items
function displayCartItems() {
    let cartModal = document.querySelector('.cart-modal');
    if (!cartModal) {
        // Create the cart modal if it doesn't exist
        cartModal = document.createElement('div');
        cartModal.classList.add('cart-modal');
        cartModal.innerHTML = `
            <div class="cart-modal-content">
                <h2>Your Cart</h2>
                <ul class="cart-items"></ul>
                <button class="close-cart">Close</button>
            </div>
        `;
        document.body.appendChild(cartModal);

        // Add event listener to close the cart modal
        cartModal.querySelector('.close-cart').addEventListener('click', () => {
            cartModal.style.display = 'none';
        });
    }

    const cartItemsList = cartModal.querySelector('.cart-items');
    cartItemsList.innerHTML = '';

    if (cart.length === 0) {
        cartItemsList.innerHTML = '<li>Your cart is empty.</li>';
    } else {
        cart.forEach((item, index) => {
            const listItem = document.createElement('li');
            listItem.innerHTML = `
                ${item.name} - $${item.price} 
                <button class="remove-btn" data-index="${index}">Remove</button>
            `;
            cartItemsList.appendChild(listItem);
        });

        // Add event listeners to remove buttons
        cartItemsList.querySelectorAll('.remove-btn').forEach(button => {
            button.addEventListener('click', (event) => {
                const index = event.target.getAttribute('data-index');
                removeFromCart(index);
            });
        });
    }

    cartModal.style.display = 'block';
}

// Function to remove an item from the cart
function removeFromCart(index) {
    if (index >= 0 && index < cart.length) {
        cart.splice(index, 1);
        updateCartCount();
        displayCartItems();
    }
}

// Add event listeners to all "Add to Cart" buttons
document.querySelectorAll('.cart').forEach(button => {
    button.addEventListener('click', () => {
        const itemName = button.getAttribute('data-name');
        const itemPrice = button.getAttribute('data-price');
        const itemImage = button.getAttribute('data-image');
        addToCart(itemName, itemPrice, itemImage);
    });
});

// Add event listener to the cart icon
document.querySelector('.fa-shopping-cart').addEventListener('click', () => {
    window.location.href = 'cart_items.html'; // Redirect to the cart page
});


//============= LOGIN PAGE JS REDIRECTION==================
// Redirect to login page when the login button is clicked
    document.getElementById('loginButton').addEventListener('click', function() {
        window.location.href = 'login.html';
    });


// ===================FAVORITES PAGE====================
// Array to store favorite items
let favorites = JSON.parse(localStorage.getItem('favorites')) || [];

// Function to add an item to favorites
function addToFavorites(itemName, itemImage) {
    // Check if the item is already in favorites
    const isAlreadyFavorite = favorites.some(item => item.name === itemName);

    if (!isAlreadyFavorite) {
        favorites.push({ name: itemName, image: itemImage });
        localStorage.setItem('favorites', JSON.stringify(favorites));
        updateFavoritesCount();
        alert(`${itemName} has been added to your favorites!`);
    } else {
        alert(`${itemName} is already in your favorites!`);
    }
}

// Function to update the favorites count in the navbar
function updateFavoritesCount() {
    const favoritesCount = document.querySelector('.favorites-count');
    if (favoritesCount) {
        favoritesCount.textContent = favorites.length;
    }
}

// Add event listeners to all heart icons
document.querySelectorAll('.fa-heart').forEach(heartIcon => {
    heartIcon.addEventListener('click', event => {
        event.preventDefault();
        const itemName = heartIcon.getAttribute('data-name');
        const itemImage = heartIcon.getAttribute('data-image');
        addToFavorites(itemName, itemImage);
    });
});

// Update the favorites count on page load
updateFavoritesCount();


// Function to display favorite items
function displayFavorites() {
    const favoritesModal = document.createElement('div');
    favoritesModal.classList.add('favorites-modal');
    favoritesModal.innerHTML = `
        <div class="favorites-modal-content">
            <h2>Your Favorites</h2>
            <ul class="favorites-list">
                ${favorites.map(item => `
                    <li>
                        <img src="${item.image}" alt="${item.name}" style="width: 50px; height: 50px;">
                        ${item.name}
                    </li>
                `).join('')}
            </ul>
            <button class="close-favorites">Close</button>
        </div>
    `;
    document.body.appendChild(favoritesModal);

    // Close the modal
    favoritesModal.querySelector('.close-favorites').addEventListener('click', () => {
        favoritesModal.remove();
    });
}

// Add event listener to the heart icon in the navbar
document.querySelector('.fa-heart').addEventListener('click', event => {
    event.preventDefault();
    displayFavorites();
});