window.addEventListener("load", iniciar);

function iniciar() {
    crearBarajaCerveza();
    crearBarajaAccion();

    document.getElementById("mazo").addEventListener("click", mostrarCarta);

    document.getElementById("carta1").addEventListener("click", seleccionarCarta);
    document.getElementById("carta2").addEventListener("click", seleccionarCarta);
    document.getElementById("cartaJugador1").addEventListener("click", seleccionarCarta);
    document.getElementById("ronda").addEventListener("click", accionMazo);
}

function accionMazo() {
    colocarCartas();
    repartirCartas(jugador1, 5, "cartaJugador1");
    repartirCartas(jugador2, 5, "cartaJugador2");
}



//------------------------------------PHP----------------------------------------------
//------------------------------------PHP----------------------------------------------
//------------------------------------PHP----------------------------------------------
class Carta {
    constructor(nombre, pc, img) {
        this.nombre = nombre;
        this.pc = pc;
        this.img = img;
    }
}

// Instancias cerveza
let doble = new Carta("doble", 2, "../images/cartas_cerveza/doble.jpg");
let conMisterio = new Carta("conmisterio", 2, "../images/cartas_cerveza/conmisterio.jpg");
let negra = new Carta("negra", 1, "../images/cartas_cerveza/negra.jpg");
let birra = new Carta("birra", 1, "../images/cartas_cerveza/birra.jpg");
let tinto = new Carta("tinto", 1, "../images/cartas_cerveza/tinto.jpg");
let caida = new Carta("caida", 0, "../images/cartas_cerveza/caida.jpg");
let malTirada = new Carta("malTirada", 0, "../images/cartas_cerveza/malTirada.jpg");
let sinAlcohol = new Carta("sinAlcohol", 0, "../images/cartas_cerveza/sinAlcohol.jpg");
let jarra = new Carta("jarra", 3, "../images/cartas_cerveza/jarra.jpg");
let digestivo = new Carta("digestivo", 3, "../images/cartas_cerveza/digestivo.jpg");


// Baraja
let baraja = [];

function crearBarajaCerveza() {
    let cartas = [doble, conMisterio, negra, birra, birra, tinto, caida, malTirada, sinAlcohol];
    let cartas3 = [jarra, digestivo];

    for (let i = 0; i < 3; i++) {
        baraja.push(...cartas.map(c => new Carta(c.nombre, c.pc, c.img)));
    }
    baraja.push(...cartas3.map(c => new Carta(c.nombre, c.pc, c.img)));

    for (let i = baraja.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [baraja[i], baraja[j]] = [baraja[j], baraja[i]];
    }
    console.log(baraja);
}

class CartaEspecial {
    constructor(nombre, valor, descripcion, img) {
        this.nombre = nombre;
        this.valor = valor;
        this.descripcion = descripcion;
        this.img = img;
    }
}

// Instancias especiales
let aceitunas = new CartaEspecial("Aceitunas", 0, "", "../images/cartas_accion/aceitunas.jpg");
let bano = new CartaEspecial("Voy al Baño", 0, "", "../images/cartas_accion/baño.jpg");
let bravas = new CartaEspecial("Bravas", 0, "", "../images/cartas_accion/bravas.jpg");
let cambio = new CartaEspecial("Cambio", 0, "", "../images/cartas_accion/cambio.jpg");
let chorizo = new CartaEspecial("Chorizo", 0, "", "../images/cartas_accion/chorizo.jpg");
let experto = new CartaEspecial("Experto Cervecero", 0, "", "../images/cartas_accion/experto.jpg");
let fritas = new CartaEspecial("Patatas Fritas", 0, "", "../images/cartas_accion/fritas.jpg");
let mirar = new CartaEspecial("¿Qué vas a Pedir?", 0, "", "../images/cartas_accion/mirar.jpg");
let picante = new CartaEspecial("Picante", 0, "", "../images/cartas_accion/picante.jpg");
let queso = new CartaEspecial("Queso", 0, "", "../images/cartas_accion/queso.jpg");
let robar = new CartaEspecial("Robar", 0, "", "../images/cartas_accion/robar.jpg");
let vacio = new CartaEspecial("Vacio", 0, "", "../images/cartas_accion/vacio.jpg");

let barajaAccion = [];

function crearBarajaAccion() {
    let cartasEspeciales = [aceitunas, bano, bravas, cambio, cambio, chorizo, experto, fritas,
        mirar, picante, queso, robar, robar, robar, vacio, vacio, vacio];

    for (let i = 0; i < 2; i++) {
        barajaAccion.push(...cartasEspeciales.map(c => new CartaEspecial(c.nombre, c.valor, c.descripcion, c.img)));

    }
    for (let i = barajaAccion.length - 1; i > 0; i--) {
        let j = Math.floor(Math.random() * (i + 1));
        [barajaAccion[i], barajaAccion[j]] = [barajaAccion[j], barajaAccion[i]];
    }
    console.log(barajaAccion);
}
let contadorRonda;

let jugador1 = [];
let jugador2 = [];

// Estado
let cartaSeleccionadaDiv = null;
let dosCartasMesa = []; // [carta1, carta2] de la ronda actual

let cartaEnAccion = null;


//------------------------------------PHP----------------------------------------------
//------------------------------------PHP----------------------------------------------
//------------------------------------PHP----------------------------------------------


