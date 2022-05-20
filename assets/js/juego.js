let deck = [];
let tipos = ["J", "Q", "K", "A"];

const pedirCarta = document.querySelector("#pedirCarta");
const btnDetener = document.querySelector("#btnDetener");
const nuevoJuego = document.querySelector("#nuevoJuego");


let puntosJugador = 0;
let puntosComputadora = 0;

const divCartasJugador = document.querySelector("#jugador-cartas");
const divCartasComputadora = document.querySelector("#computadora-cartas");

const crearDeck = () => {
  for (let i = 2; i <= 10; i++) {
    deck.push(i + "C");
    deck.push(i + "D");
    deck.push(i + "S");
    deck.push(i + "H");
  }
  for (let tipo of tipos) {
    deck.push(tipo + "C");
    deck.push(tipo + "D.");
    deck.push(tipo + "S");
    deck.push(tipo + "H");
  }
};

const shuffle = (array) => {
  let currentIndex = array.length,
    temporaryValue,
    randomIndex;
  while (0 !== currentIndex) {
    randomIndex = Math.floor(Math.random() * currentIndex);
    currentIndex -= 1;
    temporaryValue = array[currentIndex];
    array[currentIndex] = array[randomIndex];
    array[randomIndex] = temporaryValue;
  }
  return array;
};

crearDeck();
deck = shuffle(deck);

const tomarCarta = () => {
  if (deck.length === 0) {
    throw "sin cartas en el deck";
  }
  cartaTomada = deck.shift();
  return cartaTomada;
};

tomarCarta(deck);

const valorCarta = (carta) => {
  const valor = carta.substring(0, carta.length - 1);
  return isNaN(valor) ? (valor === "A" ? 11 : 10) : valor * 1;
};

const turnoComputadora = (puntosMinimos) => {
  do {
    const carta = tomarCarta();
    puntosComputadora = valorCarta(carta) + puntosComputadora;

    document.querySelector("#span2").innerHTML = puntosComputadora;

    const imgCarta = document.createElement("img");
    imgCarta.classList.add("carta");
    imgCarta.src = `assets/cartas/${carta}.png`;
    divCartasComputadora.append(imgCarta);

    if (puntosMinimos > 21) {
      break;
    }
  } while (puntosComputadora < puntosMinimos && puntosMinimos <= 21);


setTimeout(() => {
  if (puntosComputadora > 21) {
    alert("Ganaste");
  } else if (puntosComputadora === puntosMinimos) {
    alert("Empate");
  } else {
    alert("Perdiste");
  }
}, 30);
};

pedirCarta.addEventListener("click", () => {
  const carta = tomarCarta();
  puntosJugador = valorCarta(carta) + puntosJugador;

  document.querySelector("span").innerHTML = puntosJugador;

  const imgCarta = document.createElement("img");
  imgCarta.classList.add("carta");
  imgCarta.src = `assets/cartas/${carta}.png`;
  divCartasJugador.append(imgCarta);

  if (puntosJugador > 21) {
    console.log("Perdiste");
    pedirCarta.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  } else if (puntosJugador === 21) {
    console.log("Sumaste 21");
    pedirCarta.disabled = true;
    btnDetener.disabled = true;
    turnoComputadora(puntosJugador);
  }
});

btnDetener.addEventListener("click", () => {
  pedirCarta.disabled = true;
  btnDetener.disabled = true;
  turnoComputadora(puntosJugador);
});

nuevoJuego.addEventListener("click", () => {
  location.reload();
});
