function toggleMenu() {
  const nav = document.querySelector(".main-menu");
  nav.classList.toggle("active");
}

document.addEventListener("DOMContentLoaded", function () {
  const productForm = document.getElementById("productForm");
  const contenedorProductos = document.getElementById("product-grid");
  let productos = [];

  if (productForm && contenedorProductos) {
    // Aquí verifica si ambos elementos existen//
    productForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const nuevoProducto = {
        nombre: document.getElementById("nombre").value,
        precio: parseFloat(document.getElementById("precio").value),
        imagen: document.getElementById("imagen").value,
      };

      fetch("http://localhost:3000/productos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(nuevoProducto),
      })
        .then((response) => response.json())
        .then((data) => {
          productos.push(data);
          mostrarProductos();
          alert("Producto creado");
        })
        .catch((error) => console.error("Error:", error));

      productForm.reset();
    });

    function mostrarProductos() {
      contenedorProductos.innerHTML = "";

      if (productos.length === 0) {
        const mensaje = document.createElement("p");
        mensaje.classList.add("no-products");
        mensaje.textContent = "No se han agregado productos.";
        contenedorProductos.appendChild(mensaje);
      } else {
        productos.forEach((producto) => {
          const tarjeta = document.createElement("div");
          tarjeta.classList.add("product-card");
          tarjeta.innerHTML = `
            <img src="${producto.imagen}" alt="${
            producto.nombre
          }" class="product-image">
            <p>${producto.nombre}</p>
            <p>$${producto.precio.toFixed(2)}</p>
            <button class="delete-button" onclick="eliminarProducto('${
              producto.id
            }')">
                <img src="Imagenes/basurero-gris.png" alt="Eliminar producto">
            </button>
          `;
          contenedorProductos.appendChild(tarjeta);
        });
      }
    }

    window.eliminarProducto = function (id) {
      fetch(`http://localhost:3000/productos/${id}`, {
        method: "DELETE",
      })
        .then(() => {
          productos = productos.filter((producto) => producto.id !== id);
          mostrarProductos();
        })
        .catch((error) => console.error("Error:", error));
    };

    // Esto va a cargar  productos desde el servidor JSON//
    fetch("http://localhost:3000/productos")
      .then((response) => response.json())
      .then((data) => {
        productos = data;
        mostrarProductos();
      })
      .catch((error) => console.error("Error:", error));
  }

  // Formulario de contacto//
  const contactForm = document.getElementById("contactForm");

  if (contactForm) {
    contactForm.addEventListener("submit", function (event) {
      event.preventDefault();

      const nombreApellido = document.getElementById("nombreapellido").value;
      const correoElectronico =
        document.getElementById("correoelectronico").value;
      const telefono = document.getElementById("telefono").value;
      const mensaje = document.getElementById("mensaje").value;
      const contacto = document.querySelector(
        'input[name="contacto"]:checked'
      ).value;
      const novedades = document.getElementById("novedades").checked;

      const formData = {
        nombreApellido,
        correoElectronico,
        telefono,
        mensaje,
        contacto,
        novedades,
      };

      fetch("http://localhost:3000/contactos", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(formData),
      })
        .then((response) => response.json())
        .then((data) => {
          let storedData = JSON.parse(localStorage.getItem("contactos")) || [];
          storedData.push(data);
          localStorage.setItem("contactos", JSON.stringify(storedData));
          console.log(
            "contactos guardados en localStorage:",
            JSON.parse(localStorage.getItem("contactos"))
          );

          contactForm.reset();
        })
        .catch((error) => console.error("Error:", error));
    });

    // Verificar contactos guardados en el servidor JSON//
    fetch("http://localhost:3000/contactos")
      .then((response) => response.json())
      .then((data) => {
        console.log("Contactos guardados en el servidor JSON:", data);
      })
      .catch((error) => console.error("Error:", error));
  }
});
