function toggleMenu() {
    const nav = document.querySelector('.main-menu');
    nav.classList.toggle('active');
}


// sección de productos

document.addEventListener('DOMContentLoaded', function () {
    const productos = [
    {
        nombre:'producto 1',
        precio:'00.00',
        imagen:''
    },
    {
        nombre:'producto 2',
        precio:'00.00',
        imagen:''
    },
    {
        nombre:'producto 3',
        precio:'00.00',
        imagen:''
    },
    {
        nombre:'producto 4',
        precio:'00.00',
        imagen:''
    },
    {
        nombre:'producto 5',
        precio:'00.00',
        imagen:''
    },
    {
        nombre:'producto 6',
        precio:'00.00',
        imagen:''
    },
    {
        nombre:'producto 7',
        precio:'00.00',
        imagen:''
    },
    {
        nombre:'producto 8',
        precio:'00.00',
        imagen:''
    },
    {
        nombre:'producto 9',
        precio:'00.00',
        imagen:''
    },
    {
        nombre:'producto 10',
        precio:'00.00',
        imagen:''
    },
    {
        nombre:'producto 11',
        precio:'00.00',
        imagen:''
    },
    {
        nombre:'producto 12',
        precio:'00.00',
        imagen:''
    }

    ]; 

    const contenedorProductos = document.getElementById('productGrid');
    const form = document.getElementById('productForm');
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
}  