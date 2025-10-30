// Menu Items Data
const menuItems = [
    {
        id: 1,
        name: "Butter Chicken",
        category: "main-course",
        price: 350,
        rating: 4.5,
        description: "Tender chicken cooked in a rich and creamy tomato-based sauce."
    },
    {
        id: 2,
        name: "Paneer Tikka",
        category: "starters",
        price: 300,
        rating: 5,
        description: "Chunks of paneer marinated in spices and grilled to perfection."
    },
    {
        id: 3,
        name: "Biryani",
        category: "main-course",
        price: 400,
        rating: 4.8,
        description: "Fragrant basmati rice cooked with aromatic spices and your choice of protein."
    },
    {
        id: 4,
        name: "Naan",
        category: "breads",
        price: 60,
        rating: 4.6,
        description: "Soft and fluffy bread baked in a tandoor oven."
    },
    {
        id: 5,
        name: "Gulab Jamun",
        category: "desserts",
        price: 150,
        rating: 4.9,
        description: "Soft milk solids balls soaked in rose-flavored sugar syrup."
    },
    {
        id: 6,
        name: "Samosa",
        category: "starters",
        price: 80,
        rating: 4.7,
        description: "Crispy pastry filled with spiced potatoes and peas."
    },
    {
        id: 7,
        name: "Palak Paneer",
        category: "main-course",
        price: 320,
        rating: 4.5,
        description: "Cottage cheese cubes in a creamy spinach gravy."
    },
    {
        id: 8,
        name: "Roti",
        category: "breads",
        price: 40,
        rating: 4.3,
        description: "Whole wheat flatbread, a staple in Indian cuisine."
    },
    {
        id: 9,
        name: "Rasmalai",
        category: "desserts",
        price: 180,
        rating: 4.8,
        description: "Soft cottage cheese patties soaked in sweetened, thickened milk."
    },
    {
        id: 10,
        name: "Chicken Tikka",
        category: "starters",
        price: 280,
        rating: 4.6,
        description: "Boneless chicken pieces marinated in spices and yogurt, then grilled."
    },
    {
        id: 11,
        name: "Dal Makhani",
        category: "main-course",
        price: 250,
        rating: 4.4,
        description: "Black lentils and kidney beans cooked with butter and cream."
    },
    {
        id: 12,
        name: "Garlic Naan",
        category: "breads",
        price: 80,
        rating: 4.7,
        description: "Naan bread topped with garlic and butter."
    }
];

// DOM Elements
const menuItemsContainer = document.querySelector('.menu-items');
const categoryButtons = document.querySelectorAll('.category-btn');
const cartIcon = document.querySelector('.cart-icon');
const cartSidebar = document.querySelector('.cart-sidebar');
const closeCartBtn = document.querySelector('.close-cart');
const overlay = document.querySelector('.overlay');
const cartItemsContainer = document.querySelector('.cart-items');
const cartTotalAmount = document.getElementById('cart-total-amount');
const cartCount = document.querySelector('.cart-count');
const menuToggle = document.querySelector('.menu-toggle');
const nav = document.querySelector('nav');
const checkoutBtn = document.querySelector('.checkout-btn');

// Authentication Elements
const loginButton = document.getElementById('login-button');
const signupButton = document.getElementById('signup-button');
const loginModal = document.getElementById('login-modal');
const signupModal = document.getElementById('signup-modal');
const paymentModal = document.getElementById('payment-modal');
const closeModalButtons = document.querySelectorAll('.close-modal');
const switchToSignup = document.getElementById('switch-to-signup');
const switchToLogin = document.getElementById('switch-to-login');
const loginForm = document.getElementById('login-form');
const signupForm = document.getElementById('signup-form');
const userProfile = document.querySelector('.user-profile');
const username = document.querySelector('.username');
const razorpayButton = document.getElementById('razorpay-payment-button');
const orderItems = document.getElementById('order-items');
const orderTotalPrice = document.getElementById('order-total-price');

// Cart Array
let cart = [];

// User state
let currentUser = null;

// Event Listeners
document.addEventListener('DOMContentLoaded', () => {
    displayMenuItems('all');
    setupEventListeners();
});

