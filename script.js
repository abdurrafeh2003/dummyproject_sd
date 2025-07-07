const productData = {
            1: { name: "Cartoon Astronaut T-Shirts", brand: "adidas", price: 78 },
            2: { name: "Tropical Leaf Print Shirt", brand: "adidas", price: 78 },
            3: { name: "Floral Summer Shirt", brand: "adidas", price: 78 },
            4: { name: "Cherry Blossom Shirt", brand: "adidas", price: 78 },
            5: { name: "Dark Floral Shirt", brand: "adidas", price: 85 },
            6: { name: "Color Block Shirt", brand: "adidas", price: 92 },
            7: { name: "Casual Khaki Pants", brand: "adidas", price: 115 },
            8: { name: "Paisley Print Blouse", brand: "adidas", price: 68 },
            9: { name: "Cartoon Astronaut T-Shirts", brand: "adidas", price: 78 },
            10: { name: "Tropical Leaf Print Shirt", brand: "adidas", price: 78 },
            11: { name: "Floral Summer Shirt", brand: "adidas", price: 78 },
            12: { name: "Cherry Blossom Shirt", brand: "adidas", price: 78 },
            13: { name: "Dark Floral Shirt", brand: "adidas", price: 85 },
            14: { name: "Color Block Shirt", brand: "adidas", price: 92 },
            15: { name: "Casual Khaki Pants", brand: "adidas", price: 115 },
            16: { name: "Paisley Print Blouse", brand: "adidas", price: 68 },
            17: { name: "Cartoon Astronaut T-Shirts", brand: "adidas", price: 78 },
            18: { name: "Tropical Leaf Print Shirt", brand: "adidas", price: 78 },
            19: { name: "Floral Summer Shirt", brand: "adidas", price: 78 },
            20: { name: "Cherry Blossom Shirt", brand: "adidas", price: 78 },
            21: { name: "Dark Floral Shirt", brand: "adidas", price: 85 },
            22: { name: "Color Block Shirt", brand: "adidas", price: 92 },
            23: { name: "Casual Khaki Pants", brand: "adidas", price: 115 },
            24: { name: "Paisley Print Blouse", brand: "adidas", price: 68 },
            25: { name: "Cartoon Astronaut T-Shirts", brand: "adidas", price: 78 },
            26: { name: "Tropical Leaf Print Shirt", brand: "adidas", price: 78 },
            27: { name: "Floral Summer Shirt", brand: "adidas", price: 78 },
            28: { name: "Cherry Blossom Shirt", brand: "adidas", price: 78 },
            29: { name: "Dark Floral Shirt", brand: "adidas", price: 85 },
            30: { name: "Color Block Shirt", brand: "adidas", price: 92 },
            31: { name: "Casual Khaki Pants", brand: "adidas", price: 115 },
            32: { name: "Paisley Print Blouse", brand: "adidas", price: 68 },
            33: { name: "Cartoon Astronaut T-Shirts", brand: "adidas", price: 78 }

        };

        // Cart functionality
let cart = []; // This array will hold the current state of the cart

/**
 * Loads the shopping cart data from localStorage.
 * If data exists, it parses it and assigns it to the 'cart' array.
 * If no data or invalid data, 'cart' remains an empty array.
 */
function loadCartFromStorage() {
    try {
        const storedCart = localStorage.getItem('shoppingCart');
        if (storedCart) {
            cart = JSON.parse(storedCart);
            // Ensure that cart is an array, even if localStorage somehow gets corrupted
            if (!Array.isArray(cart)) {
                console.error("Stored cart data is not an array. Resetting cart.");
                cart = [];
            }
        } else {
            cart = []; // Initialize as empty if no cart is stored
        }
    } catch (e) {
        console.error("Error parsing cart data from localStorage:", e);
        cart = []; // Reset cart on error to prevent issues
    }
    // After loading, update the UI to reflect the cart's state
    updateCartUI();
}

/**
 * Saves the current state of the 'cart' array to localStorage.
 * The array is converted to a JSON string before saving.
 */
function saveCartToStorage() {
    try {
        localStorage.setItem('shoppingCart', JSON.stringify(cart));
    } catch (e) {
        console.error("Error saving cart data to localStorage:", e);
    }
}

// Generate star rating (unchanged, but included for completeness)
function generateStars(rating) {
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 !== 0;
    let stars = '★'.repeat(fullStars);
    if (halfStar) stars += '☆';
    return stars;
}

/**
 * Adds a product to the cart. If the product already exists, its quantity is increased.
 * Otherwise, a new item is added to the cart.
 * @param {number|string} productId - The ID of the product to add.
 */
