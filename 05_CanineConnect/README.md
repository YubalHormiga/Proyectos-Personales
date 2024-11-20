# CanineConnect 🐶

**CanineConnect** es una plataforma web diseñada para facilitar la conexión entre amantes de los perros, refugios y protectoras. Esta aplicación ofrece funcionalidades para gestionar adopciones, reportar mascotas perdidas, compartir historias inspiradoras y mucho más. El proyecto destaca por su arquitectura moderna y su enfoque en el bienestar animal.

---

## 📝 Descripción del proyecto

### **Propósito del proyecto**
CanineConnect busca digitalizar y simplificar los procesos relacionados con la adopción y el rescate de perros. Su objetivo es crear una comunidad en línea donde los usuarios puedan interactuar con refugios, publicar reportes de mascotas y acceder a recursos útiles sobre el cuidado de los animales.

### **¿Qué ofrece CanineConnect?**
- **Adopción de perros**: Encuentra, publica y gestiona perfiles de perros en adopción.
- **Reportes de mascotas perdidas y encontradas**: Conéctate con dueños y resuelve casos de extravío rápidamente.
- **Historias inspiradoras**: Comparte y descubre anécdotas sobre rescates y adopciones exitosas.
- **Chat en tiempo real**: Facilita la comunicación entre usuarios y refugios.
- **Gestión de usuarios y roles**: Panel administrativo para otorgar permisos y mantener un entorno seguro.

---

## 🚀 Tecnologías utilizadas

### **Frontend**
- **Vue.js**: Framework para construir interfaces de usuario interactivas y reactivas.
- **Pinia**: Manejo de estado eficiente y modular.
- **Vue Router**: Navegación entre vistas de manera dinámica.
- **CSS personalizado**: Diseño adaptable con soporte para modo oscuro.

### **Backend**
- **Firebase**: 
  - **Authentication**: Para manejar registros e inicios de sesión.
  - **Firestore**: Base de datos NoSQL para almacenar datos de usuarios, mascotas y reportes.
  - **Storage**: Gestión de archivos como imágenes de mascotas.
- **The Dog API**: Integración para obtener información sobre razas.

---

## 🌟 Características principales

### **Plataforma completa para amantes de los perros**
- **Panel de adopción**: Visualiza una lista de perros disponibles, sus descripciones y filtros para encontrar el compañero ideal.
- **Registro de mascotas perdidas/encontradas**: Reporta y visualiza casos con geolocalización para facilitar su resolución.
- **Historias de rescates**: Publica experiencias y genera inspiración en la comunidad.
- **Administración avanzada**: Gestión de usuarios con permisos especiales para administradores.

### **Diseño pensado en la experiencia del usuario**
- **Responsive**: Optimizado para usarse en dispositivos móviles y de escritorio.
- **Modo oscuro**: Actívalo con un solo clic para cuidar la vista en ambientes con poca luz.
- **Animaciones interactivas**: Indicadores de carga y transiciones suaves.

---

## 📂 Estructura del proyecto

```plaintext
src/
├── api/                 # Conexiones a APIs externas
├── assets/              # Recursos estáticos (imágenes, iconos, CSS)
├── components/          # Componentes reutilizables de Vue
├── composables/         # Lógica compartida (e.g., manejo de errores, imágenes)
├── config/              # Configuración de Firebase
├── router/              # Definición de rutas
├── share/               # Componentes globales como Header y Footer
├── stores/              # Pinia
├── validation/          # Esquemas de validación
├── views/               # Vistas principales


```

## ⚙️ Instalación

Sigue estos pasos para instalar y ejecutar **CanineConnect** en tu máquina local:

### 🛠️ Requisitos previos
Antes de comenzar, asegúrate de tener instalados los siguientes programas en tu máquina:

- **Node.js** (v14 o superior)  
  Puedes descargarlo desde [nodejs.org](https://nodejs.org/)
- **npm** o **yarn**  
  Si no tienes **npm**, este viene con la instalación de Node.js. Si prefieres **yarn**, puedes instalarlo siguiendo las instrucciones [aquí](https://yarnpkg.com/getting-started/install).

### 📝 Pasos de instalación

1. **Clona el repositorio**  
   Primero, clona el repositorio en tu máquina local utilizando el siguiente comando:
   ```bash
   git clone https://github.com/tu-usuario/canineconnect.git
   cd canineconnect
2. **Instala las dependencias**:  
   Ejecuta el siguiente comando para instalar las dependencias del proyecto:
   ```bash
   npm install
3. **Configura las variables de entorno**  
   Crea un archivo `.env` en la raíz del proyecto y añade lo siguiente:
   ```env
   VITE_API_KEY=tu-api-key
   VITE_FIREBASE_API_KEY=tu-firebase-api-key
   VITE_FIREBASE_AUTH_DOMAIN=tu-auth-domain
   VITE_FIREBASE_PROJECT_ID=tu-project-id
   VITE_FIREBASE_STORAGE_BUCKET=tu-storage-bucket
   VITE_FIREBASE_MESSAGING_SENDER_ID=tu-messaging-id
   VITE_FIREBASE_APP_ID=tu-app-id
4. **Inicia el servidor de desarrollo**  
   Ejecuta el siguiente comando para iniciar el servidor de desarrollo:
   ```bash
   npm run dev
5. **Accede a la aplicación**
    Abre tu navegador en http://localhost:3000.

## 💡 Uso

### Funciones clave

#### Usuarios regulares:
- Busca y adopta perros.
- Publica reportes de mascotas perdidas o encontradas.
- Participa en el chat y comparte historias inspiradoras.

#### Administradores:
- Gestiona usuarios y asigna permisos.
- Controla publicaciones en adopción o reportes.

### Interacción amigable
- Los datos persisten entre sesiones gracias a Firebase.
- Notificaciones interactivas y mensajes de error claros.

---

## 🛠️ Mejoras futuras

1. **Soporte multilenguaje**: Expande la plataforma a usuarios internacionales.
2. **Pasarela de pagos**: Implementa una sección de donaciones con Stripe o PayPal.
3. **Optimización avanzada**: Agrega lazy-loading para componentes e imágenes.
4. **Manejo de inventarios**: Herramientas para refugios que administran adopciones masivas.

---

## 🤝 Contribuciones

Este proyecto está abierto a contribuciones. Si deseas colaborar:

1. Haz un fork del repositorio.
2. Crea una rama para tu feature:
   git checkout -b feature-mi-feature

3. Realiza los cambios y haz un commit:
    git commit -m "Agrega nueva funcionalidad X"
4. Sube los cambios y envía un pull request.
## 📬 Contacto

Soy **Yubal Hormiga**, desarrollador junior en búsqueda de oportunidades. Si te interesa colaborar o tienes alguna pregunta, contáctame:

- **Correo electrónico**: yubalhh@yahoo.es
- **LinkedIn**: [Yubal Hormiga](https://www.linkedin.com/in/yubal-hormiga/)
- **GitHub**: [YubalHormiga](https://github.com/YubalHormiga)




