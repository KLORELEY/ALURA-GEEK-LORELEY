function toggleMenu() {
    const nav = document.querySelector('.main-menu');
    nav.classList.toggle('active');
}


// sección de productos

document.addEventListener('DOMContentLoaded', function() {
    const contenedorProductos = document.getElementById('productGrid');
    const form = document.getElementById('productForm');
    let productos = [];

    // Función para mostrar productos
    function mostrarProductos() {
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

    // Función para eliminar producto
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

    // Función para agregar producto
    form.addEventListener('submit', function(e) {
        e.preventDefault();
        
        const nuevoProducto = {
            nombre: document.getElementById('nombre').value,
            precio: parseFloat(document.getElementById('precio').value),
            imagen: document.getElementById('imagen').value
        };
        
        productos.push(nuevoProducto);
        mostrarProductos();
        
        form.reset();
    });
});
