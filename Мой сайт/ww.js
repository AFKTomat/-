let cart = [];

function addToCart(gameName, price) {
    cart.push({ name: gameName, price: price });
    updateCartDisplay();
    alert(`${gameName} добавлена в корзину!`);
}

function updateCartDisplay() {
    const cartItemsContainer = document.getElementById('cart-items');
    cartItemsContainer.innerHTML = '';

    if (cart.length === 0) {
        cartItemsContainer.innerHTML = '<p>Корзина пуста</p>';
        document.getElementById('checkout-button').disabled = true;
        return;
    }

    let total = 0;
    cart.forEach((item) => {
        const itemElement = document.createElement('div');
        itemElement.classList.add('cart-item');
        itemElement.innerHTML = `
            <p>${item.name} - ${item.price} руб.</p>
            <button onclick="removeFromCart('${item.name}')">Удалить</button>
        `;
        cartItemsContainer.appendChild(itemElement);
        total += item.price;
    });

    const totalElement = document.createElement('p');
    totalElement.innerHTML = `Итого: ${total} руб.`;
    cartItemsContainer.appendChild(totalElement);
    document.getElementById('checkout-button').disabled = false;
}

function removeFromCart(gameName) {
    cart = cart.filter(item => item.name !== gameName);
    updateCartDisplay();
}

function checkout() {
    if (cart.length === 0) {
        alert('Ваша корзина пуста!');
        return;
    }
    alert('Спасибо за покупку!');
    cart = [];
    updateCartDisplay();
}

const gameWrapper = document.querySelector('.game-wrapper');
const prevButton = document.getElementById('prev-button');
const nextButton = document.getElementById('next-button');
const gameCards = document.querySelectorAll('.game-card');
let currentPosition = 0;
const cardWidth = 320;

function slideGames(direction) {
    currentPosition += direction * cardWidth;
    currentPosition = Math.max(0, Math.min(currentPosition, (gameCards.length - 1) * cardWidth));
    gameWrapper.style.transform = `translateX(-${currentPosition}px)`;
}

prevButton.addEventListener('click', () => slideGames(-1));
nextButton.addEventListener('click', () => slideGames(1));

let autoSlideInterval = setInterval(() => slideGames(1), 5000);

prevButton.addEventListener('mouseover', () => clearInterval(autoSlideInterval));
nextButton.addEventListener('mouseover', () => clearInterval(autoSlideInterval));
prevButton.addEventListener('mouseout', () => autoSlideInterval = setInterval(() => slideGames(1), 5000));
nextButton.addEventListener('mouseout', () => autoSlideInterval = setInterval(() => slideGames(1), 5000));

function toggleCart() {
    const cart = document.getElementById('floating-cart');
    cart.classList.toggle('cart-visible');
}