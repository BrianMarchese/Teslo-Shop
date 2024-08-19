# Descripción

Este proyecto es un E-Commerce realizado en NextJS.

## Correr en dev

Para correr el proyecto en dev se deben seguir los siguientes pasos:

1. Clonar el repositorio.
2. Crear una copia del ```.env.template``` y renombrarlo a ```.env``` y cambiar las variables de entorno.
3. Instalar dependencias con ```npm install```.
4. Levantar la base de datos ```docker compose up -d```.
5. Correr las migraciones de Prisma ```npx prisma migrate dev```.
6. Correr el proyecto con ```npm run dev```.