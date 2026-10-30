# NEXO-Grow-Supply
Demo de página web de un growshop. Diseño responsive con servicios, contacto por WhatsApp y solicitud de presupuesto.
# NEXO / Grow Supply

Sitio web conceptual para una tienda especializada dirigida exclusivamente a mayores de 18 años. El proyecto presenta una experiencia de comercio electrónico con estética industrial, navegación por departamentos, catálogo, filtros, buscador y carrito persistente.

> **Proyecto demostrativo:** NEXO es una marca ficticia creada para portfolio. No representa una tienda real, no procesa pedidos o pagos y no ofrece recomendaciones de consumo ni afirmaciones médicas.

## Demo

- [Ver la web publicada](https://rottendnb.github.io/NEXO-Grow-Supply/)
- [Ver el repositorio en GitHub](https://github.com/Rottendnb/NEXO-Grow-Supply)

## Características

- Diseño industrial y responsive, diferente al resto de proyectos del portfolio.
- Control de acceso para personas mayores de 18 años.
- Navegación por departamentos: accesorios, ventilación, iluminación, riego, sustratos y CBD de muestra.
- Catálogo con seis productos demostrativos y fotografías propias.
- Filtros por categoría y buscador en tiempo real.
- Carrito con cantidades, eliminación de productos y subtotal.
- Carrito conservado mediante LocalStorage.
- Confirmación de edad conservada durante la sesión mediante SessionStorage.
- Simulación de finalización sin registrar pedidos ni pagos.
- Información sobre servicios, atención, envío, recogida y tienda física de muestra.
- Sección informativa y preguntas frecuentes.
- Avisos claros sobre el carácter conceptual del proyecto.

## Tecnologías

- HTML5
- CSS3
- JavaScript puro
- LocalStorage
- SessionStorage
- GitHub Pages

No utiliza frameworks, dependencias ni proceso de compilación.

## Estructura del proyecto

```text
nexo-grow-supply/
├── assets/
│   ├── catalogo-nexo.png
│   ├── hero-nexo.png
│   └── logo-nexo.svg
├── CSS/
│   └── style.css
├── JS/
│   └── script.js
├── index.html
├── .nojekyll
└── README.md
```

## Cómo abrirla en local

Abre `index.html` directamente en el navegador. También puedes utilizar una extensión como Live Server en Visual Studio Code para trabajar con recarga automática.

No es necesario instalar paquetes ni ejecutar comandos de construcción.

## Funcionamiento

### Control de edad

El acceso solicita confirmar que el visitante tiene 18 años o más. La confirmación se conserva únicamente durante la sesión actual del navegador.

### Catálogo y filtros

Los productos pueden buscarse por nombre y filtrarse por accesorios, conservación y CBD de demostración. Los departamentos enlazan directamente con la selección correspondiente.

### Carrito

El carrito conserva los productos en el navegador, permite cambiar cantidades y calcula el subtotal. El botón final abre únicamente una explicación de la demostración: no se transmite información ni se realiza ningún cobro.

## Personalización para una tienda real

Antes de convertir el proyecto en una tienda operativa habría que:

1. Sustituir la marca, los productos, las fotografías y los precios.
2. Incorporar inventario y disponibilidad reales.
3. Conectar cuentas de cliente, pedidos y una pasarela de pago.
4. Definir transportistas, zonas, plazos y costes de envío.
5. Preparar procedimientos de devolución y atención al cliente.
6. Añadir aviso legal, privacidad, cookies, términos y condiciones.
7. Revisar cada categoría y producto conforme a la normativa aplicable.
8. Implementar una verificación de edad adecuada para el negocio real.

## Publicación en GitHub Pages

1. Crea un repositorio llamado `NEXO-Grow-Supply`.
2. Sube todos los archivos manteniendo `index.html` en la raíz.
3. Entra en **Settings > Pages** dentro del repositorio.
4. Selecciona la rama principal y la carpeta raíz (`/root`).
5. Guarda los cambios y espera a que GitHub publique la web.

La dirección resultante será:

```text
https://rottendnb.github.io/NEXO-Grow-Supply/
```

## Autor

Diseñado y desarrollado por **Fernando Graciani — Graciani Web Studio**.

- GitHub: [@Rottendnb](https://github.com/Rottendnb)
- Correo: [fernandoga89@gmail.com](mailto:fernandoga89@gmail.com)

## Licencia y uso

Proyecto creado como muestra de portfolio. No se autoriza su reutilización comercial, redistribución o venta sin permiso del autor.
