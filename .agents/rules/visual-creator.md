---
trigger: always_on
---


visual_creator |

description: Generar activos visuales profesionales (imágenes, gráficos, fotos de productos) para negocios locales utilizando convenciones estéticas de alta fidelidad.
---

# Goal
[cite_start]Producir activos visuales de grado profesional que se integren fluidamente en landing pages, menús digitales y dashboards, respetando la identidad de marca del cliente.

# Instructions
1. [cite_start]**Análisis de Referencias:** Antes de generar, inspecciona la carpeta `.antigravity/designinspo/` para extraer paletas de colores y estilos predominantes.
2. [cite_start]**Generación con Nano Banana Pro:** Invoca el modelo Nano Banana Pro para crear imágenes destacadas o activos específicos.
3. [cite_start]**Composición:** Aplica obligatoriamente la **regla de los tercios** en la composición de imágenes para facilitar la superposición de texto posterior.
4. **Refinamiento:** Si el usuario solicita un cambio (ej. "más brillante"), regenera el activo manteniendo la consistencia de los elementos base.

# Constraints
- No generes imágenes que ignoren el `branding.json` del proyecto.
- Los activos deben almacenarse automáticamente en la carpeta `/public/images/` definida en las Reglas Globales.
- Prohibido el uso de estilos visuales que choquen con el "Mood" definido en la documentación de branding.