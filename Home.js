const products = [{
    id: 1,
    name: "Classic White T-Shirt",
    price: 129.99,
    category: "shirts",
    image: "images/download.jpg" // Replace with your image path
},
{
    id: 2,
    name: "Slim Fit Jeans",
    price: 459.99,
    category: "pants",
    image: "images/download2.jpg" // Replace with your image path
},
{
    id: 3,
    name: "Floral Summer Dress",
    price: 179.99,
    category: "dresses",
    image: "images/download 3.jpg" // Replace with your image path
},
{
    id: 4,
    name: "Denim Jacket",
    price: 689.99,
    category: "shirts",
    image: "images/download 4.jpg" // Replace with your image path
},
{
    id: 5,
    name: "Cargo Pants",
    price: 849.99,
    category: "pants",
    image: "images/download 5.jpg" // Replace with your image path
},
{
    id: 6,
    name: "Evening Gown",
    price: 1999.99,
    category: "dresses",
    image: "images/download 6.jpg" // Replace with your image path
},
{
id: 7,
    name: "Henley Shirt",
    price: 399.99,
    categoy: "shirts",
    image: "images/download7.jpg" // Replace with your image path
},
{
    id: 8,
        name: "Chinos Pants",
        price: 309.99,
        category: "pants",
        image: "images/download8.jpg" // Replace with your image path
},
{
    id: 9,
        name: "Pencil Dress",
        price: 999.99,
        category: "dresses",
        image: "images/download9.jpg" // Replace with your image path
},
{
    id: 10,
        name: "Flannel Shirt",
            price: 749.99,
            category: "shirts",
            image: "images/download10.jpg" // Replace with your image path
},
{
    id: 11,
        name: "Jumpsuit",
        price: 749.99,
        category: "dresses",
        image: "images/download11.jpg" // Replace with your image path
    },
{
    id: 12,
        name: "Kurta Jacket",
        price: 549.99,
        category: "dresses",
        image: "images/download12.jpg" // Replace with your image path
},
{
    id: 13,
        name: "Cuban Collar Shirt",
        price: 449.99,
        category: "shirts",
        image: "images/download13.jpg" // Replace with your image path
},
{
    id: 14,
        name: "Maxi Anarkali",
        price: 1500.99,
        category: "dresses",
        image: "images/download14.jpg" // Replace with your image path
},
{
    id: 15,
        name: "Baggy Pants",
        price: 1229.99,
        category: "pants",
        image: "images/download15.jpg" // Replace with your image path
},
{
    id: 16,
        name: "Polo Shirt",
        price: 149.99,
        category: "shirts",
        image: "images/download16.jpg" // Replace with your image path
},

];

let cart = [];

function displayProducts(productsToShow = products) {
const container = document.getElementById('products-container');
container.innerHTML = '';

productsToShow.forEach(product => {
    const productCard = document.createElement('div');
    productCard.className = 'product-card';
    productCard.innerHTML = `
        <img src="${product.image}" alt="${product.name}" class="product-image">
        <div class="product-info">
            <h3 class="product-title">${product.name}</h3>
            <p class="product-price">₹ ${product.price}</p>
            <button class="add-to-cart" onclick="addToCart(${product.id})">Add to Cart</button>
        </div>
    `;
    container.appendChild(productCard);
});
}

function filterProducts() {
const categoryFilter = document.getElementById('category-filter').value;
const priceFilter = document.getElementById('price-filter').value;

let filtered = products;

if (categoryFilter !== 'all') {
    filtered = filtered.filter(product => product.category === categoryFilter);
}

if (priceFilter !== 'all') {
    const [min, max] = priceFilter.split('-').map(Number);
    filtered = filtered.filter(product => {
        if (max) {
            return product.price >= min && product.price <= max;
        } else {
            return product.price >= min;
        }
    });
}

displayProducts(filtered);
}

function addToCart(productId) {
const product = products.find(p => p.id === productId);
const existingItem = cart.find(item => item.id === productId);

if (existingItem) {
    existingItem.quantity += 1;
} else {
    cart.push({...product, quantity: 1});
}

updateCart();
}

function removeFromCart(productId) {
cart = cart.filter(item => item.id !== productId);
updateCart();
}

function updateCart() {
const cartItems = document.getElementById('cart-items');
const cartCount = document.querySelector('.cart-count');
const cartTotal = document.getElementById('cart-total');

cartItems.innerHTML = '';
let total = 0;

cart.forEach(item => {
    const itemElement = document.createElement('div');
    itemElement.className = 'cart-item';
    itemElement.innerHTML = `
        <img src="${item.image}" alt="${item.name}">
        <div class="cart-item-info">
            <h4>${item.name}</h4>
            <p>$${item.price} x ${item.quantity}</p>
        </div>
        <span class="remove-item" onclick="removeFromCart(${item.id})">❌</span>
    `;
    cartItems.appendChild(itemElement);
    total += item.price * item.quantity;
});

cartCount.textContent = cart.reduce((sum, item) => sum + item.quantity, 0);
cartTotal.textContent = total.toFixed(2);
}

function toggleCart() {
const cartModal = document.getElementById('cart-modal');
cartModal.style.display = cartModal.style.display === 'none' ? 'block' : 'none';
}

// Initial display
displayProducts();