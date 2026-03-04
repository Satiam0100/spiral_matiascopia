# SPIRAL Marketing Studio

Sitio web construido con **React + Vite** y **React Router**, organizado por módulos en `src/modules/*`.

## Stack

- **React** 19
- **Vite** 7
- **React Router DOM** 7
- **ESLint** 9

## Requisitos

- **Node.js** `>= 18`
- **pnpm** (el repo fija `pnpm@10.x` vía `packageManager`)

## Empezar

Instalar dependencias:

```bash
pnpm install
```

Levantar el entorno de desarrollo:

```bash
pnpm dev
```

Compilar para producción:

```bash
pnpm build
```

Previsualizar el build:

```bash
pnpm preview
```

Lint:

```bash
pnpm lint
```

## Rutas

Las rutas principales están definidas en `src/App.jsx`:

- `/` → Home
- `/services` → Services
- `/studio` → Studio
- `/book-now` → Book Now
- `/portfolio` → Portfolio
- `/about` → About

## Estructura del proyecto (resumen)

- `src/main.jsx`: bootstrap de React + `BrowserRouter`
- `src/App.jsx`: enrutado principal
- `src/modules/*`: páginas, componentes, estilos y data por sección
  - `home`, `services`, `portfolio`, `about`, `studio`, `bookNow`
- `src/styles/*`: estilos globales y variables

## Variables de entorno

Actualmente el proyecto **no requiere** variables de entorno para correr en local (no hay `.env` en el repo). Si se agregan integraciones futuras, documentarlas aquí y en un `.env.example`.

## Build y despliegue

`pnpm build` genera la carpeta `dist/` (salida estándar de Vite). Podés desplegar `dist/` en cualquier hosting estático (Netlify, Vercel, Cloudflare Pages, GitHub Pages, etc.).
