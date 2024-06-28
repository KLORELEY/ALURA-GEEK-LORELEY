function toggleMenu() {
    const nav = document.querySelector('.main-menu');
    nav.classList.toggle('active');
}

document.addEventListener('DOMContentLoaded', function() {
    const demoButtons = document.querySelectorAll('.experience__boton--demo');

    demoButtons.forEach(function(button) {
        button.addEventListener('click', function(event) {
            event.preventDefault(); 
            const url = button.getAttribute('data-url');
            window.open(url, '_blank'); 
        });
    });
});
