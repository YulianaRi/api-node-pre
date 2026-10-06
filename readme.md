# Back_Node: Gestor de productos por terminal

Herramienta en Node.js para gestionar productos desde la terminal
usando fetch y la API de DummyJSON (https://dummyjson.com).

## Requisitos

- Node.js 18
  inicializamos con npm init -y

## Uso

- Ver todos los productos: `npm run start GET products`
- Ver un producto: `npm run start GET products/15`
- Crear un producto: `npm run start POST products T-Shirt-Rex 300 remeras`
- Eliminar un producto: `npm run start DELETE products/7`

## Notas

- Se usó DummyJSON porque FakeStore estaba caído.
- La API simula POST y DELETE: no guarda cambios reales.
- Los títulos con espacios van con guiones (ej. T-Shirt-Rex).

## Decisiones de código

### `const [resource, id] = route?.split("/") ?? [];`

- Si se ejecuta el programa sin argumentos, `route` es `undefined` y
  `undefined.split()` rompe el programa.
- `?.` (optional chaining): si `route` no existe, no hace el `split`
  y devuelve `undefined` en vez de dar error.
- `?? []` (nullish coalescing): si el resultado es `undefined`, usa un
  array vacío. Es necesario porque no se puede aplicar destructuring
  sobre `undefined`, pero sí sobre `[]`.
- Resultado: `resource` e `id` quedan `undefined` y el programa
  muestra "Recurso inválido" en lugar de romperse.

### `const action = method?.toUpperCase();`

- Convierte el método a mayúsculas, así `get`, `Get` y `GET`
  funcionan igual.
- El `?.` evita un error si `method` no llega.

### `isNaN(Number(price))`

- Desde la terminal todo llega como texto, por eso se convierte
  con `Number()`.
- Si el usuario escribe algo que no es un número (ej. `abc`),
  `Number("abc")` da `NaN`. `isNaN()` lo detecta y se avisa
  "El precio debe ser un número" antes de llamar a la API.
