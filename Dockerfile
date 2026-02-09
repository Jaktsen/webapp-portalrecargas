# =============================================================================
# Dockerfile — Portal de Compras y Recargas
# Desacoplado de WebSphere Portal / Script Portlet / WCM / Gulp
# =============================================================================
# Build: docker build -t portal-recargas .
# Run:   docker run -p 8080:8080 portal-recargas
# Abrir: http://localhost:8080/?root=1&num=999869451&canal=1&rec=0&admin=0
# =============================================================================

# ---------------------------------------------------------------------------
# Stage 1: Build Angular
# Angular 8.2.13 requiere Node 10 o 12
# ---------------------------------------------------------------------------
FROM node:12-alpine AS build

WORKDIR /app

# Instalar dependencias (solo package.json para cache de layers)
COPY package.json package-lock.json ./
RUN npm ci --loglevel=warn 2>&1

# Copiar fuentes del proyecto
COPY . .

# Build con configuración 'nginx':
#   - Usa environment.nginx.ts (mocks, sin markers WPS)
#   - Usa index.nginx.html (WCM local, sin /wps/wcm/connect/)
#   - Optimizaciones de producción (AOT, tree-shaking, minificación)
#   - SIN Gulp, SIN gulp-ssh, SIN sp.sh, SIN tar.gz
RUN npx ng build \
    --configuration=nginx \
    --extract-css=false \
    --aot=true \
    --build-optimizer=true \
    2>&1

# Verificar que el build generó los archivos esperados
RUN ls -la /app/dist/webapp-portalrecargas-angular8/ && \
    echo "--- Verificando mocks incluidos ---" && \
    ls /app/dist/webapp-portalrecargas-angular8/assets/mocks/ | head -5 && \
    ls /app/dist/webapp-portalrecargas-angular8/assets/wcm/mocks/ | head -5

# ---------------------------------------------------------------------------
# Stage 2: Servir con nginx
# Imagen final: ~25MB (nginx alpine) + ~5MB (app) = ~30MB
# vs WebSphere Portal: ~2GB+
# ---------------------------------------------------------------------------
FROM nginx:1.25-alpine

# Eliminar configuración default de nginx
RUN rm /etc/nginx/conf.d/default.conf

# Copiar configuración nginx personalizada
COPY docker/nginx.conf /etc/nginx/conf.d/portal-recargas.conf

# Copiar build de Angular
COPY --from=build /app/dist/webapp-portalrecargas-angular8/ /usr/share/nginx/html/

# Puerto de escucha (no privilegiado para OpenShift)
EXPOSE 8080

# Health check
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
    CMD wget -qO- http://localhost:8080/ || exit 1

# Ejecutar nginx en foreground
CMD ["nginx", "-g", "daemon off;"]
