# Portal de Compras y Recargas (Angular 8)

Este proyecto fue generado con [Angular CLI](https://github.com/angular/angular-cli) versión 8.3.17.

## Servidor de Desarrollo

Ejecuta `ng serve` para un servidor de desarrollo. Navega a `http://localhost:4200/`. La aplicación se recargará automáticamente si cambias alguno de los archivos fuente.

## Generación de Código

Ejecuta `ng generate component nombre-del-componente` para generar un nuevo componente. También puedes usar `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Construcción (Build)

Ejecuta `ng build` para construir el proyecto. Los archivos de construcción se almacenarán en el directorio `dist/`. Usa la bandera `--prod` para una construcción de producción.

## Docker (Flujo de Trabajo Moderno)

Este proyecto ha sido modernizado para ejecutarse en un entorno Docker autónomo, desacoplado de WebSphere Portal/WCM.

### Construir la imagen
```bash
docker build -t portal-recargas:latest .
```

### Ejecutar el contenedor
```bash
docker run -d -p 8080:8080 --name portal-recargas portal-recargas:latest
```
Navega a `http://localhost:8080`.

### Subir a Docker Hub
Reemplaza `jaktsen` con tu usuario:
```bash
docker tag portal-recargas:latest jaktsen/portal-recargas:latest
docker push jaktsen/portal-recargas:latest
```

### ¿Por qué usar Docker?
- **Desacoplado de WCM**: Usa mocks locales automáticamente mediante la configuración de Nginx.
- **Portabilidad**: Ejecuta exactamente el mismo entorno en cualquier máquina sin instalar Node.js o Gulp.
- **Listo para Despliegue**: Fácil de desplegar en la nube o cualquier infraestructura compatible con Docker.

---

## Receta: Configuración On-Premise (Nginx Nativo)

Si decides **no usar Docker** y configurar un servidor Linux (Ubuntu/CentOS) desde cero:

### 1. Preparar los Archivos (Build)
En tu máquina de desarrollo:
```bash
npm install
ng build --prod
```
Esto generará la carpeta `dist/webapp-portalrecargas-angular/`.

### 2. Instalación de Nginx en el Servidor
```bash
sudo apt update
sudo apt install nginx -y
```

### 3. Configuración de Nginx
Edita el archivo de configuración: `sudo nano /etc/nginx/sites-available/portal-recargas`
```nginx
server {
    listen 80;
    server_name tu-dominio.com;

    root /var/www/portal-recargas;
    index index.html;

    # Archivos WCM mock: servir .json como JavaScript
    location ~* ^/assets/wcm/mocks/.*\.json(\?.*)?$ {
        types { }
        default_type application/javascript;
        add_header X-Content-Type-Options "nosniff" always;
    }

    # SPA Fallback
    location / {
        try_files $uri $uri/ /index.html;
    }
}
```

### 4. Despliegue y Activación
1. Crea la carpeta: `sudo mkdir -p /var/www/portal-recargas`
2. Copia el contenido de `dist/` a `/var/www/portal-recargas/`.
3. Activa el sitio:
```bash
sudo ln -s /etc/nginx/sites-available/portal-recargas /etc/nginx/sites-enabled/
sudo systemctl restart nginx
```

---

## Flujo de Trabajo Tradicional (Legacy)

### Preparar el ambiente local
**Precondición:** Necesitas el directorio `gulp-config` y el archivo `data.js` (basado en `data.js.example`).

1. `npm install -g gulp @angular/cli`
2. `npm install`
3. `ng serve -o`

### Mocks
Los mocks se encuentran en:
- `src/assets/wcm/mocks`
- `src/assets/mocks`

### Validar contenido del Bundle
1. `npm install -g webpack-bundle-analyzer`
2. `ng build --stats-json`
3. `webpack-bundle-analyzer dist/webapp-portalrecargas-angular8/stats-es2015.json`
