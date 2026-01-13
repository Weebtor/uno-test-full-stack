# Memory / Concentration Game

## Descripción del proyecto

El proyecto consiste en recrear el juego **Memory / Concentration** en una aplicación Full Stack. Cada usuario puede iniciar su propia partida, por lo que es necesaria la **persistencia de datos** para almacenar identidades y resultados. El sistema permite mantener partidas separadas por usuario y consultar el historial de resultados de forma consistente.

---

## Decisiones de arquitectura

La arquitectura del proyecto está dividida en frontend y backend, siguiendo una separación clara de responsabilidades y buenas prácticas de desarrollo.

- **Backend:** Implementado con **NestJS**, utilizando **Drizzle ORM** para la capa de acceso a datos y **PostgreSQL** como base de datos relacional. El backend concentra **toda la lógica del juego** y es el responsable de **decidir qué información se expone al frontend** (estado de la partida, validaciones, reglas y resultados), manteniendo al cliente como una capa de presentación. Esta combinación permite una estructura modular, tipada y mantenible, con control explícito de esquemas y migraciones. Las pruebas se implementan con **Jest**, cubriendo la lógica de negocio, validaciones y persistencia.

  **Estructura y organización del backend (arquitectura por features):**

  El backend está organizado por _features_ (dominios), de modo que cada funcionalidad agrupa sus DTOs, esquemas, repositorios, validadores y utilidades. Esto reduce acoplamiento, mejora la escalabilidad y facilita el testing por módulo.

  **Principios (Backend):**

  - **Orientación a features:** cada dominio (por ejemplo `auth`, `game`, `cards`) encapsula su lógica y contratos.
  - **Separación de capas:** DTOs para entrada/salida, `schemas` para modelos con Drizzle, `repositories` para acceso a datos, y `validators/guards` para reglas transversales.
  - **Infraestructura aislada:** `config/` y `database/` concentran configuración y utilidades de persistencia.
  - **Mantenibilidad y testing:** módulos pequeños, fácilmente testeables de forma aislada.

- **Frontend:** Desarrollado con **React + Vite** para un entorno de desarrollo rápido y moderno. El estilo se gestiona con **Tailwind CSS** y componentes de **shadcn/ui**, favoreciendo consistencia visual y reutilización. Las pruebas se realizan con **Vitest**, enfocadas en la lógica del juego, renderizado de componentes y flujos de usuario. Para el despliegue y servicio de la aplicación frontend se utiliza **Nginx** como servidor web.

  **Estructura y organización del frontend (arquitectura por features):**

  La aplicación sigue una arquitectura orientada a _features_, priorizando la separación de responsabilidades, reutilización de componentes y mantenibilidad del código.

  **Principios:**

  - **Separación por feature:** cada dominio (`auth`, `game`, stats) contiene sus propios componentes, hooks, servicios y utilidades.
  - **Componentes reutilizables:** los genéricos viven en `components/`; los específicos permanecen dentro de cada feature.
  - **Lógica desacoplada:** hooks personalizados encapsulan la lógica de negocio y estado.
  - **Servicios centralizados:** integración con el backend a través de capas `services`.
  - **Ruteo por contexto:** `routes/` separa vistas públicas y protegidas.
  - **Testing:** cada feature incluye sus propios tests.

- **Base de datos:** **PostgreSQL**, utilizada para persistir usuarios, partidas y resultados, asegurando integridad de datos y consultas eficientes.

**PostgreSQL**, utilizada para persistir usuarios, partidas y resultados, asegurando integridad de datos y consultas eficientes.

- **Comunicación:** El frontend se comunica con el backend mediante una API REST, con validaciones de datos en el servidor y una estructura de proyecto organizada por módulos para facilitar la escalabilidad y el mantenimiento.

---

## Instrucciones para ejecutar localmente

### Backend

1. Como primer paso, se recomienda copiar el archivo de variables de entorno de ejemplo dentro de la carpeta `backend`:

```bash
cp backend/.env.example backend/.env
```

Ejemplo de variables de entorno:

```env
# Environment
ENVIRONMENT="dev"
FRONTEND_URL="http://localhost:5173"

# DB
POSTGRES_USER="memorice"
POSTGRES_PASSWORD="memoricepassowrd123asdAdw3"
POSTGRES_DB="memorice-db"
DB_PORT="5432"
DB_HOST="localhost"

# JWT
JWT_ACCESS_SECRET="thisiasodhnaiosdans"
JWT_REFRESH_SECRET="thisiasodhnaiosdansasdasdasasds"

# APIs
IMAGES_API="https://challenge-uno.vercel.app/api/images"
```

