



//CREAMOS ARREGLO VACIO PARA LUEGO ALMACENAR LOS VALORES DE LAS CARTAS
let deck  = [];

//CREAMOS ARREGLO DE CADA TIPO DE CARTA 
 let tipos = ['C', 'D', 'H', 'S']

//CREAMOS ARREGLO DE CARTAS ESPECIALES
 let cartasEspeciales = ['A', 'J', 'Q', 'K'];

//REFERENCIAS DEL HTML

let btnPedir = document.querySelector('#btnPedir');
let btnDetener = document.querySelector('#btnDetener');
let btnNuevo = document.querySelector('#btnNuevo');
let btnCambiar = document.querySelector('#btnCambiar');

let puntosJugador = 0,
    puntosComputadora = 0;

let puntosHTML = document.querySelectorAll('small');

let cartasJugador =  document.querySelector('.jugador-cartas');
let cartasComputadora = document.querySelector('.computadora-cartas');
let divBody = document.querySelector('body');
let divHeader = document.querySelector('header');

//CREAMOS FUNCION PARA CREAR LOS VALORES DE LAS CARTAS
const crearDeck = () => {

    for(let i = 2; i <= 10; i++){
        for(let tipo of tipos){
            deck.push( i + tipo);
        }
    }
    
    for(let tipo of tipos){

        for(let especial of cartasEspeciales){

            deck.push(especial + tipo);
        }
    }

    deck = _.shuffle(deck);
}

crearDeck();

//PEDIR CARTA Y QUE SE ELIMINE DEL ARREGLO
const pedirCarta = () => {

    
    if(deck.length === 0){
        throw 'No hay mas cartas en el deck';
    }

    

    const carta = deck.pop();
    return carta;
}



pedirCarta();



//EXTRAER VALOR DE LA CARTA

const valorCarta = (carta) => {

    const valor = carta.substring(0, carta.length - 1);
    /*
    let puntos = 0;
    if(isNaN(valor)){
      puntos = (valor === 'A') ? 11 : 10;
    }else{

        puntos = valor * 1;
    }

    */
   return ( isNaN(valor) ) ? 
            (valor === 'A') ? 11 : 10
            :  valor * 1;


}

const turnoComputadora = (puntajeMinimo) => {

    do {

        const carta = pedirCarta();
        puntosComputadora += valorCarta(carta);
        puntosHTML[1].innerText = puntosComputadora;
        const imgCarta = document.createElement('img');
        imgCarta.src = `assets/cartas/${carta}.png`;
        imgCarta.classList.add('carta');

        cartasComputadora.append(imgCarta);
    
        if(puntajeMinimo > 21){

            break;
        }

    }while( (puntosComputadora < puntajeMinimo) && (puntajeMinimo <= 21) );
    
    if(puntosComputadora === puntajeMinimo){
        Swal.fire({
            title: 'Empate!!',
            showClass: {
              popup: 'animate__animated animate__fadeInDown'
            },
            hideClass: {
              popup: 'animate__animated animate__fadeOutUp'
            }
          })
    }else if(puntajeMinimo >= 21){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Computadora Gana'
          })
    }else if(puntosComputadora > 21){
        Swal.fire('Jugador Gana');
    }else if(puntosComputadora > puntajeMinimo){

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Computadora Gana'
          })
    }


}


//EVENTOS

btnPedir.addEventListener('click', () => {

    const carta = pedirCarta();
    
    puntosJugador += valorCarta(carta);

    puntosHTML[0].innerText = puntosJugador;
    const imgCarta = document.createElement('img');
    imgCarta.src = `assets/cartas/${carta}.png`;
    imgCarta.classList.add('carta');

    cartasJugador.append(imgCarta);

    if(puntosJugador > 21){

        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'Computadora Gana'
          })
        btnPedir.disabled = true;
        turnoComputadora(puntosJugador)
        btnDetener.disabled = true;
    }else if( puntosJugador === 21){

        Swal.fire('Jugador Gana');
        btnPedir.disabled = true;
        btnDetener.disabled = true;
    }
    
   
});

btnDetener.addEventListener('click', () => {

    btnPedir.disabled = true;
    turnoComputadora(puntosJugador);
    btnDetener.disabled = true;

});


btnNuevo.addEventListener('click', () => {

    console.clear();
    
    deck = [];
    deck = crearDeck();
    btnPedir.disabled = false;
    btnDetener.disabled = false;
    
    puntosJugador = 0;
    puntosComputadora = 0;

    puntosHTML[0].innerText = 0;
    puntosHTML[1].innerText = 0;

    cartasJugador.innerHTML = '';
    cartasComputadora.innerHTML = '';
});


btnCambiar.addEventListener('click', () => {

    divBody.classList.add('cambiarTema');
    divHeader.classList.add('header2');
    btnNuevo.classList.add('#btnNuevoColor');

})

