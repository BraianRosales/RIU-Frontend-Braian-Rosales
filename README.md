# RIU Frontend - Braian Rosales

## Introducción

Este proyecto es una aplicación web para la gestión de super héroes, desarrollada como parte del challenge técnico RIU. Permite listar, buscar, agregar, editar y eliminar héroes, mostrando la información de manera clara. La interfaz está construida con Angular y utiliza Angular Material para una experiencia visual moderna.

Para destacar, utilicé **NGRX Signals** como manejador de estado global de la aplicación, que es la nueva forma recomendada de manejar el estado en Angular.

## ¿Por que NGRX Signals?

Elegí NGRX Signals para este proyecto RIU porque es la nueva forma recomendada de manejar el estado global en Angular, permitiendo una gestión reactiva, simple y eficiente. Signals facilita que todos los componentes estén siempre actualizados ante cualquier cambio en el estado, sin necesidad de lógica compleja ni suscripciones manuales. Esto mejora la experiencia de usuario y la mantenibilidad del código, como tambien que sea escalable.

### Pantalla principal de la aplicación

![Pantalla principal de la aplicación mostrando la lista de héroes](/assets/RIU-Heroes.png)

## Tecnologías utilizadas

- Angular 19: Framework principal para el desarrollo de la **aplicación**.
- Angular Material version 19: Componentes UI modernos y reutilizables.
- NGRX Signals: Manejo de estado reactivo y global para manejar el estado de los Héroes.
- RxJS: Programación reactiva para el manejo de datos asíncronos.
- TypeScript: Tipado estático para mayor robustez y mantenibilidad.
- Karma + Jasmine: Herramientas para testing unitario y Coverage del código.
- SCSS: Preprocesador CSS para estilos más organizados y reutilizables.

## Instalación

1. **Clonar el repositorio**
   - En la terminal y la raíz donde queres alojar el proyecto hacer:
  
   - git clone https://github.com/BraianRosales/RIU-Frontend-Braian-Rosales.git

   - cd RIU-Frontend-Braian-Rosales

2. **Instala las dependencias**
   - npm install

3. **Levanta el servidor de desarrollo**
   - npm run start
  
   - Luego abre tu navegador en [http://localhost:4200](http://localhost:4200)

4. **Ejecuta los tests con coverage y watch**
   
   - ng test --watch --code-coverage
   - Esto ejecutará los tests y mostrará el reporte de cobertura en tiempo real.
   - Para poder ver el Coverage 100% entras en la carpeta de mi proyecto (RIU-Frontend-Braian-Rosales), luego ingresas en la carpeta "coverage", despues ingresas en la carpeta "riu-frontend-braian-rosales" y haces doble click en el archivo "index".

## Despliegue con Docker

> **Requisito:**
> Asegurate de tener [Docker Desktop](https://www.docker.com/products/docker-desktop/) instalado y en ejecución antes de continuar.

### Pasos para correr la app con Docker

1. Construí la imagen:
   - docker build -t riu-frontend .

2. Levantá el contenedor:
   - docker run -p 8080:80 riu-frontend

3. Abrí tu navegador en:
   - http://localhost:8080
