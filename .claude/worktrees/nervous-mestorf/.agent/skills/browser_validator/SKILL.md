---
name: browser_validator
description: Validar funcionalidad de interfaz de usuario, flujos de trabajo y pruebas E2E en el navegador para asegurar que las aplicaciones no tengan errores de visualización o lógica.
---

# Goal
Cerrar la brecha entre la escritura de código y su validación real mediante la ejecución de pruebas funcionales de extremo a extremo (UI testing) directamente en el navegador.

# Instructions
1. **Acceso:** Utiliza el Browser Agent para navegar a la URL local o de despliegue.
2. **Interacción:** Acciona interfaces de usuario, completa formularios y haz clic en botones para simular el comportamiento del cliente.
3. **Verificación:** Lee cuadros de mando métricos y valida que los elementos del DOM (menús, botones de pago) aparezcan correctamente.
4. **Validación de Artefactos:** Si se detecta un error, genera un plan de implementación para corregir el código y vuelve a verificar automáticamente.

# Constraints
- No ignores fallos de accesibilidad identificados por el navegador.
- Detén la ejecución si el tiempo de carga supera los 20 segundos (failover preventivo).
- Genera siempre un "Resumen de Verificación" visual para la auditoría del usuario humano.
