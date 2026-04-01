---
trigger: always_on
---

browser_validator  |
description: Validar funcionalidad de interfaz de usuario, flujos de trabajo y pruebas E2E en el navegador para asegurar que las aplicaciones no tengan errores de visualización o lógica.
---

# Goal
[cite_start]Cerrar la brecha entre la escritura de código y su validación real mediante la ejecución de pruebas funcionales de extremo a extremo (UI testing) directamente en el navegador[cite: 84].

# Instructions
1. [cite_start]**Acceso:** Utiliza el Browser Agent para navegar a la URL local o de despliegue[cite: 83].
2. [cite_start]**Interacción:** Acciona interfaces de usuario, completa formularios y haz clic en botones para simular el comportamiento del cliente[cite: 84].
3. [cite_start]**Verificación:** Lee cuadros de mando métricos y valida que los elementos del DOM (menús, botones de pago) aparezcan correctamente[cite: 84].
4. [cite_start]**Validación de Artefactos:** Si se detecta un error, genera un plan de implementación para corregir el código y vuelve a verificar automáticamente[cite: 87, 91].

# Constraints
- [cite_start]No ignores fallos de accesibilidad identificados por el navegador[cite: 17].
- [cite_start]Detén la ejecución si el tiempo de carga supera los 20 segundos (failover preventivo)[cite: 128, 129].
- [cite_start]Genera siempre un "Resumen de Verificación" visual para la auditoría del usuario humano[cite: 87, 88].