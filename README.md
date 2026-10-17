# Barbería Augusto

Sitio de reservas online de Barbería Augusto (Tafí Viejo).

- **Clientes**: https://barberiaaugusto.github.io/
- **Panel del dueño**: /admin.html (requiere iniciar sesión)

## Archivos

- `index.html`: página pública (servicios, reservas, horarios y contacto)
- `admin.html`: panel para gestionar turnos, servicios, horarios y ajustes
- `foto1.jpg`: foto de portada
- `robots.txt` y `sitemap.xml`: para buscadores

## Datos

La información (turnos, servicios, ajustes) vive en Supabase. La página pública solo usa funciones de la base; el panel usa la sesión del dueño.

## Publicación

GitHub Pages, rama `main`, carpeta raíz. Cada cambio en `main` se publica solo.
