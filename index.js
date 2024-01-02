let mapa = document.querySelector(".mapa");
let tablaPuntos = document.querySelector(".tablaPuntos");
let puntos = document.querySelector(".tablaPuntos_puntos");
let perder = document.querySelector(".perder");
let button = document.querySelector(".button");


const longitud = 10;
const velocidadSerpiente = 100;
const cuadrados = {
    cuadradoVacio: 0,
    cuadradoSerpiente: 1,
    cuadradoComida: 2
}

const movimientos = {
    ArrowUp: -10,
    ArrowDown: 10,
    ArrowRight: 1,
    ArrowLeft: -1
}


//variables que voy a utilizar
let score;
let tabla_bi;
let cuantosVacios = Array();
let serpiente;
let direccionInicial;
let intervalo;


const pintarCuadrado = (cordenada, tipoCuadrado)=>{
    let [row, column] = cordenada.split('');
    tabla_bi[row][column] = cuadrados[tipoCuadrado];
    let cuadrado = document.getElementById(cordenada);
    cuadrado.setAttribute("class", `cuadrado ${tipoCuadrado}`);

    if(tipoCuadrado == "CuadradoVacio"){
        cuantosVacios.push(cordenada);
    }
    else{
        if(cuantosVacios.indexOf(cordenada) !== -1){
            cuantosVacios.splice(cuantosVacios.indexOf(cordenada),1);
        }
    }
}

const pintarSerpiente = ()=>{
    serpiente.forEach(cords => pintarCuadrado(cords, "cuadradoSerpiente"));
}

const crearJuego = () =>{
    serpiente = ["00","01"];
    score = serpiente.length;
    tabla_bi = Array.from(Array(longitud), ()=> Array(longitud).fill(cuadrados.cuadradoVacio));
    mapa.innerHTML = '';
    direccionInicial = "ArrowRight";
    iniciarTabla();

}

const crearRandomComida = ()=>{
    const cordendas = cuantosVacios[Math.floor(Math.random() * cuantosVacios.length)];
    pintarCuadrado(cordendas, "cuadradoComida");
}

const actualizarPuntos = () =>{
    puntos.innerHTML = score;
}

const iniciarTabla = () =>{
    tabla_bi.forEach((row, rowIndex) => {
        tabla_bi.forEach((column, columnIndex) =>{
            let cordenadas = `${rowIndex}${columnIndex}`;
            let div = document.createElement("DIV");
            div.setAttribute("class", "cuadrado cuadradoVacio");
            div.setAttribute("id", cordenadas);
            mapa.appendChild(div);
            cuantosVacios.push(cordenadas);
        })
    });
}

const direccion = (nuevaDireccion) =>{
    direccionInicial = nuevaDireccion;
}



const moverSerpiente = () =>{
    let nuevasCordenadas = String(
        Number(serpiente[serpiente.length - 1]) + movimientos[direccionInicial])
        .padStart(2,'0');
    let [rows, columns] = nuevasCordenadas.split('');
    if(nuevasCordenadas < 0 || nuevasCordenadas > longitud*longitud || (direccionInicial == "ArrowRight" && columns == 0) || (direccionInicial == "ArrowLeft" && columns == 9) || tabla_bi[rows][columns] == cuadrados.cuadradoSerpiente){
        terminar();
    }
    else{
        serpiente.push(nuevasCordenadas);
        if(tabla_bi[rows][columns] == cuadrados.cuadradoComida){
            añadirPunto();
        }
        else{
            let cola = serpiente.shift();
            pintarCuadrado(cola, "cuadradoVacio");
        }
        pintarSerpiente();
    }

}

const terminar = ()=>{
    perder.style.display = "block";
    clearInterval(intervalo);
    button.disabled = false;
}

const añadirPunto = () =>{
    score++;
    actualizarPuntos();
    crearRandomComida();
}

const decidirDireccion = key =>{
    switch(key.code){
        case "ArrowRight":
            if(key.code != "ArrowLeft"){
                direccion(key.code);
            }
        break;
        case "ArrowLeft":
            if(key.code != "ArrowRight"){
                direccion(key.code);
            }
        break;
        case "ArrowUp":
            if(key.code != "ArrowDown"){
                direccion(key.code);
            }
        break;
        case "ArrowDown":
            if(key.code != "ArrowUp"){
                direccion(key.code);
            }
        break;
    }
}

const iniciarJuego = () =>{
    crearJuego();
    button.disabled = true;
    perder.style.display = "none";
    pintarSerpiente();
    actualizarPuntos();
    crearRandomComida();
    document.addEventListener("keydown", decidirDireccion);
    intervalo = setInterval(()=> moverSerpiente(), 150);
}




button.addEventListener("click", iniciarJuego);
































































