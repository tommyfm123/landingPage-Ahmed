

const scrollers = document.querySelectorAll('.scroller');
const faqs = document.querySelectorAll(".faq");

faqs.forEach((faq) => {
    faq.addEventListener('click', () => {
        faq.classList.toggle('active');
    });
});

// Función para animar el contador
function animateCount(element, start, end, duration) {
    let startTimestamp = null;
    const step = (timestamp) => {
        if (!startTimestamp) startTimestamp = timestamp;
        const progress = Math.min((timestamp - startTimestamp) / duration, 1);
        element.innerText = Math.floor(progress * (end - start) + start);
        if (progress < 1) {
            window.requestAnimationFrame(step);
        }
    };
    window.requestAnimationFrame(step);
}

// Función para observar cuando las secciones están en la vista
function observeSections() {
    const options = {
        root: null,
        rootMargin: '0px',
        threshold: 0.5 // Porcentaje visible del elemento en la ventana
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const countElement = entry.target.querySelector('.count');
                const start = parseInt(countElement.getAttribute('data-start'));
                const end = parseInt(countElement.getAttribute('data-end'));
                const duration = parseInt(countElement.getAttribute('data-duration'));
                animateCount(countElement, start, end, duration);
            }
        });
    }, options);

    // Observar todas las secciones con la clase 'bloque'
    document.querySelectorAll('.bloque').forEach(section => {
        observer.observe(section);
    });
}

// Llamar a la función para observar las secciones cuando se carga la página
window.addEventListener('load', observeSections);




