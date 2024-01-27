/**
 * Funkcja obsługująca kliknięcie na element o identyfikatorze "pag-1".
 * Wyświetla sekcję "news-1", ukrywa sekcję "news-2" i przewija stronę do góry.
 *
 * @function
 * @returns {void}
 */
document.getElementById("pag-1").onclick = function(){
    document.getElementById("news-1").style.display = "flex";
    document.getElementById("news-2").style.display = "none";
    window.scrollTo({top: 0, behavior: 'smooth'});
}

/**
 * Funkcja obsługująca kliknięcie na element o identyfikatorze "pag-2".
 * Wyświetla sekcję "news-2", ukrywa sekcję "news-1" i przewija stronę do góry.
 *
 * @function
 * @returns {void}
 */
document.getElementById("pag-2").onclick = function(){
    document.getElementById("news-2").style.display = "flex";
    document.getElementById("news-1").style.display = "none";
    window.scrollTo({top: 0, behavior: 'smooth'});
}

/**
 * Funkcja obsługująca kliknięcie na element o identyfikatorze "pag-arr".
 * Wyświetla sekcję "news-2", ukrywa sekcję "news-1" i przewija stronę do góry.
 *
 * @function
 * @returns {void}
 */
document.getElementById("pag-arr").onclick = function(){
    document.getElementById("news-1").style.display = "none";
    document.getElementById("news-2").style.display = "flex";
    window.scrollTo({top: 0, behavior: 'smooth'});
}