function setupEventListeners() {
    // Category Filter
    categoryButtons.forEach(button => {
        button.addEventListener('click', () => {
            const category = button.dataset.category;
            categoryButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            displayMenuItems(category);
        });
    });

    // Cart Toggle
    cartIcon.addEventListener('click', toggleCart);
    closeCartBtn.addEventListener('click', toggleCart);
    overlay.addEventListener('click', toggleCart);

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        nav.classList.toggle('active');
        overlay.classList.toggle('active');
    });

    // Add to Cart Buttons
    document.addEventListener('click', (e) => {
        if (e.target.classList.contains('add-to-cart')) {
            const id = parseInt(e.target.dataset.id);
            const name = e.target.dataset.name;
            const price = parseInt(e.target.dataset.price);
            addToCart(id, name, price);
        }
    });

    // Checkout Button
    checkoutBtn.addEventListener('click', () => {
        if (cart.length > 0) {
            if (currentUser) {
                openModal(paymentModal);
                displayOrderSummary();
            } else {
                openModal(loginModal);
                alert('Please login to complete your order');
            }
        } else {
            alert('Your cart is empty. Please add some items before checkout.');
        }
    });
    
    // Authentication
loginButton.addEventListener('click', () => openModal(loginModal));
signupButton.addEventListener('click', () => openModal(signupModal));

// Logout functionality
const logoutButton = document.getElementById('logout-button');
logoutButton.addEventListener('click', () => {
    // Clear user data
    currentUser = null;
    localStorage.removeItem('token');
    
    // Update UI
    updateUserUI();
    alert('Logged out successfully');
});

// Mock order history data
const mockOrders = [
    {
        id: 'ORD-001',
        date: '2023-10-15',
        status: 'Delivered',
        total: 45.90,
        items: [
            { name: 'Margherita Pizza', quantity: 1, price: 12.99 },
            { name: 'Chicken Biryani', quantity: 1, price: 15.99 },
            { name: 'Chocolate Brownie', quantity: 2, price: 8.49 }
        ]
    },
    {
        id: 'ORD-002',
        date: '2023-09-28',
        status: 'Delivered',
        total: 32.50,
        items: [
            { name: 'Vegetable Fried Rice', quantity: 2, price: 10.99 },
            { name: 'Garlic Bread', quantity: 1, price: 4.99 },
            { name: 'Coca Cola', quantity: 2, price: 2.99 }
        ]
    }
];

