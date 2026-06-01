# Videos del sitio

## Archivos

| Archivo | Uso en la web |
|---------|----------------|
| **`hero-mundial.mp4`** | Fondo del hero (landing) — ambiente fútbol / Mundial |
| **`videoprom.mp4`** | Video promocional principal — landing y catálogo |
| **`videoprom2.mp4`** | Segundo clip — landing (después del principal) y catálogo |

## Rutas en React

Configuración: `frontend/src/data/siteVideos.js`  
Componente: `frontend/src/components/VideoShowcase.jsx`

- **Landing** (`/`): al final de la página, los dos videos en paralelo (miniatura = foto PNG del producto).
- **Catálogo** (`/catalogo`): versiones compactas con controles nativos en la columna lateral.

## Hero de fondo

Licencia Mixkit en `hero-mundial.mp4`. Para volver a descargar:

```powershell
cd frontend
node scripts/download-hero-video.mjs
```

## Promos propios

Coloca `videoprom.mp4` y `videoprom2.mp4` en esta carpeta con **grabaciones del portalapicero GoalDesk** (no clips de otros deportes).

Comprueba cada archivo en el reproductor de Windows antes de subirlos: si ves otro contenido (p. ej. fútbol americano), reemplaza el MP4.

Formatos recomendados: MP4 H.264, 720p o 1080p, audio opcional.

En la web, la miniatura es una **foto del producto** hasta que el visitante pulsa reproducir.
