## Descripción

Este proyecto es un E-Commerce realizado en NextJS con la integración de PostgresSQL para la base de datos, el uso de NextAuth para la autenticación de los usuarios, también el uso de PayPal para los pagos, Cloudinary para el manejo de imágenes en la nube y muchas herramientas más.

En el proyecto se va a poder registrar para poder hacer compras de los productos disponibles con todo el proceso completo de gestión de pagos y demás.

## Características
- Autenticación de usuarios con **NextAuth**
- Base de datos relacional con **PostgreSQL**
- Uso de **Prisma** para facilitar la comunicación entre la aplicación y la base de datos. Prisma permite manejar los datos de forma sencilla y segura sin tener que hacer consultas complejas.
- Pasarela de pagos integrada con **PayPal**
- Gestión de imágenes en la nube con **Cloudinary**
- Carrito de compras funcional
- Sistema de administración para agregar/editar productos

## Correr en dev

Para correr el proyecto en dev se deben seguir los siguientes pasos:

1. Clonar el repositorio.
2. Crear una copia del ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.
3. Instalar dependencias con ```npm install```.
4. Levantar la base de datos ```docker compose up -d```.
5. Correr las migraciones de Prisma ```npx prisma migrate dev```.
6. Correr el proyecto con ```npm run dev```.


## Observación
El proyecto se encuentra en desarrollo activo. Algunas funcionalidades clave están completas, pero se están planificando futuras mejoras como el soporte para múltiples pasarelas de pago, etc.