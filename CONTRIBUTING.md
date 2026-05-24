# Guía de contribución

Gracias por colaborar en **GoalDesk Smart 2026** (UNIFRANZ). Esta guía evita conflictos y mantiene el código ordenado.

## Antes de programar

1. Lee [docs/COMO-EMPEZAR.md](docs/COMO-EMPEZAR.md) y deja el proyecto corriendo en tu PC.
2. Revisa [docs/ESTRUCTURA-CODIGO.md](docs/ESTRUCTURA-CODIGO.md) para saber dónde tocar cada cosa.
3. **No subas** archivos `.env`, contraseñas ni `node_modules`.

## Flujo de trabajo en Git

```text
main          → código estable / entrega
└── feature/  → tu mejora (una cosa por rama)
```

### Pasos recomendados

```bash
git checkout main
git pull origin main
git checkout -b feature/nombre-corto-descripcion

# … haces cambios …

git add .
git commit -m "feat: describe qué hiciste en una línea"
git push origin feature/nombre-corto-descripcion
```

Luego abre un **Pull Request** en GitHub hacia `main`.

### Mensajes de commit (sugeridos)

| Prefijo | Uso |
|---------|-----|
| `feat:` | Funcionalidad nueva |
| `fix:` | Corrección de error |
| `docs:` | Solo documentación |
| `style:` | CSS / UI sin cambiar lógica |
| `refactor:` | Reorganizar código sin cambiar comportamiento |

Ejemplos:

- `feat: añadir filtro por estado en tabla de pedidos`
- `fix: corregir precio Elite en catálogo`
- `docs: actualizar guía de variables de entorno`

## Reglas de código

- Mantén textos de interfaz en **español** y precios en **BOB**.
- Cambios **pequeños y enfocados**: un PR = un tema (no mezclar admin + landing + refactor gigante).
- Reutiliza componentes existentes (`EditorialCard`, `PageHeader`, `api.js`).
- Si cambias el esquema de BD (`schema.prisma`), documenta en el PR que hay que ejecutar `npm run db:push`.
- Prueba manualmente: inicio → personalizar → admin.

## Qué puedes mejorar sin preguntar

- Diseño y animaciones (CSS, Framer Motion).
- Más contenido del Mundial en `mundial2026.js`.
- Validaciones y mensajes de error más claros.
- Accesibilidad (contraste, etiquetas en formularios).
- Documentación en `docs/`.

## Qué conviene coordinar con el equipo

- Cambios de precios o modelo de negocio.
- Nuevas tablas o campos en base de datos.
- Cambiar autenticación admin o desplegar a producción.
- Dependencias nuevas pesadas.

## Revisión de PR

El autor del PR debe indicar:

1. Qué cambió y por qué.
2. Cómo probarlo (pasos).
3. Captura de pantalla si es UI.

Revisor comprueba que arranque `backend` + `frontend` sin errores nuevos.

## Dudas

Abre un **Issue** en GitHub con etiqueta clara o pregunta en el grupo del equipo con captura del error.
