const getProducts = () => {
    fetch('https://fakestoreapi.com/products')
      .then((response) => response.json())
      .then((products) => {
        pintarProductos(products)
      })
  };
  