2. Se recomienda utilizar la base de datos mediante el `docker-compose` ubicado en la raíz del proyecto. Desde la carpeta raíz ejecuta:

```bash
docker compose up db
```

3. Luego, dirígete a la carpeta del backend:

```bash
cd backend
```

4. Instala las dependencias:

```bash
yarn install
```

5. Ejecuta la aplicación:

En modo desarrollo:

```bash
yarn dev
```

O en modo producción:

```bash
yarn build
yarn start:prod
```

### Frontend

1. Como primer paso, copia el archivo de variables de entorno de ejemplo dentro de la carpeta `frontend`:

```bash
cp frontend/.env.example frontend/.env
```

Ejemplo de variables de entorno:

```env
VITE_API_URL="http://localhost:3000"
```

2. Dirígete a la carpeta del frontend:

```bash
cd frontend
```

3. Instala las dependencias y ejecuta la aplicación:

```bash
yarn install
yarn dev
```

---

## Instrucciones para ejecutar con Docker

> ⚠️ **Prerequisito:** Antes de ejecutar `docker compose`, es necesario haber creado previamente los archivos `.env` en las carpetas **backend** y **frontend**, siguiendo los pasos indicados en la sección de ejecución local.

_Pasos para ejecutar el proyecto utilizando docker-compose._

```bash
# Ejemplo
docker compose up --build
```

---

## Instrucciones para ejecutar tests

Para ejecutar los tests, dirígete a la carpeta correspondiente (backend o frontend) y ejecuta:

```bash
yarn test
```

- En **backend** se ejecutan los tests con **Jest**.
- En **frontend** se ejecutan los tests con **Vitest**.

---

## Flujo de trabajo en GitHub

**Objetivo:** asegurar la calidad del código y evitar errores en producción. Para lograrlo, el proyecto utiliza un flujo de trabajo basado en ramas, Pull Requests e integración continua, donde cada cambio es revisado y validado automáticamente antes de ser incorporado a `main`.

- **Ramas principales:** `main` (sin commits directos).
- **Ramas de trabajo:** se crean ramas de feature para cada cambio o funcionalidad.
- **Pull Requests:** todos los cambios deben integrarse mediante PR hacia `main`, incluyendo una descripción clara y justificación técnica.
- **Integración continua (CI):** El repositorio tiene configurado **GitHub Actions** para ejecutar automáticamente los **tests** en cada Pull Request dirigido a la rama `main`, asegurando que el código cumpla con los estándares antes de ser integrado.

### Convención de nombres de ramas

Se utilizó una convención basada en prefijos para clasificar el tipo de cambios en cada rama:

- **feat/**: Implementación de nuevas funcionalidades o características principales.
- **fix/**: Correcciones de errores o bugs detectados durante el desarrollo.
- **chore/**: Tareas de mantenimiento que no afectan directamente la lógica de negocio (limpieza de código, eliminación de archivos no usados, configuración menor, etc.).
- **ci/**: Cambios relacionados con integración continua, workflows y automatización (por ejemplo, GitHub Actions).
- **ops/**: Configuración de infraestructura y despliegue (Docker, Nginx, scripts de entorno).
- **refactor/**: Reestructuración o mejora interna del código sin modificar el comportamiento funcional.
- **dev/**: En este proyecto no se creó ni utilizó una rama `dev`. Sin embargo, en un escenario real se recomienda integrar primero los cambios en una rama de desarrollo (`dev`) y posteriormente promoverlos a `main` mediante Pull Requests para mantener mayor control y estabilidad.

Esta convención permitió mantener un historial de cambios claro, facilitar la revisión en Pull Requests y organizar el desarrollo por tipo de tarea.

---

## Propuesta de diseño de interfaz

A continuación se describe la **experiencia del usuario final** de forma narrativa, siguiendo el flujo principal: **Inicio → Menú → Juego → Resultados**, para facilitar la comprensión del recorrido completo dentro de la aplicación.

La interfaz prioriza una experiencia simple y clara para el usuario:

- **Pantalla inicial:** ingreso de nombre y RUN del usuario.
- **Vista de juego:** tablero de cartas con feedback visual inmediato al voltear cartas, contadores de aciertos y errores, y control de turnos.
- **Finalización:** mensaje de término de partida con el nombre del usuario y resultado.
- **Historial:** visualización de resultados previos asociados al RUN.

El diseño utiliza **Tailwind CSS** y **shadcn/ui** para mantener consistencia visual, accesibilidad básica y una jerarquía clara de información sin sobrecargar la interfaz.
