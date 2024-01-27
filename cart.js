/**
 * Pobiera element o klasie 'iconCart'.
 *
 * @type {HTMLElement}
 */
let iconCart = document.querySelector('.iconCart');

/**
 * Pobiera element o klasie 'cart'.
 *
 * @type {HTMLElement}
 */
let cart = document.querySelector('.cart');

/**
 * Pobiera element o klasie 'close'.
 *
 * @type {HTMLElement}
 */
let close = document.querySelector('.close');

/**
 * Dodaje nasłuchiwanie zdarzenia 'click' na elemencie 'iconCart' i ustawia wartość stylu 'right' na '0' dla elemetu 'cart'.
 */
iconCart.addEventListener('click', () => {
    cart.style.right = '0';
});

/**
 * Dodaje nasłuchiwanie zdarzenia 'click' na elemencie 'close' i ustawia wartość stylu 'right' na '-100%' dla elemetu 'cart'.
 */
close.addEventListener('click', () => {
    cart.style.right = '-100%';
});

/**
 * Pobiera element o identyfikatorze 'bar'.
 *
 * @type {HTMLElement}
 */
var bar = document.getElementById('bar');

/**
 * Pobiera element o identyfikatorze 'navbar'.
 *
 * @type {HTMLElement}
 */
var nav = document.getElementById('navbar');

/**
 * Pobiera element o identyfikatorze 'menu-close'.
 *
 * @type {HTMLElement}
 */
var menuclose = document.getElementById('menu-close'); 

/**
 * Dodaje nasłuchiwanie zdarzenia 'click' na elemencie 'bar' i przełącza klasę 'active' na elemencie 'nav'.
 * Jeśli element 'bar' nie istnieje, zdarzenie nie jest przypisywane.
 */
if(bar){
    bar.addEventListener('click', ()=>{
        nav.classList.toggle('active');
    });
}

/**
 * Dodaje nasłuchiwanie zdarzenia 'click' na elemencie 'menu-close' i usuwa klasę 'active' z elemetu 'nav'.
 * Jeśli element 'menuclose' nie istnieje, zdarzenie nie jest przypisywane.
 */
if(menuclose){
    menuclose.addEventListener('click', ()=>{
        nav.classList.remove('active');
    });
}

/**
     * Funkcja zamykająca powiadomienie o plikach cookie.
     *
     * @function
     * @returns {void}
     */
function closeCookieNotification() {
    document.getElementById('cookie-notification').style.display = 'none';
    // Ustawienie pliku cookie dla użytkownika z ważnością 7 dni.
    document.cookie = "user=user; expires=" + new Date(new Date().getTime() + 7 * 24 * 60 * 60 * 1000).toUTCString() + "; path=/";
}






/**
 * Zmienna przechowująca łączną cenę koszyka.
 *
 * @type {number}
 */
var totalCartPrice = 0;

/**
 * Zmienna przechowująca łączną liczbę elementów w koszyku.
 *
 * @type {number}
 */
var totalCartItems = 0;

/**
 * Znajduje przycisk o identyfikatorze 'buy-button'.
 *
 * @type {HTMLElement}
 */
var buyButton = document.getElementById('buy-button');

/**
 * Dodaje obsługę zdarzenia kliknięcia na przycisku 'buy-button'.
 * Jeśli przycisk istnieje, wywołuje funkcję playAddToCartSound.
 */
if (buyButton) {
    /**
     * Obsługuje zdarzenie kliknięcia na przycisku 'buy-button'.
     *
     * @function
     */
    buyButton.addEventListener('click', function () {
        // Wywołuje funkcję playAddToCartSound.
        playAddToCartSound();
    });
}

/**
 * Aktualizuje liczbę elementów w koszyku i wyświetla ją w ikonie koszyka.
 *
 * @function
 * @returns {void}
 */
function updateCartItemCount() {
    // Pobierz wszystkie elementy w koszyku
    var cartItems = document.querySelectorAll('.item');
    // Zaktualizuj liczbę elementów w koszyku
    totalCartItems = cartItems.length;

    // Zaktualizuj liczbę produktów w koszyku na stronie
    var iconCart = document.getElementById('iconCart');
    if (iconCart) {
        // Znajdź element reprezentujący liczbę produktów w koszyku
        var itemCountBadge = iconCart.querySelector('.item-count');

        // Jeśli nie istnieje, stwórz nowy element i dodaj do ikony koszyka
        if (!itemCountBadge) {
            itemCountBadge = document.createElement('span');
            itemCountBadge.classList.add('item-count');
            iconCart.appendChild(itemCountBadge);
        }

        // Aktualizuj liczbę produktów w koszyku na stronie
        itemCountBadge.textContent = totalCartItems;
    }
}

/**
 * Obiekt reprezentujący dźwięk dodania produktu do koszyka.
 *
 * @type {HTMLAudioElement}
 */
var addToCartSound = new Audio('../cart-sound.mp3');

/**
 * Odtwarza dźwięk dodania produktu do koszyka i wyświetla powiadomienie.
 *
 * @function
 * @returns {void}
 */
