# Proyecto Backend - E-commerce con Tiempo Real

Descripción

Este proyecto consiste en un servidor backend para un e-commerce con funcionalidades avanzadas como:

Administración de productos y carritos de compra.

Visualización de productos en tiempo real.

Integración de vistas dinámicas con Handlebars.

Persistencia de datos utilizando MongoDB.

Comunicación en tiempo real mediante WebSockets (Socket.io).

Tecnologías utilizadas

Node.js: Entorno de ejecución para JavaScript en el servidor.

Express.js: Framework para crear el servidor.

MongoDB: Base de datos NoSQL utilizada para la persistencia de datos.

Mongoose: ODM para interactuar con MongoDB.

Socket.io: Biblioteca para la comunicación en tiempo real entre cliente y servidor.

Handlebars: Motor de plantillas para renderizar vistas dinámicas.

Instalación

Clona el repositorio:

git clone https://github.com/tu-usuario/proyecto-backend-ecommerce.git

Accede al directorio del proyecto:

cd proyecto-backend-ecommerce

Instala las dependencias necesarias:

npm install

Crea un archivo .env en la raíz del proyecto con la siguiente configuración:

PORT=8080
MONGO_URI=mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/Proyecto_CH

Importa los datos iniciales a la base de datos:

mongoimport --uri "mongodb+srv://<usuario>:<contraseña>@cluster0.mongodb.net/Proyecto_CH" --file="./backup/products.json" --jsonArray

Uso

Inicia el servidor:

npm start

Accede a las siguientes rutas principales:

Vistas:

/ - Inicio con lista de productos en tiempo real.

/products - Lista de productos.

/carts - Vista del carrito de compras.

API:

GET /api/products - Obtener lista de productos.

POST /api/products - Agregar un nuevo producto.

DELETE /api/products/:id - Eliminar un producto.

GET /api/carts - Obtener carritos.

POST /api/carts - Crear un nuevo carrito.

POST /api/carts/:id/products - Agregar productos al carrito.

DELETE /api/carts/:id/products/:productId - Eliminar productos del carrito.

Para ver la lista de productos en tiempo real, accede a la vista principal / y utiliza las opciones de agregar o eliminar productos para observar los cambios inmediatos en la tabla.

Estructura del proyecto

proyecto-backend-ecommerce/
|-- src/
|   |-- public/
|   |   |-- css/           # Archivos CSS
|   |   |-- js/            # Archivos JS
|   |   |-- images/        # Imágenes
|   |-- views/             # Plantillas Handlebars
|   |-- models/            # Modelos de datos con Mongoose
|   |-- routes/            # Rutas del servidor
|   |-- controllers/       # Lógica de negocio
|-- backup/                # Archivos JSON para importar datos
|-- .env                   # Configuración del entorno
|-- package.json           # Dependencias del proyecto

Funcionalidades principales

Productos

Agregar, eliminar y listar productos desde una API REST.

Visualización en tiempo real con tabla interactiva que incluye:

ID, Nombre, Precio, y botones para:

Agregar al carrito.

Eliminar del carrito.

Carrito

Crear carritos y agregar productos a ellos.

Eliminar productos del carrito.

Actualización del estado del carrito en tiempo real.

Vistas

Renderizadas con Handlebars.

Tabla de productos en tiempo real.

Formularios interactivos para agregar y eliminar productos.

Contribuir

Realiza un fork del repositorio.

Crea una rama nueva para tus cambios:

git checkout -b mi-nueva-funcionalidad

Realiza los cambios necesarios y realiza commit:

git commit -m "Agregada nueva funcionalidad"

Envía tus cambios:

git push origin mi-nueva-funcionalidad

Abre un pull request.

Licencia

Este proyecto está bajo la licencia MIT. Puedes usarlo, modificarlo y distribuirlo libremente.