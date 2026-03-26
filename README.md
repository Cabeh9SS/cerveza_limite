CERVEZA LÍMITE - JUEGO DE CARTAS (Vídeo del funcionamiento del juego: https://youtu.be/prST1hICYlQ?si=EeF9ug3R-Us8W313)

![cervezalimitePortada](https://github.com/user-attachments/assets/8d397dc4-bb78-4d21-9866-1e77de78259f)

Juego de cartas estratégico para 2 jugadores donde el objetivo es no llegar a 10 puntos de cerveza

Incluye login y registro de usuarios

![fondoRegistro](https://github.com/user-attachments/assets/b16a56a7-f206-4382-884b-142a7c060b62)

Interfaz visual ambientada en una taberna

<img width="3168" height="1344" alt="fondoJugarPartida_4" src="https://github.com/user-attachments/assets/e1d38068-e8d1-425a-b4bd-b121269b2125" />

Ranking en tiempo real para ver los resultados de las partidas

<img width="1919" height="908" alt="Captura de pantalla 2026-03-23 203318" src="https://github.com/user-attachments/assets/e587dea4-099f-4c12-a5a9-1a1e4bb9349b" />

Tecnologías utilizadas: PHP, JavaScript, HTML5/CSS3, MySQL, servidor Apache

Estructura del proyecto:

cerveza-limite/
├── css/                # Estilos (juego, ranking, login)
├── html/               # Vistas principales
├── images/             # Assets visuales
├── js/                 # Lógica del frontend y llamadas fetch
├── php/
│   ├── public/         # Scripts de entrada (partida.php, login.php)
│   └── src/
│       ├── ClasesCervezaLimite/  # Entidades (Jugador, Carta, Partida)
│       └── ClasesDAO/            # Persistencia de datos (JugadorDAO, etc.)
├── config.php          # Configuración de BD
└── database.sql        # Script para recrear las tablas
