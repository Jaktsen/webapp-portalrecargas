# WebappPortalrecargasAngular8

This project was generated with [Angular CLI](https://github.com/angular/angular-cli) version 8.3.17.

## Development server

Run `ng serve` for a dev server. Navigate to `http://localhost:4200/`. The app will automatically reload if you change any of the source files.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory. Use the `--prod` flag for a production build.

## Running unit tests

Run `ng test` to execute the unit tests via [Karma](https://karma-runner.github.io).

## Running end-to-end tests

Run `ng e2e` to execute the end-to-end tests via [Protractor](http://www.protractortest.org/).

## Further help

To get more help on the Angular CLI use `ng help` or go check out the [Angular CLI README](https://github.com/angular/angular-cli/blob/master/README.md).

## Docker (Modern Workflow)

This project has been modernized to run in a self-contained Docker environment, decoupled from WebSphere Portal/WCM.

### Build the image
```bash
docker build -t portal-recargas:latest .
```

### Run the container
```bash
docker run -d -p 8080:8080 --name portal-recargas portal-recargas:latest
```
Navigate to `http://localhost:8080`.

### Push to Docker Hub
Replace `jaktsen` with your username:
```bash
docker tag portal-recargas:latest jaktsen/portal-recargas:latest
docker push jaktsen/portal-recargas:latest
```

### Why use Docker?
- **Decoupled from WCM**: Uses local mocks automatically via Nginx configuration.
- **Portability**: Run the exact same environment on any machine without installing Node.js/Gulp.
- **Deployment Ready**: Easy to deploy to Cloud or any Docker-ready infrastructure.

## Preparar el ambiente local

**Precondición para publicar:  Para poder publicar se necesita tener el directorio gulp-config y dentro el archivo data.js para poder publicar.  Usar el archivo data.js.example como base, copiarlo y renombrarlo como data.js y llenar las credenciales del ambiente.

Desde cualquier directorio: 
1. Instalar nodejs
2. npm install -g gulp
3. npm install -g @angular/cli

Desde el directorio que contiene el archivo package.json

4. npm install
5. ng serve -o
6. ctrl+c para detener el servidor local

## Publicar en desarrollo
1. npm run pub

## Publicar en authoring 
1. Es pre-condición tener un puente al servidor de authoring con puerto remoto 22 al puerto local 10040
2. npm run auth

## Publicar build no minificado
ng build --prod --optimization=false

## Lint 
1. ng lint
2. ng lint specific files:  ng lint --files src/app/shared/components/mantenimientoFavoritosRequest.ts 
3. ng lint --format json > jsonOutput.json    (generar archivo de reporte)


# Mocks 
Estos archivos no se subirán a WCM en la publicación

1. Carpeta de imágenes que se usarán solo en local   src\assets\img\mocks
2. Carpeta de mocks de WCM src\assets\wcm\mocks
3. Carpeta de mocks de WEF src\assets\mocks
3. Carpeta de mocks de WEF usados en pruebas unitarias src\assets\mocks\tests

# Archivos excluídos de publicación

1. Los mocks
2. Imágenes svg de la carpeta src\assets\img


Correr tests e2e

> ng e2e
=======
# Validar contenido de bundle
1. npm install -g webpack-bundle-analyzer
2. ng build --stats-json
3. webpack-bundle-analyzer dist\webapp-portalrecargas-angular8\stats-es2015.json
4. Navegar a localhost:8888
