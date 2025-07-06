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
        let cart = [];

        // Generate star rating
        function generateStars(rating) {
            const fullStars = Math.floor(rating);
            const halfStar = rating % 1 !== 0;
            let stars = '★'.repeat(fullStars);
            if (halfStar) stars += '☆';
            return stars;
        }

        // Add to cart
        function addToCart(productId) {
            const product = productData[productId];
            if (!product) return;
            
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
            
            updateCartUI();
            
            // Visual feedback
            const button = event.target;
            const originalText = button.innerHTML;
            button.innerHTML = '✓ Added';
            button.style.background = '#2ecc71';
            
            setTimeout(() => {
                button.innerHTML = originalText;
                button.style.background = 'linear-gradient(45deg, #667eea, #764ba2)';
            }, 1000);
        }

        // Update cart UI
        function updateCartUI() {
            const cartCount = document.getElementById('cartCount');
            const cartItems = document.getElementById('cartItems');
            const cartTotal = document.getElementById('cartTotal');
            
            const totalItems = cart.reduce((sum, item) => sum + item.quantity, 0);
            const totalPrice = cart.reduce((sum, item) => sum + (item.price * item.quantity), 0);
            
            cartCount.textContent = totalItems;
            cartTotal.textContent = totalPrice.toFixed(2);
            
            if (cart.length === 0) {
                cartItems.innerHTML = '<div class="empty-cart">Your cart is empty</div>';
            } else {
                cartItems.innerHTML = cart.map(item => `
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
        }

        // Change quantity
        function changeQuantity(productId, change) {
            const item = cart.find(item => item.id === productId);
            if (item) {
                item.quantity += change;
                if (item.quantity <= 0) {
                    removeFromCart(productId);
                } else {
                    updateCartUI();
                }
            }
        }

        // Remove from cart
        function removeFromCart(productId) {
            cart = cart.filter(item => item.id !== productId);
            updateCartUI();
        }

        // Toggle cart modal
        function toggleCart() {
            const cartModal = document.getElementById('cartModal');
            cartModal.style.display = cartModal.style.display === 'flex' ? 'none' : 'flex';
        }

        // Toggle mobile menu
        function toggleMobileMenu() {
            const navMenu = document.getElementById('navMenu');
            navMenu.classList.toggle('active');
        }

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