function addToCart(productId) {
    // Ensure productData is accessible. If it's loaded asynchronously,
    // you might need to wait for it or pass it as an argument.
    if (typeof productData === 'undefined' || !productData[productId]) {
        console.error(`Product with ID ${productId} not found in productData.`);
        return;
    }

    const product = productData[productId];

    const existingItem = cart.find(item => item.id === productId);

    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id: productId,
            name: product.name,
            brand: product.brand,
            price: product.price,
            quantity: 1
        });
    }

    // Save the updated cart to localStorage
    saveCartToStorage();
    // Update the cart display in the UI
    updateCartUI();

    // Removed the visual feedback (button text change) from here
    // because 'event.target' is not reliably available when calling
    // this function directly from an 'onclick' attribute without passing 'event'.
    // If you need visual feedback, consider passing the button element
    // or handling the feedback directly in your HTML event listener.
}

/**
 * Updates the shopping cart user interface elements.
 * This includes the total item count, total price, and the list of items in the cart modal.
 */
function updateCartUI() {
    const cartCount = document.getElementById('cartCount');
    const cartItemsContainer = document.getElementById('cartItems'); // Renamed to avoid conflict with 'cartItems' array
    const cartTotal = document.getElementById('cartTotal');

    const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
    const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);

    // Update the cart icon count
    if (cartCount) {
        cartCount.textContent = totalItems;
    } else {
        console.warn("Element with ID 'cartCount' not found. Cart count will not be displayed.");
    }

    // Update the total price display
    if (cartTotal) {
        cartTotal.textContent = totalPrice.toFixed(2);
    } else {
        console.warn("Element with ID 'cartTotal' not found. Cart total will not be displayed.");
    }

    // Update the list of items in the cart modal
    if (cartItemsContainer) {
        if (cart.length === 0) {
            cartItemsContainer.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
        } else {
            cartItemsContainer.innerHTML = cart.map(item => `
                <div class="cart-item">
                    <div>
                        <div>${item.name}</div>
                        <div style="color: #666; font-size: 0.9rem;">$${item.price} each</div>
                    </div>
                    <div class="quantity-controls">
                        <button class="quantity-btn" onclick="changeQuantity(${item.id}, -1)">-</button>
                        <span style="margin: 0 0.5rem;">${item.quantity}</span>
                        <button class="quantity-btn" onclick="changeQuantity(${item.id}, 1)">+</button>
                        <button class="quantity-btn" onclick="removeFromCart(${item.id})" style="margin-left: 0.5rem; background: #ff4757;">×</button>
                    </div>
                </div>
            `).join('');
        }
    } else {
        console.warn("Element with ID 'cartItems' not found. Cart items list will not be displayed.");
    }
}

/**
 * Changes the quantity of a product in the cart.
 * If quantity drops to 0 or below, the item is removed.
 * @param {number|string} productId - The ID of the product.
 * @param {number} change - The amount to change the quantity by (e.g., 1 for increment, -1 for decrement).
 */
function changeQuantity(productId, change) {
    const item = cart.find(item => item.id === productId);
    if (item) {
        item.quantity += change;
        if (item.quantity <= 0) {
            removeFromCart(productId); // Remove if quantity is zero or less
        } else {
            saveCartToStorage(); // Save after quantity change
            updateCartUI(); // Update UI after quantity change
        }
    }
}

/**
 * Removes a product completely from the cart.
 * @param {number|string} productId - The ID of the product to remove.
 */
function removeFromCart(productId) {
    cart = cart.filter(item => item.id !== productId);
    saveCartToStorage(); // Save after removal
    updateCartUI(); // Update UI after removal
}

/**
 * Toggles the visibility of the cart modal.
 */
function toggleCart() {
    const cartModal = document.getElementById('cartModal');
    if (cartModal) {
        cartModal.style.display = cartModal.style.display === 'flex' ? 'none' : 'flex';
    } else {
        console.warn("Element with ID 'cartModal' not found. Cart modal cannot be toggled.");
    }
}

// --- Initialize Cart on Page Load ---
// This ensures that when any page loads, the cart data is retrieved from localStorage
// and the UI is updated accordingly.
document.addEventListener('DOMContentLoaded', () => {
    loadCartFromStorage();
});
        // Checkout
        function checkout() {
            if (cart.length === 0) {
                alert('Your cart is empty!');
                return;
            }
            
            const total = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            alert(`Thank you for your purchase! Total: $${total.toFixed(2)}`);
            cart = [];
            updateCartUI();
            toggleCart();
        }

        // Close cart when clicking outside
        document.getElementById('cartModal').addEventListener('click', function(e) {
            if (e.target === this) {
                toggleCart();
            }
        });

        // Initialize
        document.addEventListener('DOMContentLoaded', function() {
            updateCartUI();
        });

        // Smooth scrolling for navigation links
        document.querySelectorAll('a[href^="#"]').forEach(anchor => {
            anchor.addEventListener('click', function (e) {
                e.preventDefault();
                const target = document.querySelector(this.getAttribute('href'));
                if (target) {
                    target.scrollIntoView({
                        behavior: 'smooth'
                    });
                }
            });
        });