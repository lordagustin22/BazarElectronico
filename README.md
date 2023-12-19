# Bazar Electronico

Proyecto generado con Angular 16.2.12

## Arquitectura

No hay ningún tipo de arquitectura implementada como tal, porque esto es un proyecto inicial. En lo posible se intenta mantener modular a la aplicación distribuyendo los servicios, pipes, componentes, el layout y los componentes compartidos en distintos directorios. Se intenta usar lazy loading para el routing (en lo posible)

En shared se encuentran el navbar y footer y cualquier componente que tenga que ser "compartido" entre varias páginas.

Components contiene el layout, que viene a cumplir la función de app.component.html.

Home contiene las páginas de admin para el CRUD y las páginas de listado de productos para el usuario.

Services contiene servicios necesarios para la lógica. Interface es la interface del producto que se verá reflejada en la base de datos, y pipes contiene un pipe para el paginador.

Environments contiene el endpoint para la API.

## Casos de uso

Exploración de Productos:

Descripción: Los usuarios pueden buscar, filtrar y explorar productos disponibles en el bazar.
Flujo: Utilizar categorías, palabras clave o filtros para encontrar productos deseados y ver detalles del producto.

Compra de Productos:

Descripción: Los usuarios pueden realizar compras de productos seleccionados.
Flujo: Contactarse con el vendedor via WhatsApp, seleccionar método de pago y confirmar la compra.

## Code scaffolding

Run `ng generate component component-name` to generate a new component. You can also use `ng generate directive|pipe|service|class|guard|interface|enum|module`.

## Build

Run `ng build` to build the project. The build artifacts will be stored in the `dist/` directory.
