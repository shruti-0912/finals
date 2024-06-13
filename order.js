// Sample menu data (replace with your actual menu data)
const menuItems = [
    { name: "Homemade Chocolate Cake Pops", price: 5, image: "Homemade Chocolate Cake Pops.jpeg" },
    { name: "Mango Jelly", price: 3, image: "mango jelly.jpeg" },
    { name: "Mango Tiramisu", price: 23, image: "Mango Tiramisu.jpeg" },
    { name: "Strawberry Cake", price: 10, image: "strawcake.jpeg" },
    { name: "Cupcakes", price: 5, image: "cupcakes.jpeg" }
];

// Array to store order items
let orderItems = [];

// Function to display menu items based on search query
function displayMenuItems(searchQuery) {
    const menuItemsSection = document.querySelector('.menu-items-section');
    menuItemsSection.innerHTML = '';

    menuItems.forEach(item => {
        if (item.name.toLowerCase().includes(searchQuery.toLowerCase())) {
            const menuItem = document.createElement('div');
            menuItem.classList.add('menu-item');

            menuItem.innerHTML = `
                <img src="${item.image}" alt="${item.name}">
                <h3>${item.name}</h3>
                <p>$${item.price.toFixed(2)}</p>
                <button class="add-item-btn" data-name="${item.name}" data-price="${item.price}">Add to Order</button>
            `;

            menuItemsSection.appendChild(menuItem);
        }
    });
}

// Function to add item to the order
function addItemToOrder(event) {
    if (event.target.classList.contains('add-item-btn')) {
        const itemName = event.target.getAttribute('data-name');
        const itemPrice = parseFloat(event.target.getAttribute('data-price'));

        // Add the item to the order array
        orderItems.push({ name: itemName, price: itemPrice });

        // Update the order display and total cost
        displayOrder();
    }
}

// Function to remove item from the order
function removeItemFromOrder(event) {
    if (event.target.classList.contains('remove-item-btn')) {
        const itemName = event.target.getAttribute('data-name');

        // Remove the item from the order array
        orderItems = orderItems.filter(item => item.name !== itemName);

        // Update the order display and total cost
        displayOrder();
    }
}

// Function to display the order
function displayOrder() {
    const orderList = document.querySelector('.order-list');
    orderList.innerHTML = '';

    orderItems.forEach(item => {
        const orderItem = document.createElement('div');
        orderItem.classList.add('order-item');
        orderItem.innerHTML = `
            <span>${item.name}</span>
            <span>$${item.price.toFixed(2)}</span>
            <button class="remove-item-btn" data-name="${item.name}">Remove</button>
        `;
        orderList.appendChild(orderItem);
    });

    // Update the total cost
    updateTotalCost();
}

// Function to update the total cost
function updateTotalCost() {
    const totalCost = orderItems.reduce((total, item) => total + item.price, 0);
    document.querySelector('.total-cost').textContent = `$${totalCost.toFixed(2)}`;
}

// Function to handle order submission
function submitOrder() {
    if (orderItems.length === 0) {
        alert('Please add items to your order first!');
    } else {
        alert('Order placed successfully!');
        // Here you can add code to submit the order to a server or process it further
    }
}

// Function to handle user input in the search bar
function handleSearchInput(event) {
    const searchQuery = event.target.value;
    displayMenuItems(searchQuery);
}

// Event listeners
document.addEventListener('DOMContentLoaded', () => {
    displayMenuItems('');
});

document.querySelector('#searchInput').addEventListener('input', handleSearchInput);
document.querySelector('.menu-items-section').addEventListener('click', addItemToOrder);
document.querySelector('.order-list').addEventListener('click', removeItemFromOrder);
document.querySelector('.order-button').addEventListener('click', submitOrder);