// Profile page functionality
function openProfilePage() {
    // Get current user data
    if (!currentUser) return;
    
    // Populate user details
    document.getElementById('profile-name').textContent = currentUser.name || 'Not provided';
    document.getElementById('profile-email').textContent = currentUser.email || 'Not provided';
    document.getElementById('profile-phone').textContent = currentUser.phone || 'Not provided';
    
    // Populate order history
    const orderHistoryContainer = document.getElementById('order-history');
    
    // Clear previous content
    orderHistoryContainer.innerHTML = '';
    
    if (mockOrders.length === 0) {
        orderHistoryContainer.innerHTML = '<p class="no-orders">No orders yet.</p>';
    } else {
        mockOrders.forEach(order => {
            const orderElement = document.createElement('div');
            orderElement.className = 'order-item';
            
            // Calculate total
            let orderTotal = 0;
            order.items.forEach(item => {
                orderTotal += item.price * item.quantity;
            });
            
            orderElement.innerHTML = `
                <div class="order-header">
                    <div>
                        <strong>Order ID:</strong> ${order.id}
                        <div><strong>Date:</strong> ${order.date}</div>
                    </div>
                    <div>
                        <div><strong>Status:</strong> ${order.status}</div>
                        <div><strong>Total:</strong> $${order.total.toFixed(2)}</div>
                    </div>
                </div>
                <div class="order-details">
                    <strong>Items:</strong>
                    <ul class="order-item-list">
                        ${order.items.map(item => `
                            <li>
                                <span>${item.name} x${item.quantity}</span>
                                <span>$${(item.price * item.quantity).toFixed(2)}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            `;
            
            orderHistoryContainer.appendChild(orderElement);
        });
    }
    
    // Show profile modal
    document.getElementById('profile-page').style.display = 'block';
}

// Add profile link to user profile dropdown
document.querySelector('.user-profile').addEventListener('click', function(e) {
    // Prevent default only if it's not the logout button
    if (!e.target.matches('#logout-button')) {
        e.preventDefault();
        openProfilePage();
    }
});

// Close profile modal
document.querySelectorAll('#profile-page .close-modal').forEach(closeBtn => {
    closeBtn.addEventListener('click', function() {
        document.getElementById('profile-page').style.display = 'none';
    });
});
    
    closeModalButtons.forEach(button => {
        button.addEventListener('click', closeModal);
    });
    
    switchToSignup.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(loginModal);
        openModal(signupModal);
    });
    
    switchToLogin.addEventListener('click', (e) => {
        e.preventDefault();
        closeModal(signupModal);
        openModal(loginModal);
    });
    
    loginForm.addEventListener('submit', handleLogin);
    signupForm.addEventListener('submit', handleSignup);
    razorpayButton.addEventListener('click', initiateRazorpayPayment);
}

// Display Menu Items
function displayMenuItems(category) {
    let filteredItems = menuItems;
    
    if (category !== 'all') {
        filteredItems = menuItems.filter(item => item.category === category);
    }
    
    let html = '';
    
    filteredItems.forEach(item => {
        const stars = generateStarRating(item.rating);
        
        html += `
            <div class="dish-card">
                <div class="dish-image">
                    ${generateFoodSVG(item.category)}
                </div>
                <h3>${item.name}</h3>
                <div class="rating">
                    ${stars}
                </div>
                <p>${item.description}</p>
                <p class="price">₹${item.price}</p>
                <button class="add-to-cart" data-id="${item.id}" data-name="${item.name}" data-price="${item.price}">Add to Cart</button>
            </div>
        `;
    });
    
    menuItemsContainer.innerHTML = html;
}

// Generate Star Rating SVG
function generateStarRating(rating) {
    let stars = '';
    const fullStars = Math.floor(rating);
    const halfStar = rating % 1 >= 0.5;
    
    for (let i = 1; i <= 5; i++) {
        if (i <= fullStars) {
            stars += `<svg class="star" width="20" height="20" viewBox="0 0 20 20" fill="#FFC13B" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 1L13 7L19 8L14.5 13L16 19L10 16L4 19L5.5 13L1 8L7 7L10 1Z"/>
                      </svg>`;
        } else if (i === fullStars + 1 && halfStar) {
            stars += `<svg class="star" width="20" height="20" viewBox="0 0 20 20" xmlns="http://www.w3.org/2000/svg">
                        <defs>
                            <linearGradient id="halfStar" x1="0%" y1="0%" x2="100%" y2="0%">
                                <stop offset="50%" stop-color="#FFC13B" />
                                <stop offset="50%" stop-color="#FFC13B" stop-opacity="0.3" />
                            </linearGradient>
                        </defs>
                        <path d="M10 1L13 7L19 8L14.5 13L16 19L10 16L4 19L5.5 13L1 8L7 7L10 1Z" fill="url(#halfStar)"/>
                      </svg>`;
        } else {
            stars += `<svg class="star" width="20" height="20" viewBox="0 0 20 20" fill="#FFC13B" fill-opacity="0.3" xmlns="http://www.w3.org/2000/svg">
                        <path d="M10 1L13 7L19 8L14.5 13L16 19L10 16L4 19L5.5 13L1 8L7 7L10 1Z"/>
                      </svg>`;
        }
    }
    
    return stars;
}

// Generate Food SVG based on category
function generateFoodSVG(category) {
    let svg = '';
    
    switch (category) {
        case 'starters':
            svg = `<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="75" cy="75" r="70" fill="#FFC13B" fill-opacity="0.2"/>
                    <rect x="30" y="60" width="90" height="30" rx="15" fill="#FFC13B"/>
                    <circle cx="45" cy="75" r="10" fill="#FF6B35"/>
                    <circle cx="75" cy="75" r="10" fill="#FF6B35"/>
                    <circle cx="105" cy="75" r="10" fill="#FF6B35"/>
                  </svg>`;
            break;
        case 'main-course':
            svg = `<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="75" cy="75" r="70" fill="#FFC13B" fill-opacity="0.2"/>
                    <circle cx="75" cy="75" r="50" fill="#FF6B35"/>
                    <path d="M50 75C50 75 60 95 75 95C90 95 100 75 100 75" fill="#FFC13B"/>
                    <path d="M50 75C50 75 60 95 75 95C90 95 100 75 100 75" stroke="#4A1D1F" stroke-width="2"/>
                    <circle cx="60" cy="65" r="5" fill="#4A1D1F"/>
                    <circle cx="90" cy="65" r="5" fill="#4A1D1F"/>
                  </svg>`;
            break;
        case 'breads':
            svg = `<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="75" cy="75" r="70" fill="#FFC13B" fill-opacity="0.2"/>
                    <ellipse cx="75" cy="75" rx="50" ry="30" fill="#FFC13B"/>
                    <ellipse cx="75" cy="75" rx="35" ry="20" fill="#FF6B35" fill-opacity="0.5"/>
                  </svg>`;
            break;
        case 'desserts':
            svg = `<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="75" cy="75" r="70" fill="#FFC13B" fill-opacity="0.2"/>
                    <circle cx="75" cy="75" r="40" fill="#FF6B35"/>
                    <circle cx="75" cy="75" r="25" fill="#FFC13B"/>
                    <path d="M65 65L85 85M85 65L65 85" stroke="#4A1D1F" stroke-width="2"/>
                  </svg>`;
            break;
        default:
            svg = `<svg width="150" height="150" viewBox="0 0 150 150" fill="none" xmlns="http://www.w3.org/2000/svg">
                    <circle cx="75" cy="75" r="70" fill="#FFC13B" fill-opacity="0.2"/>
                    <path d="M40 90C40 90 60 110 75 110C90 110 110 90 110 90" fill="#FF6B35"/>
                    <path d="M40 90C40 90 60 110 75 110C90 110 110 90 110 90" stroke="#4A1D1F" stroke-width="2"/>
                    <circle cx="75" cy="60" r="20" fill="#FFC13B"/>
                    <path d="M65 60C65 60 70 70 75 70C80 70 85 60 85 60" stroke="#4A1D1F" stroke-width="2"/>
                  </svg>`;
    }
    
    return svg;
}

// Toggle Cart Sidebar
function toggleCart() {
    cartSidebar.classList.toggle('active');
    overlay.classList.toggle('active');
    
    if (menuToggle.classList.contains('active')) {
        menuToggle.classList.remove('active');
        nav.classList.remove('active');
    }
}

// Add to Cart
function addToCart(id, name, price) {
    const existingItem = cart.find(item => item.id === id);
    
    if (existingItem) {
        existingItem.quantity++;
    } else {
        cart.push({
            id,
            name,
            price,
            quantity: 1
        });
    }
    
    updateCart();
    
    // Show notification
    const notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = `${name} added to cart!`;
    document.body.appendChild(notification);
    
    setTimeout(() => {
        notification.classList.add('show');
    }, 100);
    
    setTimeout(() => {
        notification.classList.remove('show');
        setTimeout(() => {
            document.body.removeChild(notification);
        }, 300);
    }, 2000);
}

// Update Cart
function updateCart() {
    cartItemsContainer.innerHTML = '';
    
    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p class="empty-cart">Your cart is empty</p>';
        cartTotalAmount.textContent = '₹0';
        cartCount.textContent = '0';
        return;
    }
    
    let total = 0;
    let itemCount = 0;
    
    cart.forEach(item => {
        const itemTotal = item.price * item.quantity;
        total += itemTotal;
        itemCount += item.quantity;
        
        const cartItemHTML = `
            <div class="cart-item" data-id="${item.id}">
                <div class="cart-item-info">
                    <h3 class="cart-item-name">${item.name}</h3>
                    <p class="cart-item-price">₹${item.price} x ${item.quantity}</p>
                </div>
                <div class="cart-item-quantity">
                    <button class="quantity-btn decrease" onclick="updateItemQuantity(${item.id}, ${item.quantity - 1})">-</button>
                    <span class="quantity-value">${item.quantity}</span>
                    <button class="quantity-btn increase" onclick="updateItemQuantity(${item.id}, ${item.quantity + 1})">+</button>
                    <button class="remove-item" onclick="removeFromCart(${item.id})">
                        <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
                            <path d="M12 4L4 12M4 4L12 12" stroke="#999" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
                        </svg>
                    </button>
                </div>
            </div>
        `;
        
        cartItemsContainer.innerHTML += cartItemHTML;
    });
    
    cartTotalAmount.textContent = `₹${total}`;
    cartCount.textContent = itemCount;
}

// Update Item Quantity
function updateItemQuantity(id, quantity) {
    const item = cart.find(item => item.id === id);
    
    if (quantity > 0) {
        item.quantity = quantity;
    } else {
        removeFromCart(id);
        return;
    }
    
    updateCart();
}

// Remove from Cart
function removeFromCart(id) {
    cart = cart.filter(item => item.id !== id);
    updateCart();
}

// Smooth Scroll
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        
        const targetId = this.getAttribute('href');
        const targetElement = document.querySelector(targetId);
        
        if (targetElement) {
            window.scrollTo({
                top: targetElement.offsetTop - 80,
                behavior: 'smooth'
            });
            
            // Close mobile menu if open
            if (menuToggle.classList.contains('active')) {
                menuToggle.classList.remove('active');
                nav.classList.remove('active');
                overlay.classList.remove('active');
            }
        }
    });
});

// Add CSS for notification
const style = document.createElement('style');
style.textContent = `
    .notification {
        position: fixed;
        bottom: -60px;
        left: 50%;
        transform: translateX(-50%);
        background-color: var(--secondary-color);
        color: var(--dark-color);
        padding: 12px 25px;
        border-radius: 30px;
        box-shadow: 0 4px 10px rgba(0, 0, 0, 0.1);
        font-weight: 500;
        z-index: 1000;
        transition: bottom 0.3s ease;
    }
    
    .notification.show {
        bottom: 30px;
    }
`;
document.head.appendChild(style);

// Authentication and Payment Functions
function openModal(modal) {
    modal.style.display = 'block';
    overlay.style.display = 'block';
}

function closeModal(modal) {
    if (modal.target) {
        modal.target.closest('.auth-modal').style.display = 'none';
    } else {
        modal.style.display = 'none';
    }
    overlay.style.display = 'none';
}

function closeAllModals() {
    loginModal.style.display = 'none';
    signupModal.style.display = 'none';
    paymentModal.style.display = 'none';
    overlay.style.display = 'none';
}

function handleLogin(e) {
    e.preventDefault();
    const email = document.getElementById('login-email').value;
    const password = document.getElementById('login-password').value;
    
    // Send login request to the backend API
    fetch('/api/auth/login', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Invalid credentials');
        }
        return response.json();
    })
    .then(data => {
        // Login successful
        currentUser = {
            name: data.user.name || email.split('@')[0],
            email: data.user.email
        };
        
        // Store token in localStorage for future authenticated requests
        localStorage.setItem('token', data.token);
        
        updateUserUI();
        closeAllModals();
        alert('Login successful!');
    })
    .catch(error => {
        alert('Login failed: ' + error.message);
    });
}

function handleSignup(e) {
    e.preventDefault();
    const name = document.getElementById('signup-name').value;
    const email = document.getElementById('signup-email').value;
    const password = document.getElementById('signup-password').value;
    const confirmPassword = document.getElementById('signup-confirm-password').value;
    
    if (password !== confirmPassword) {
        alert('Passwords do not match!');
        return;
    }
    
    // Send signup request to the backend API
    fetch('/api/auth/register', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify({ name, email, password })
    })
    .then(response => {
        if (!response.ok) {
            throw new Error('Registration failed');
        }
        return response.json();
    })
    .then(data => {
        // Signup successful
        currentUser = {
            name: data.user.name,
            email: data.user.email
        };
        
        // Store token in localStorage for future authenticated requests
        localStorage.setItem('token', data.token);
        
        updateUserUI();
        closeAllModals();
        alert('Registration successful!');
    })
    .catch(error => {
        alert('Registration failed: ' + error.message);
     });
}

function updateUserUI() {
    if (currentUser) {
        loginButton.style.display = 'none';
        signupButton.style.display = 'none';
        userProfile.classList.remove('hidden');
        username.textContent = currentUser.name;
    } else {
        loginButton.style.display = 'inline-block';
        signupButton.style.display = 'inline-block';
        userProfile.classList.add('hidden');
    }
}

function displayOrderSummary() {
    orderItems.innerHTML = '';
    let total = 0;
    
    cart.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');
        orderItem.innerHTML = `
            <span>${item.name} x ${item.quantity}</span>
            <span>₹${item.price * item.quantity}</span>
        `;
        orderItems.appendChild(orderItem);
        total += item.price * item.quantity;
    });
    
    orderTotalPrice.textContent = `₹${total}`;
}

function initiateRazorpayPayment() {
    const name = document.getElementById('delivery-name').value;
    const phone = document.getElementById('delivery-phone').value;
    const addressLine1 = document.getElementById('delivery-address-line1').value;
    const city = document.getElementById('delivery-city').value;
    const pincode = document.getElementById('delivery-pincode').value;
    
    if (!name || !phone || !addressLine1 || !city || !pincode) {
        alert('Please fill in all required delivery information');
        return;
    }
    
    const totalAmount = parseFloat(orderTotalPrice.textContent.replace('₹', '')) * 100; // Convert to paise
    
    // Razorpay configuration
    const options = {
        key: 'rzp_test_NNdONzoR8K3NGV', // Updated Razorpay test key
        amount: totalAmount,
        currency: 'INR',
        name: 'Campus Dine',
        description: 'Food Order Payment',
        image: 'https://i.imgur.com/3g7nmJC.png',
        handler: function(response) {
            // Payment successful
            alert('Payment successful! Order ID: ' + response.razorpay_payment_id);
            cart = [];
            updateCart();
            closeAllModals();
        },
        prefill: {
            name: currentUser.name,
            email: currentUser.email,
            contact: phone
        },
        theme: {
            color: '#FF6B35'
        }
    };
    
    // Initialize and open Razorpay payment window
    const rzp = new Razorpay(options);
    rzp.open();
}