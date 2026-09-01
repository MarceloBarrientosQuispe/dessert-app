# Dessert App 🍰

Tienda de postres construida con React + TypeScript, con carrito de compras persistente, CRUD completo de productos, filtros por categoría, paginación y una arquitectura organizada por funcionalidades.

**Demo en vivo:** https://dessert-app-marcelo.netlify.app/

> ⚠️ El backend está hosteado en el free tier de Render, que "duerme" tras ~15 minutos de inactividad. La primera petición después de estar dormido puede tardar 30-60 segundos en responder — es un comportamiento esperado del hosting gratuito, no un bug.

---

## Índice

- [Instalación](#instalación)
- [Scripts disponibles](#scripts-disponibles)
- [Cómo ejecutar el proyecto](#cómo-ejecutar-el-proyecto)
- [Arquitectura](#arquitectura)
- [Decisiones técnicas](#decisiones-técnicas)
- [Funcionamiento de la API](#funcionamiento-de-la-api)
- [Deploy](#deploy)

---

## Instalación

Cloná el repositorio e instalá las dependencias del frontend y del backend por separado.

```bash
git clone https://github.com/MarceloBarrientosQuispe/dessert-app.git
cd dessert-app

# Frontend
npm install

# Backend (json-server)
cd server
npm install
cd ..
```

### Variables de entorno

Creá un archivo `.env` en la raíz del proyecto (no se sube al repo) con la URL de tu backend local:

```
VITE_API_URL=http://localhost:3000
```

Para producción, el proyecto usa `.env.production` con la URL del backend desplegado en Render.

---

## Scripts disponibles

### Frontend (raíz del proyecto)

| Comando           | Descripción                                                              |
| ----------------- | ------------------------------------------------------------------------ |
| `npm run dev`     | Levanta el servidor de desarrollo de Vite                                |
| `npm run build`   | Compila TypeScript y genera el build de producción en `dist/`            |
| `npm run preview` | Sirve localmente el build de producción, para probarlo antes de deployar |

### Backend (`server/`)

| Comando     | Descripción                               |
| ----------- | ----------------------------------------- |
| `npm start` | Levanta `json-server` sirviendo `db.json` |

---

## Cómo ejecutar el proyecto

Necesitás dos terminales corriendo en simultáneo: una para el backend, otra para el frontend.

**Terminal 1 — Backend:**

```bash
cd server
npm start
```

El servidor queda disponible en `http://localhost:3000` (o el puerto que definas).

**Terminal 2 — Frontend:**

```bash
npm run dev
```

La app queda disponible en `http://localhost:5173`.

---

## Arquitectura

El proyecto está organizado por funcionalidades, separando responsabilidades en carpetas dedicadas:

```
src/
  components/       → Componentes de UI reutilizables (ProductCard, CartDrawer, modales, formularios)
  pages/            → Vistas de nivel de ruta (HomePage, ProductDetailPage, Create/EditProductPage)
  hooks/            → Custom hooks de TanStack Query, separados por dominio y responsabilidad:
                        - useProductsQueries.ts  (lecturas: listado, detalle)
                        - useProductsMutations.ts (escrituras: crear, editar, eliminar)
                        - useCategoriesQuery.ts
  services/         → Llamadas HTTP con Axios (product.ts, categories.ts)
  schema/           → Schemas de validación con Zod (productSchema.ts)
  store/            → Estado global con Zustand (cartStore.ts, con persist middleware)
  types/            → Tipos e interfaces de TypeScript (Product, Category, ProductFilters)

server/
  db.json           → Base de datos mock de json-server
  package.json       → Script de arranque del backend
  public/            → Carpeta requerida por json-server para servir estáticos
```

### Separación queries / mutations

Siguiendo el patrón recomendado de TanStack Query, las lecturas (`useProductsQueries.ts`) y las escrituras (`useProductsMutations.ts`) viven en archivos separados. Esto mantiene cada archivo enfocado en una sola responsabilidad y facilita ubicar rápidamente la lógica de invalidación de caché, que solo aplica a las mutations.

---

## Decisiones técnicas

- **Zustand + persist** para el carrito: se eligió sobre Context API por su simplicidad y porque el middleware `persist` resuelve la persistencia en `localStorage` sin código adicional.
- **TanStack Query** para todo el estado de servidor (productos, categorías): maneja cache, invalidación, loading/error states y evita duplicar esa lógica a mano con `useEffect`.
- **React Hook Form + Zod**: un mismo componente `ProductForm` se reutiliza para crear y editar, usando `defaultValues` para precargar datos en edición. Zod valida antes de enviar, con `coerce` para convertir inputs de tipo texto/número del DOM a los tipos reales esperados (`number`).
- **Filtrado por `categoryId` (no por nombre)**: se decidió filtrar por el id numérico de la categoría en vez del nombre en texto, porque es el identificador estable y consistente con cómo json-server filtra por igualdad de campo. El selector de categorías se genera dinámicamente desde `/categories`, sin hardcodear opciones.
- **Paginación con `_page` / `_per_page`**: json-server v1 (beta) devuelve, al usar estos parámetros, un objeto `{ data, items, pages, ... }` en el body de la respuesta (en vez de un array plano con el total en headers, como en versiones anteriores). El servicio `getProducts` está adaptado a este formato de respuesta v1.
- **Toasts con `react-hot-toast`**: feedback inmediato de éxito/error en cada mutation (crear, editar, eliminar), evitando que el usuario dependa solo del cambio visual en la lista para saber si la operación funcionó.
- **Backend separado en Render**: como Netlify solo sirve contenido estático, `json-server` se despliega como servicio Node independiente en Render, y el frontend le apunta vía la variable de entorno `VITE_API_URL`.

---

## Funcionamiento de la API

El backend es una instancia de `json-server` (v1 beta) sirviendo el archivo `db.json`, con dos recursos principales:

### `GET /products`

Lista productos con soporte de:

- Filtro por nombre: `?name=waffle`
- Filtro por categoría: `?categoryId=1`
- Paginación: `?_page=1&_per_page=8`

Respuesta (formato v1 de json-server):

```json
{
  "first": 1,
  "prev": null,
  "next": 2,
  "last": 2,
  "pages": 2,
  "items": 9,
  "data": [
    /* array de productos */
  ]
}
```

### `GET /products/:id`

Devuelve un producto puntual.

### `POST /products`

Crea un producto nuevo. Body esperado:

```json
{
  "name": "string",
  "price": "number",
  "categoryId": "number",
  "image": {
    "thumbnail": "string",
    "mobile": "string",
    "tablet": "string",
    "desktop": "string"
  }
}
```

### `PUT /products/:id`

Actualiza un producto existente (mismo shape que `POST`).

### `DELETE /products/:id`

Elimina un producto.

### `GET /categories`

Lista todas las categorías (`{ id, name }`), consumida de solo lectura para poblar filtros y badges — no tiene CRUD propio, ya que no fue parte de los requerimientos del nivel.

---

## Deploy

- **Frontend:** [Netlify](https://dessert-app-marcelo.netlify.app/) — build automático desde el branch `master`, variable de entorno `VITE_API_URL` apuntando al backend en Render.
- **Backend:** [Render](https://dessert-app-g9zq.onrender.com) — free tier, corre `json-server db.json --host 0.0.0.0 --port $PORT`.

### Notas del deploy

- Netlify incluye un archivo `public/_redirects` con la regla `/* /index.html 200`, necesario para que las rutas de React Router (por ejemplo `/product/5`) funcionen correctamente en un refresh directo del navegador, ya que Netlify por defecto no sabe resolver rutas del lado del cliente.
- El backend en Render corre en el free tier, por lo que puede tardar en responder tras un período de inactividad (cold start).
