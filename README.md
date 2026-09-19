# ACTIA Systems - Real-Time Industrial Telemetry Dashboard

Panel de control e interacción con telemetría en tiempo real para maquinaria industrial, desarrollado como solución a la prueba técnica de evaluación para ACTIA Systems.

---

## Características Principales

- Monitoreo en Tiempo Real: Simulación y visualización continua de parámetros industriales (Temperatura y RPM).
- Gestión de Estados de Maquinaria: Soporte para estados RUNNING, STOPPED y ERROR con indicadores LED dinámicos.
- Protocolos e Invariantes de Seguridad: Apagado automático de la máquina e indicación visual de fallo cuando la temperatura supera el umbral de seguridad (> 85 ºC).
- Interfaz Interactiva: Panel de control con habilitación/deshabilitación reactiva de acciones según el estado actual del sistema.

---

## Arquitectura y Decisiones Técnicas

- Angular Standalone Architecture: Arquitectura modular moderna basada en componentes independientes sin NgModules.
- Estructura de Archivos Limpia: Separación estricta de responsabilidades en archivos dedicados (.ts, .html, .css) por componente (ControlPanelComponent y TelemetryDisplayComponent).
- Manejo de Estado Reactivo con RxJS: Uso de BehaviorSubject y Observable en MachineService para la gestión centralizada y desacoplada del estado del sistema.
- Interoperabilidad RxJS <-> Signals: Implementación del puente toSignal() (@angular/core/rxjs-interop) en el componente principal para una gestión de cambios eficiente compatible con entornos Zoneless.
- Inyección de Dependencias Moderna: Uso de inject() a nivel de campo según las mejores prácticas actuales de Angular.

---

## Instalación y Ejecución Local

1. Clonar el repositorio:
   git clone https://github.com/TU_USUARIO/actia-telemetry-dashboard.git
   cd actia-telemetry-dashboard

2. Instalar dependencias:
   npm install

3. Iniciar servidor de desarrollo:
   npx ng serve

4. Abrir el navegador e ir a http://localhost:4200/.

---

## Autor

Alexis Maestro López  
Estudiante de Ingeniería Informática — Universidad Rey Juan Carlos (URJC)
