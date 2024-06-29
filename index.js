function toggleMenu() {
    const nav = document.querySelector('.main-menu');
    nav.classList.toggle('active');
}


document.addEventListener('DOMContentLoaded', function() {
    // Productos
    const contenedorProductos = document.getElementById('product-grid');
    const productForm = document.getElementById('productForm');
    let productos = [];

    if (productForm) {
        productForm.addEventListener('submit', function(e) {
            e.preventDefault();

            const nuevoProducto = {
                nombre: document.getElementById('nombre').value,
                precio: parseFloat(document.getElementById('precio').value),
                imagen: document.getElementById('imagen').value
            };

            productos.push(nuevoProducto);
            mostrarProductos();

            productForm.reset();
        });
    }

    // Función para mostrar productos
    function mostrarProductos() {
        if (!contenedorProductos) return;

        contenedorProductos.innerHTML = '';

        if (productos.length === 0) {
            const mensaje = document.createElement('p');
            mensaje.classList.add('no-products');
            mensaje.textContent = 'No se han agregado productos.';
            contenedorProductos.appendChild(mensaje);
        } else {
            productos.forEach((producto, index) => {
                const tarjeta = document.createElement('div');
                tarjeta.classList.add('product-card');
                tarjeta.innerHTML = `
                    <img src="${producto.imagen}" alt="${producto.nombre}" class="product-image">
                    <p>${producto.nombre}</p>
                    <p>$${producto.precio.toFixed(2)}</p>
                    <button class="delete-button" onclick="eliminarProducto(${index})">
                        <img src="Imagenes/basurero-gris.png" alt="Eliminar producto">
                    </button>
                `;
                contenedorProductos.appendChild(tarjeta);
            });
        }
    }

    window.eliminarProducto = function(index) {
        productos.splice(index, 1);
        mostrarProductos();
    };

    // Cargar productos desde el archivo JSON
    fetch('productos.json')
        .then(response => response.json())
        .then(data => {
            productos = data;
            mostrarProductos();
        });

    // Formulario de contacto
    const contactForm = document.getElementById('contactForm');

    if (contactForm) {
        contactForm.addEventListener('submit', function(event) {
            event.preventDefault();

            const nombreApellido = document.getElementById('nombreapellido').value;
            const correoElectronico = document.getElementById('correoelectronico').value;
            const telefono = document.getElementById('telefono').value;
            const mensaje = document.getElementById('mensaje').value;
            const contacto = document.querySelector('input[name="contacto"]:checked').value;
            const novedades = document.getElementById('novedades').checked;

            const formData = {
                nombreApellido,
                correoElectronico,
                telefono,
                mensaje,
                contacto,
                novedades
            };

            let storedData = JSON.parse(localStorage.getItem('contactos')) || [];
            storedData.push(formData);
            localStorage.setItem('contactos', JSON.stringify(storedData));

            console.log(JSON.parse(localStorage.getItem('contactos')));

            alert('Formulario enviado correctamente. Los datos han sido almacenados localmente.');
            contactForm.reset();
        });
    }
});
