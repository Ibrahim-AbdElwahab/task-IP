let cart = JSON.parse(localStorage.getItem("cart")) || [];

function saveCart() {
    localStorage.setItem("cart", JSON.stringify(cart));
}

function updateCartCount() {
    const c = document.getElementById("cart-count");
    if (c) c.innerText = cart.length;
}

document.addEventListener("click", function(e) {
    if (e.target.classList.contains("add-to-cart")) {

        const item = {
            id: e.target.dataset.id,
            name: e.target.dataset.name,
            price: parseFloat(e.target.dataset.price),
            img: e.target.dataset.img
        };

        cart.push(item);
        saveCart();
        updateCartCount();
        alert("Added to cart!");
    }
});

window.addEventListener("load", function() {
    updateCartCount();

    if (window.location.pathname.includes("cart.html")) displayCart();
});

function displayCart() {
    const container = document.getElementById("cart-items");
    let total = 0;
    container.innerHTML = "";

    cart.forEach((item, i) => {
        total += item.price;

        container.innerHTML += `
            <div class="cart-item">
                <img src="${item.img}">
                <div>
                    <h4>${item.name}</h4>
                    <p>$${item.price}</p>
                    <button class="btn" onclick="removeItem(${i})">Remove</button>
                </div>
            </div>
        `;
    });

    document.getElementById("total-price").innerText = total.toFixed(2);
}

function removeItem(i) {
    cart.splice(i, 1);
    saveCart();
    displayCart();
}

const productDetailsContainer = document.getElementById("product-details");

if (productDetailsContainer) {
    const params = new URLSearchParams(window.location.search);
    const productId = params.get("id");

    const product = products.find(p => p.id == productId);

    if (product) {
        productDetailsContainer.innerHTML = `
            <div class="product-details-card">
                <img src="${product.image}" alt="${product.name}">
                <h2>${product.name}</h2>
                <p>${product.description}</p>
                <h3>$${product.price}</h3>

                <button class="btn add-to-cart" data-id="${product.id}">
                    Add to Cart
                </button>
            </div>
        `;
    }
}