// Reparte y muestra 2 cartas en #carta1 y #carta2, guardando referencia en dosCartasMesa
function mostrarCarta() {
    const carta1Div = document.getElementById("carta1");
    const carta2Div = document.getElementById("carta2");

    [carta1Div, carta2Div].forEach(el => {
        el.classList.remove("carta--repartir", "carta--repartir--delay");
        void el.offsetWidth; // reflow
    });

    // tomar 2 cartas de la baraja
    const primeraCarta = baraja[0];
    const segundaCarta = baraja[1];
    dosCartasMesa = [primeraCarta, segundaCarta];

    // pintar
    carta1Div.style.backgroundImage = `url('${primeraCarta.img}')`;
    carta2Div.style.backgroundImage = `url('${segundaCarta.img}')`;
    carta1Div.style.backgroundSize = carta2Div.style.backgroundSize = "cover";

    // etiquetar qué carta es cada div
    carta1Div.dataset.nombre = primeraCarta.nombre;
    carta2Div.dataset.nombre = segundaCarta.nombre;

    // limpiar selección visual
    [carta1Div, carta2Div].forEach(d => d.classList.remove("seleccionada"));
    cartaSeleccionadaDiv = null;


    carta1Div.classList.add("carta--repartir");
    carta2Div.classList.add("carta--repartir", "carta--repartir--delay");

    // limpiar animación y colocar en su sitio
    const fin1 = () => carta1Div.classList.remove("carta--repartir");
    const fin2 = () => carta2Div.classList.remove("carta--repartir", "carta--repartir--delay");
    carta1Div.addEventListener("animationend", fin1, { once: true });
    carta2Div.addEventListener("animationend", fin2, { once: true });

    // quitar de la baraja
    baraja.splice(0, 2);
    console.log(baraja);
}

// Marcar selección con borde azul
function seleccionarCarta(e) {
    document.querySelectorAll(".carta.seleccionada")
        .forEach(c => c.classList.remove("seleccionada"));

    cartaSeleccionadaDiv = e.currentTarget;   // la carta pulsada
    cartaSeleccionadaDiv.classList.add("seleccionada");
}

// Colocar seleccionada en #cartaAbajo y la otra en #cartaArriba
function colocarCartas() {
    if (!cartaSeleccionadaDiv) return alert("Selecciona una de las dos cartas.");

    const carta1Div = document.getElementById("carta1");
    const carta2Div = document.getElementById("carta2");

    const otraDiv = cartaSeleccionadaDiv === carta1Div ? carta2Div : carta1Div;

    const selNombre = cartaSeleccionadaDiv.dataset.nombre;
    const otraNombre = otraDiv.dataset.nombre;
    const cartaSelObj = dosCartasMesa.find(c => c.nombre === selNombre);
    const cartaOtraObj = dosCartasMesa.find(c => c.nombre === otraNombre);

    colocarCarta(cartaSelObj, "cartaAbajo", carta1Div)
    colocarCarta(cartaOtraObj, "cartaArriba", carta2Div)

}

function colocarCarta(carta, idDestino, idOrigen = null) {
    const destino = document.getElementById(idDestino);
    if (!destino || !carta) return;

    destino.style.backgroundImage = `url('${carta.img}')`;
    destino.style.backgroundSize = "cover";
    destino.dataset.nombre = carta.nombre;

    if (idOrigen) {
        idOrigen.style.backgroundImage = "";
        idOrigen.removeAttribute("data-nombre");
        idOrigen.classList.remove("seleccionada");
    }
}

function repartirCartas(jugador, cantidad, contenedorId) {
    const contenedor = document.getElementById(contenedorId);

    for (let i = 0; i < cantidad; i++) {
        if (barajaAccion.length > 0) {
            const cartaAccion = barajaAccion.shift();
            jugador.push(cartaAccion);

            const cartaDiv = document.createElement("div");
            cartaDiv.classList.add("carta");
            if (contenedorId === "cartaJugador2") {
                cartaDiv.style.backgroundImage = "url('images/cartas_accion/reversoEspe.jpg')";
            } else {
                cartaDiv.style.backgroundImage = `url('${cartaAccion.img}')`;
            }

            cartaDiv.style.backgroundSize = "cover";
            cartaDiv.dataset.nombre = cartaAccion.nombre;
            cartaDiv.addEventListener("click", () => {
                colocarCarta(cartaAccion, "cartaAccionAbajo", cartaDiv);
            });
            cartaDiv.addEventListener("click", () => manejarCartaJugador(cartaAccion, cartaDiv));



            contenedor.appendChild(cartaDiv);
        } else {
            console.log("No quedan cartas en la baraja.");
            break;
        }
    }
}

function manejarCartaJugador(cartaObj, cartaDiv) {
  const zonaAccion = document.getElementById("cartaAccionAbajo");

  // Si NO hay carta en acción moverla ahí
  if (!cartaEnAccion) {
    colocarCarta(cartaObj, "cartaAccionAbajo", cartaDiv);
  
    cartaEnAccion = {
      cartaObj: cartaObj,
      cartaDivOriginal: cartaDiv
    };
  } 
  else {
    // Ya había una carta en acción devolverla a la mano
    const anterior = cartaEnAccion.cartaObj;
    const anteriorDiv = cartaEnAccion.cartaDivOriginal;

    // Volver la anterior a su hueco original
    anteriorDiv.style.backgroundImage = `url('${anterior.img}')`;
    anteriorDiv.dataset.nombre = anterior.nombre;

    // Mover la nueva a la zona de acción
    colocarCarta(cartaObj, "cartaAccionAbajo", cartaDiv);

    // Actualizar el registro de carta en acción
    cartaEnAccion = {
      cartaObj: cartaObj,
      cartaDivOriginal: cartaDiv
    };
  }
}


