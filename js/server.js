const express = require('express');
const fs = require('fs');
const path = require('path');
const app = express();
const port = 8080;

app.use(express.json());


app.get('/cart', (req, res) => {
  fs.readFile(path.join(__dirname, 'cart.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading cart data');
    }
    res.json(JSON.parse(data));
  });
});


app.post('/cart', (req, res) => {
  fs.readFile(path.join(__dirname, 'cart.json'), 'utf8', (err, data) => {
    if (err) {
      return res.status(500).send('Error reading cart data');
    }
    const cart = JSON.parse(data);
    cart.carrito = req.body.carrito || cart.carrito; 
    fs.writeFile(path.join(__dirname, 'cart.json'), JSON.stringify(cart, null, 2), (err) => {
      if (err) {
        return res.status(500).send('Error writing cart data');
      }
      res.status(200).send('Carrito actualizado');
    });
  });
});


app.delete('/cart', (req, res) => {
  const emptyCart = { carrito: [] };
  fs.writeFile(path.join(__dirname, 'cart.json'), JSON.stringify(emptyCart, null, 2), (err) => {
    if (err) {
      return res.status(500).send('Error deleting cart data');
    }
    res.status(200).send('Carrito vaciado');
  });
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}/`);
});
