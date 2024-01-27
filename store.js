let currentSlide = 1;
let slideInterval;

/**
 * Funkcja wyświetlająca określony slajd.
 *
 * @function
 * @param {number} slideNumber - Numer slajdu do wyświetlenia.
 * @returns {void}
 */
function showSlide(slideNumber) {
    setButtonColors('.slider-btt');
    const slideId = `slide-${slideNumber}`;
    document.getElementById(`${slideId}-btt`).style.backgroundColor = "rgb(21, 85, 21)";

    for (let i = 1; i <= 6; i++) {
        const slideElement = document.getElementById(`slide-${i}`);
        slideElement.style.display = i === slideNumber ? "flex" : "none";
    }

    clearInterval(slideInterval);
    startSlideInterval();
}
/**
 * Funkcja ustawiająca domyślne kolory przycisków.
 *
 * @function
 * @param {string} selector - Selektor przycisków.
 * @returns {void}
 */

function setButtonColors(selector) {
    document.querySelectorAll(selector).forEach(button => {
        button.style.backgroundColor = "rgb(21, 131, 102)";
    });
}

/**
 * Funkcja rozpoczynająca interwał slajdów.
 *
 * @function
 * @returns {void}
 */
function startSlideInterval() {
    slideInterval = setInterval(() => {
        currentSlide = currentSlide % 6 + 1;
        showSlide(currentSlide);
    }, 4000);
}

startSlideInterval();

// Dodanie obsługi kliknięć dla przycisków slajdów
for (let i = 1; i <= 6; i++) {
    const buttonId = `slide-${i}-btt`;
    document.getElementById(buttonId).onclick = function () {
        currentSlide = i;
        showSlide(i);
    };
}


// Initial display for the first slide
showSlide(1);

document.addEventListener("DOMContentLoaded", function () {
    var sliderItems = document.querySelectorAll("#store-featured-slider .slider-item");

    sliderItems.forEach(function (item) {
        var sliderImages = item.querySelectorAll(".slider-images img");
        var mainImage = item.querySelector("img");

        // Ustawienie atrybutu data-original-src
        mainImage.dataset.originalSrc = mainImage.src;

        item.addEventListener("mouseenter", function (event) {
            if (event.target.tagName === "IMG") {
                mainImage.src = event.target.src;
            }
        });

        item.addEventListener("mouseleave", function () {
            mainImage.src = mainImage.dataset.originalSrc || "";
        });

        sliderImages.forEach(function (image) {
            image.addEventListener("mouseenter", function () {
                mainImage.src = image.src;
            });

            image.addEventListener("mouseleave", function () {
                mainImage.src = mainImage.dataset.originalSrc || "";
            });
        });
    });
});