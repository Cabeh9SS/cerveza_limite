CERVEZA LÍMITE - JUEGO DE CARTAS (Vídeo del funcionamiento del juego: https://youtu.be/prST1hICYlQ?si=EeF9ug3R-Us8W313)

![cervezalimitePortada](https://github.com/user-attachments/assets/17154286-23af-4ad1-a891-1442405cf604)

Juego de cartas original para 2 jugadores donde el objetivo es no llegar a 10 puntos de cerveza. 

Incluye login y registro de usuarios

<img width="768" height="379" alt="menu_login" src="https://github.com/user-attachments/assets/5b05d68a-9884-4b9c-a9e3-7c41e4886628" />

Interfaz visual ambientada en una taberna

<img width="761" height="380" alt="menu_principal" src="https://github.com/user-attachments/assets/87d77a1f-a66e-40b5-9186-e5e4acb60e90" />

Ranking en tiempo real para ver los resultados de las partidas

<img width="768" height="363" alt="ranking" src="https://github.com/user-attachments/assets/3fbe336e-6a96-4df6-a840-58c83bc35c31" />

Multijugador en tiempo real (asíncrono), con gestión de turnos y estados de partida mediante comunicación constante con el backend.

Tecnologías utilizadas: PHP (POO), JavaScript, HTML5/CSS3, MySQL, servidor Apache

Arquitectura y patrones:
- Patrón DAO: desacoplamiento entre la lógica de negocio y las consultas SQL.
- Singleton: implementado en la clase de conexión a la base de datos para optimizar recursos.
- Comunicación frontend-backend mediante Fetch API y transporte de datos en formato JSON.

Estructura del proyecto:

cerveza-limite/
- css/                # Estilos
- html/               # Vistas principales
- images/             # Assets visuales
- js/                 # Lógica del frontend y llamadas fetch
- php/
  + public/         # Scripts de entrada
  + src/
    + ClasesCervezaLimite/  # Entidades
    + ClasesDAO/            # Persistencia de datos con DAO
- config.php          # Configuración de BD
- database.sql        # Script para recrear las tablas