function playAddToCartSound() {
    // Odtwórz dźwięk dodania do koszyka
    addToCartSound.play();

    // Wywołaj funkcję wyświetlającą powiadomienie
    showNotification('Product has been added to the cart!');
}


/**
 * Dodaje produkt do koszyka.
 *
 * @function
 * @param {string} productName - Nazwa produktu.
 * @param {number} productPrice - Cena produktu.
 * @param {string} productImage - Ścieżka do obrazu produktu.
 * @returns {void}
 */
function addToCart(productName, productPrice, productImage) {
    // Utwórz nowy element produktu
    var cartItem = document.createElement('div');
    cartItem.classList.add('item');

    // Dodaj zawartość do elementu produktu
    cartItem.innerHTML = `
        <img src="${productImage}">
        <div class="content">
            <div class="name">
                ${productName}
            </div>
            <div class="cart-price">
                ${productPrice}
            </div>
        </div>
        <button class="remove-btn" onclick="removeFromCart(this, ${parseFloat(productPrice)})">X</button>
    `;

    // Dodaj produkt do koszyka
    var listCart = document.querySelector('.listCart');
    listCart.appendChild(cartItem);

    // Zaktualizuj całkowitą cenę
    totalCartPrice += parseFloat(productPrice);
    updateTotalPrice();

    // Zapisz aktualny stan koszyka w localStorage
    saveCartToLocalStorage();
    updateCartItemCount();
}

/**
 * Wyświetla powiadomienie na stronie.
 *
 * @function
 * @param {string} message - Treść powiadomienia.
 * @returns {void}
 */
function showNotification(message) {
    // Utwórz nowy element powiadomienia
    var notification = document.createElement('div');
    notification.classList.add('notification');
    notification.textContent = message;

    document.body.appendChild(notification);

    // Usuń powiadomienie po 3 sekundach
    setTimeout(function () {
        document.body.removeChild(notification);
    }, 3000);
}

/**
 * Usuwa produkt z koszyka.
 *
 * @function
 * @param {HTMLElement} button - Przycisk usuwający produkt.
 * @param {number} productPrice - Cena produktu do usunięcia.
 * @returns {void}
 */
function removeFromCart(button, productPrice) {
    // Znajdź rodzica przycisku, który jest elementem .item
    var item = button.closest('.item');

    // Sprawdź, czy element .item został znaleziony
    if (item) {
        // Usuń element .item z listy .listCart
        item.parentNode.removeChild(item);

        // Zaktualizuj całkowitą cenę po usunięciu produktu
        totalCartPrice -= productPrice;
        updateTotalPrice();

        // Zapisz aktualny stan koszyka w localStorage
        saveCartToLocalStorage();
        
        // Zaktualizuj liczbę produktów w koszyku
        updateCartItemCount();
    }
}

/**
 * Zapisuje informacje o zawartości koszyka do localStorage.
 *
 * @function
 * @returns {void}
 */
function saveCartToLocalStorage() {
    // Pobierz wszystkie elementy .item z koszyka
    var cartItems = document.querySelectorAll('.item');

    var cartData = [];

    cartItems.forEach(function (item) {
        var productName = item.querySelector('.name').textContent;
        var productPrice = item.querySelector('.cart-price').textContent;
        var productImage = item.querySelector('img').getAttribute('src');

        cartData.push({
            name: productName,
            price: productPrice,
            image: productImage
        });
    });

    // Zapisz dane do localStorage jako string JSON
    localStorage.setItem('cartData', JSON.stringify(cartData));
}

/**
 * Aktualizuje całkowitą cenę koszyka i wyświetla ją na stronie.
 *
 * @function
 * @returns {void}
 */
function updateTotalPrice() {
    var cartItems = document.querySelectorAll('.item');

    totalCartPrice = 0;

    cartItems.forEach(function (item) {
        var productPrice = parseFloat(item.querySelector('.cart-price').textContent.replace('$', ''));
        totalCartPrice += productPrice;
    });

    var totalPriceElement = document.querySelector('.total-price');
    totalPriceElement.textContent = 'Total: $' + totalCartPrice.toFixed(2);
}

/**
 * Wczytuje dane o zawartości koszyka z localStorage po załadowaniu strony.
 *
 * @function
 * @returns {void}
 */
function loadCartFromLocalStorage() {
    // Pobierz string z danymi koszyka z localStorage
    var cartDataString = localStorage.getItem('cartData');

    // Sprawdź, czy dane istnieją w localStorage
    if (cartDataString) {
        // Jeśli istnieją, przekształć string JSON na obiekt
        var cartData = JSON.parse(cartDataString);

        // Dodaj każdy produkt z koszyka na podstawie wczytanych danych
        cartData.forEach(function (product) {
            addToCart(product.name, product.price, product.image);
        });
    }
}

// Wywołaj funkcję wczytującą dane z localStorage po załadowaniu strony
updateCartItemCount();
updateTotalPrice();
loadCartFromLocalStorage();



