let carrito = [];

const guardarCarritoEnLocalStorage = () => {
  localStorage.setItem('carrito', JSON.stringify(carrito));
};

const cargarCarritoDesdeLocalStorage = () => {
  const carritoGuardado = localStorage.getItem('carrito');
  if (carritoGuardado) {
    carrito = JSON.parse(carritoGuardado);
    pintarCarrito(carrito);
  }
};

const productoContenedor = document.getElementById('producto-contenedor');

productoContenedor.addEventListener('click', (event) => {
  if (event.target.classList.contains('agregar')) {
    validarProductoCarrito(event.target.id);
  }
});

const validarProductoCarrito = (productoId) => {
  const estaRepetido = carrito.some((producto) => producto.id == productoId);

  if (estaRepetido) {
    const producto = carrito.find((producto) => producto.id == productoId);
    producto.cantidad++;
    const cantidad = document.getElementById(`cantidad${producto.id}`);
    cantidad.textContent = `Cantidad: ${producto.cantidad}`;
  } else {
    const producto = productos.find((producto) => producto.id == productoId);
    carrito.push(producto);
    pintarProductoCarrito(producto);
  }

  guardarCarritoEnLocalStorage();
};

const pintarProductoCarrito = (producto) => {
  const carritoContenedor = document.getElementById('carrito-contenedor');

  const div = document.createElement('div');
  div.classList.add('productoEnCarrito');

  div.innerHTML += `
    <p>${producto.nombre}</p>
    <p>$${producto.precio}</p>
    <p id="cantidad${producto.id}">Cantidad: ${producto.cantidad}</p>
    <button class="btn waves-effect waves-light boton-eliminar" value="${producto.id}">X</button>
  `;
  carritoContenedor.appendChild(div);

  mostrarBotonesCarrito();
};

const eliminarProductoCarrito = (productoId) => {
  const productoIndex = carrito.findIndex((producto) => producto.id == productoId);

  if (carrito[productoIndex].cantidad === 1) {
    carrito.splice(productoIndex, 1);
  } else {
    carrito[productoIndex].cantidad--;
  }

  pintarCarrito(carrito);

  guardarCarritoEnLocalStorage();
};

const vaciarCarrito = () => {
  carrito = [];
  pintarCarrito(carrito);

  guardarCarritoEnLocalStorage();
};

const pintarCarrito = (carrito) => {
  const carritoContenedor = document.getElementById('carrito-contenedor');

  carritoContenedor.innerHTML = '';

  carrito.forEach(producto => {
    const div = document.createElement('div');
    div.classList.add('productoEnCarrito');

    div.innerHTML += `
      <p>${producto.nombre}</p>
      <p>$${producto.precio}</p>
      <p id="cantidad${producto.id}">Cantidad: ${producto.cantidad}</p>
      <button class="btn waves-effect waves-light boton-eliminar" value="${producto.id}">X</button>
    `;
    carritoContenedor.appendChild(div);
  });

  mostrarBotonesCarrito();
};

const mostrarBotonesCarrito = () => {
  let botonFinalizarCompra = document.getElementById('btn-finalizar-compra');
  let botonVaciarCarrito = document.getElementById('btn-vaciar-carrito');
  const carritoContenedor = document.getElementById('carrito-contenedor');

  if (carrito.length === 0) {
    if (botonFinalizarCompra) {
      botonFinalizarCompra.remove();
    }
    if (botonVaciarCarrito) {
      botonVaciarCarrito.remove();
    }
    return;
  }

  if (botonFinalizarCompra) {
    carritoContenedor.removeChild(botonFinalizarCompra);
  }
  if (botonVaciarCarrito) {
    carritoContenedor.removeChild(botonVaciarCarrito);
  }

  botonFinalizarCompra = document.createElement('button');
  botonFinalizarCompra.id = 'btn-finalizar-compra';
  botonFinalizarCompra.classList.add('btn', 'btn-primary');
  botonFinalizarCompra.textContent = 'Finalizar compra';
  botonFinalizarCompra.addEventListener('click', mostrarPopupFinalizarCompra);
  carritoContenedor.appendChild(botonFinalizarCompra);

  botonVaciarCarrito = document.createElement('button');
  botonVaciarCarrito.id = 'btn-vaciar-carrito';
  botonVaciarCarrito.classList.add('btn', 'btn-danger');
  botonVaciarCarrito.textContent = 'Vaciar carrito';
  botonVaciarCarrito.addEventListener('click', vaciarCarrito);
  carritoContenedor.appendChild(botonVaciarCarrito);
};

const mostrarPopupFinalizarCompra = () => {
  const total = carrito.reduce((acc, producto) => acc + (producto.precio * producto.cantidad), 0);

  document.getElementById('carrito-contenedor').style.display = 'none';

  Swal.fire({
    title: 'Total de la compra',
    html: `<p>Total: $${total.toFixed(2)}</p>`,
    showCancelButton: true,
    confirmButtonText: 'Ir a pagar',
    cancelButtonText: 'Cerrar',
    confirmButtonColor: '#3085d6',
    cancelButtonColor: '#d33',
    preConfirm: () => {
      window.location.href = 'https://www.mercadopago.com.ar';
    }
  }).then((result) => {
    if (result.isDismissed) {
      document.getElementById('carrito-contenedor').style.display = 'block';
    }
  });
};

window.onload = cargarCarritoDesdeLocalStorage;


// Funciones de ejemplo para realizar fetch (para pruebas o eliminación)
const realizarFetchEjemplo = async () => {
  try {
    // Ejemplo para agregar un producto
    await fetch('http://localhost:8080/cart', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(carrito)
    });

    // Ejemplo para vaciar el carrito
    await fetch('http://localhost:8080/cart', {
      method: 'DELETE',
      headers: {
        'Content-Type': 'application/json'
      }
    });
  } catch (error) {
    console.error('Error in fetch examples:', error);
  }
};



