//Variable del canvas
let canvas;
//variable del contexto
let ctx;
//FPS
const FPS = 50;

//Ancho de la ficha
let anchoF = 50;
let altoF = 50;

//Tipo de ficha
let pasto = "green";
let agua = "blue";
let tierra = "brown";   

//Escenario Array - Matriz
let escenario = [
    [1,1,1,1,1,1,1,1,1,1,1,1,1,0,1],
    [1,0,0,0,0,0,0,0,1,2,1,0,1,0,1],
    [1,0,1,1,1,1,1,0,0,0,0,0,1,0,1],
    [1,0,0,0,0,0,1,1,1,1,1,1,1,0,1],
    [1,0,1,1,1,1,1,0,0,0,0,0,1,0,1],
    [1,0,1,0,0,0,0,0,1,1,1,1,1,0,1],
    [1,0,0,0,1,1,1,1,1,0,0,0,0,0,1],
    [1,0,1,0,0,0,0,0,0,0,1,1,1,0,1],
    [1,0,1,1,1,1,1,1,1,1,1,0,1,0,1],
    [1,0,0,0,0,0,0,0,0,0,1,0,1,0,1],
    [1,1,1,1,1,1,0,1,1,1,1,0,1,1,1],
    [1,0,0,0,0,0,0,0,0,0,1,0,0,0,1],
    [1,0,1,1,1,1,1,1,1,0,1,1,1,0,1],
    [1,0,1,0,0,0,0,0,0,0,0,0,0,0,1],
    [1,1,1,0,1,1,1,1,1,1,1,1,1,1,1]
]

//Construir escenario
function dibujarEscenario(){
    let color; 
    //ciclo recorrer el alto del escenario-matriz
    for(y = 0; y < 15; y++){
        //ciclo ancho del escenario-matriz
        for(x = 0; x < 15; x++){
            if(escenario[y][x] == 0){
                color = pasto;
            }
            if (escenario[y][x] == 1){
                color = agua;
            }
            if (escenario[y][x] == 2){
                color = tierra;
            }
            ctx.fillStyle = color;
            ctx.fillRect(x*anchoF, y*altoF, anchoF, altoF)
        }
    }
}

//Declaracion del personaje
let jugador = function(){
    //Atributo de esta clase
    this.x = 13;
    this. y = 0;
    this.color = "black";

    //Metodos = acción

    this.dibuja = function(){
        ctx.fillStyle = this.color;
        ctx.fillRect(this.x*anchoF, this.y*anchoF, anchoF, altoF);
    }

    this.arriba = function(){
        if(this.margenes(this.x, this.y - 1) == false){
            this.y--  
        }
        
    }
    this.abajo = function(){
        if(this.margenes(this.x, this.y + 1) == false){
            this.y++ 
        }
    }
    this.left = function(){
        if(this.margenes(this.x - 1, this.y) == false){
            this.x--  
        }
    }
    this.right = function(){
        if(this.margenes(this.x + 1, this.y) == false){
            this.x++  
        }
    }

    this.margenes = function(x,y){
        let colisiones = false
        if (escenario[y][x] == 1){
            colisiones = true
        }
        return(colisiones)
        
    }

}

//Variable global 

let protagonista;

// Inicializa el HTML
function inicializa(){
    canvas = document.getElementById("canva")
    ctx = canvas.getContext("2d")

    //Creo al jugador
    protagonista = new jugador()

    //lectura de teclado
    document.addEventListener('keydown',function(tecla){
        if(tecla.key == "ArrowUp"|| tecla.key == "w"){
            protagonista.arriba()
        }else if (tecla.key == "ArrowDown" || tecla.key == "s"){
            protagonista.abajo()
        }
        else if (tecla.key == "ArrowLeft" || tecla.key == "a"){
            protagonista.left()
        }
        else if (tecla.key == "ArrowRight"|| tecla.key == "d"){
            protagonista.right()
        }
    })

    // Intervalo
    setInterval(function(){
        principal()
    },1000/FPS)
    
}

//Centraliza las otras funciones
function principal(){

    dibujarEscenario()
    protagonista.dibuja()
}