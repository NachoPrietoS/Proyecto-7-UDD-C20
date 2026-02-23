# 🎮 GAMERSHOP - Fullstack E-commerce

Bienvenido a **Gamershop**, una plataforma de comercio electrónico diseñada para entusiastas de los videojuegos. Este proyecto es una aplicación Fullstack que integra un catálogo dinámico, gestión de usuarios, carrito de compras y una pasarela de pagos real en modo de pruebas.

---

## 🚀 Sobre el Proyecto

El objetivo principal es ofrecer una experiencia de usuario fluida con una estética "Dark Mode" moderna, garantizando seguridad en el manejo de datos y transacciones.

### Características Principales:
- **Autenticación Segura:** Registro e inicio de sesión utilizando **JSON Web Tokens (JWT)**.
- **Catálogo de Productos:** Exploración de videojuegos con rutas dinámicas para detalles individuales.
- **Gestión de Carrito:** Persistencia de productos y manejo de cantidades mediante estado global.
- **Checkout con Stripe:** Integración completa con la pasarela de pagos Stripe para procesar compras.
- **Área Privada:** Perfil de usuario protegido para gestionar información personal y de envío.

---

## 🛠️ Tecnologías Utilizadas

### Frontend
- **React (Vite):** Biblioteca principal para la interfaz.
- **Material UI (MUI):** Sistema de diseño y componentes responsivos.
- **Context API & useReducer:** Manejo de estado global de la aplicación.
- **React Router Dom:** Gestión de ruteo y protección de rutas privadas.
- **Axios:** Cliente HTTP para consumo de la API.

### Backend
- **Node.js & Express:** Entorno de ejecución y framework del servidor.
- **MongoDB & Mongoose:** Base de datos NoSQL y modelado de datos.
- **JWT & bcryptjs:** Seguridad para autenticación y encriptación de contraseñas.
- **Stripe API:** Procesamiento de pagos electrónicos.

---

## 💻 Instalación y Configuración Local

Sigue estos pasos para ejecutar el proyecto en tu máquina:

### 1. Clonar el repositorio
git clone [https://github.com/nachoprietos/proyecto-7-udd-c20.git](https://github.com/nachoprietos/proyecto-7-udd-c20.git)
cd proyecto-7-udd-c20

### 2. Instalar dependencias

Ejecutar comando npm install

### 3. Configurar Variables de Entorno (.env)
Crea un archivo .env en la raíz del proyecto (o en la carpeta del servidor) y añade los siguientes parámetros:

# Servidor
PORT=4000
MONGODB_URI=tu_url_de_mongo_atlas

# Seguridad
SECRET_KEY_JWT=tu_llave_secreta_super_segura

# Pasarela de Pagos (Stripe)
STRIPE_SECRET_KEY=tu_sk_test_de_stripe
STRIPE_SUCCESS_URL=http://localhost:5173/success
STRIPE_CANCEL_URL=http://localhost:5173/cancel

# Cliente
FRONTEND_URL=http://localhost:5173

### 4. Iniciar Proyecto

npm run dev

### 5. Estructura

La aplicación está organizada de manera modular para facilitar su mantenimiento:

/src/components: Componentes de interfaz (Header, Footer, Checkout, Auth, etc.).

/src/contexts: Estados globales divididos por dominios (User y Game).

/src/routes: Definición de ruteo y componentes de protección de rutas (Private.jsx, Auth.jsx).

/src/config: Configuración centralizada de Axios.