//  primero selecciono Variables 
const formulario = document.querySelector('#formulario');
const listaTweets = document.querySelector('#lista-tweets');
let tweets = [];

// Event listeners
eventListener(); // llamo a la funcion de escuchar
function eventListener () {
    // Cuando el usuario agrega un nuevo tweet
    formulario.addEventListener('submit', agregarTweet);

    //Cuando el documento esta listo
    document.addEventListener('DOMContentLoaded', () => {
        tweets = JSON.parse( localStorage.getItem('tweets') ) || [];

        crearHTML();
    })
}

// Funciones 
function agregarTweet (e) {
    e.preventDefault();

   // Textarea donde el usuario escribe
   const tweet = document.querySelector('#tweet').value;
   
   if ( tweet === '') {
     mostrarError('No puede ir vacio');

     return;
   } 
   const tweetObj = {
    id: Date.now(),
    tweet
   }
    // Añadir el arreglo de tweets 
    tweets = [...tweets, tweetObj];

    // Una vez agregado vamos a crear el HTML
    crearHTML();

    // Reiniciar Form
    formulario.reset();
} 

// Mostrar mensaje de error en pantalla
function mostrarError (error) {
    const mensajeError = document.createElement('p')
    mensajeError.textContent = error;
    mensajeError.classList.add('error');

    //Insertarlo en el Contenido
    const contenido = document.querySelector('#contenido');
    contenido.appendChild(mensajeError);

    setTimeout(() => {
        mensajeError.remove();
    }, 3000);
}

// Muestra un listado de los tweets
function crearHTML () {
    
    limpiarHTML();

    if ( tweets.length > 0) {
        tweets.forEach ( tweet => {
            // Agregar btn de Eliminar
            const btnEliminar = document.createElement('a');
            btnEliminar.classList.add('borrar-tweet');
            btnEliminar.textContent = 'X'

            btnEliminar.onclick = () => {
                borrarTweet(tweet.id);
            }
            // Crear el html
            const li = document.createElement('li');

            // añadir el texto
            li.innerText = tweet.tweet;
            // Asignar el bton
            li.appendChild(btnEliminar);
            // Inssertarlo en html
            listaTweets.appendChild(li);
        })
    }

    sincronizarStorage();
}

// Agregar las tereas a local storage
function sincronizarStorage() {
localStorage.setItem('tweets',JSON.stringify(tweets));
}

// Limpiar el html
function borrarTweet (id) {
   tweets = tweets.filter( tweet => tweet.id !== id);

   crearHTML();
}

// Limpiar texto para que no se repita 
function limpiarHTML () {
    while ( listaTweets.firstChild) {
        listaTweets.removeChild(listaTweets.firstChild);
    }
}