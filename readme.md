Este es un simulador de e-commerce de accesorios realizados en porcelana fría.

En la pestaña de Shop encontrarán el simulador más precisamente realizado con Javascript.

Se pueden agregar distintos elementos al carrito, quitarse y sumarse y finalizar la compra.

El .js funciona pero también pueden encontrar el código alternativo para probar el funcionamiento de POST y DELETE con una API. Esto es debido a que estuve haciendo pruebas y simulaciones de backend. Pueden encontrar la configuración para las solicitudes en /api/cart con Node.js o con PHP. También estuve experimentando con CORS. Agregando y borrando elementos del carrito en el archivo cart.json.

Aunque si solo quisiera simular una búsqueda con fetch sin configurar un servidor local, para eso está el archivo getProducts. Solo que ese caso no está en funcionamiento porque tendría conflicto con los objetos creados por mi y los objetos de ejemplo en fakestore. Así que solo dejé el archivo para mostrar que podría consultar con fetch como hicimos en clase, pero no quise incluírlo en mi tienda porque quería hacer todo el front y me limité a que el js funcione, no quise meter todo a la fuerza y sobrecargar el código solo para mostrar lo mismo de otra manera. 

Con esto mi intención es dejar las bases para continuar este proyecto en una db cuando tenga más conocimientos del backend. Por el momento espero que sea suficiente con el funcionamiento de javascript.

