document.addEventListener('DOMContentLoaded', () => {
    const modalContenedor = document.querySelector('.modal-contenedor');
    const abrirCarrito = document.getElementById('cesta-carrito');
    const cerrarCarrito = document.getElementById('btn-cerrar-carrito');
    const modalCarrito = document.querySelector('.modal-carrito');

    const abrirModal = () => {
        modalContenedor.classList.add('modal-active');
    };

    const cerrarModal = () => {
        modalContenedor.classList.remove('modal-active');
    };

    abrirCarrito.addEventListener('click', abrirModal);

    cerrarCarrito.addEventListener('click', cerrarModal);

    modalContenedor.addEventListener('click', (event) => {
        if (event.target === modalContenedor) {
            cerrarModal();
        }
    });

    modalCarrito.addEventListener('click', (event) => {
        if (event.target.classList.contains('boton-eliminar')) {
            eliminarProductoCarrito(event.target.value);
        }
    });
});
