/**
 * Dodaje efekt animacji po najechaniu na produkt.
 *
 * @function
 * @param {MouseEvent} e - Obiekt zdarzenia myszy.
 * @returns {void}
 */
const products = document.querySelectorAll('.product');

products.forEach(product => {
    product.addEventListener('mousemove', (e) => {
        const boundingRect = product.getBoundingClientRect();
        const mouseX = e.clientX - boundingRect.left;
        const mouseY = e.clientY - boundingRect.top;
        
        const centerX = boundingRect.width / 2;
        const centerY = boundingRect.height / 2;

        const deltaX = mouseX - centerX;
        const deltaY = mouseY - centerY;

        const angleX = deltaX / centerX * 10; 
        const angleY = deltaY / centerY * 10; 

        product.style.transform = `perspective(1000px) rotateX(${-angleY}deg) rotateY(${angleX}deg)`;
    });

    product.addEventListener('mouseleave', () => {
        product.style.transform = 'perspective(1000px) rotateX(0deg) rotateY(0deg)';
    });
});