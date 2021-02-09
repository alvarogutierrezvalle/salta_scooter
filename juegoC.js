

document.addEventListener("touchstart", function(evento){

	console.log("salta");

	if(nivel.muerto == false){
			saltar();
		}else{
			nivel.velocidad = 9;
			avion.velocidad = 2;
			dron.velocidad = 12;
			cAmarillo.x = ancho +100;
			avion.x = ancho+ 100;
			cAzul.x = ancho + 900;
			coche.x = ancho + 350;
			nivel.muerto = false;
			dron.x = ancho + 4000;
			if(nivel.marcador > nivel.high){
				nivel.high=nivel.marcador;
				nivel.marcador=0;
			}else{
				nivel.marcador=0;
			}
		}
});


document.addEventListener('keydown', function(evento){
	if(evento.keyCode == 32 ){
		console.log("salta");
		
		if(nivel.muerto == false){
			saltar();
		}else{
			nivel.velocidad = 9;
			avion.velocidad = 2;
			dron.velocidad = 12;
			cAmarillo.x = ancho +100;
			avion.x = ancho+ 100;
			cAzul.x = ancho + 900;
			coche.x = ancho + 350;
			nivel.muerto = false;
			dron.x = ancho + 4000;
			if(nivel.marcador > nivel.high){
				nivel.high=nivel.marcador;
				nivel.marcador=0;
			}else{
				nivel.marcador=0;
			}
			
		}

		}

});

var imgRex, imgAvion, imgCaca, imgSuelo, imgCAzul, imgDron, imgcocherojo, imgCocheAmarillo;

function cargaImagenes(){
	imgRex = new Image();
	imgAvion = new Image();
	imgCocheAmarillo = new Image();
	imgSuelo = new Image();
	imgCAzul = new Image();
	imgDron = new Image();
	imgcocherojo= new Image();

	imgRex.src = 'img/rider.png';
	imgAvion.src = 'img/avion.png';
	imgCocheAmarillo.src = 'img/coche_amarillo.png';
	imgSuelo.src = 'img/suelog.png';
	imgCAzul.src = 'img/coche_azul.png';
	imgDron.src = 'img/drone.png';
	imgcocherojo.src= 'img/coche_rojo.png';

}

var ancho = 700;
var alto = 300;
var canvas, ctx;

function inicializa(){
	canvas = document.getElementById('canvas');
	ctx = canvas.getContext('2d');
	cargaImagenes();

}

function borraCanvas(){
	canvas.width = ancho;
	canvas.height = alto;

}

var suelo = 180;
var trex = {x: 100, y: suelo, vy:0, gravedad: 2, salto: 25, vymax:9, saltando: false};
var nivel = {velocidad: 9,high:0, marcador: 0, muerto: false};
var cAmarillo = {x: ancho+200, y: suelo+32};
var avion = {x: 300, y: 50, velocidad: 2};
var suelog = {x:0, y: suelo+85};
var cAzul = {x: ancho+1000, y: suelo+32};
var coche = {x: ancho+450, y: suelo+32};
var dron = {x: ancho+4000, y: 100, velocidad: 12};


//--------------CREAR SCOOTER------------------------------

function dibujaRex(){
	
	ctx.drawImage(imgRex,0,0,129,267,trex.x,trex.y,60,85);
}


//--------------CREAR DRON----------------------------


function dibujaDron(){
	ctx.drawImage(imgDron,0,0,512,512,dron.x,dron.y,60,60)
}

function logicaDron(){
	if(dron.x < -200){
		dron.x = ancho +4000;
		nivel.marcador++;
		nivel.velocidad++;

	}else{
		dron.x -= dron.velocidad;
	}
}



//--------------COCHE AMARILLO-----------------------------

function dibujaCAmarillo(){
	ctx.drawImage(imgCocheAmarillo,0,0,285,155,cAmarillo.x,cAmarillo.y,100,55)
}

function logicacAmarillo(){
	if(cAmarillo.x < -100){
		cAmarillo.x = ancho +200;
		nivel.marcador++;
	}else{
		cAmarillo.x -= nivel.velocidad;
	}
}

//----------------COCHE ROJO----------------------------

function dibujaCRojo(){
	ctx.drawImage(imgcocherojo,0,0,285,155,coche.x,coche.y,100,55)
}

function logicaCRojo(){
	if(coche.x < -100){
		coche.x = ancho +550;
		nivel.marcador++;

	}else{
		coche.x -= nivel.velocidad;
	}
}

//---------------COCHE AZUL---------------
function dibujaCAzul(){
	ctx.drawImage(imgCAzul,0,0,285,155,cAzul.x,cAzul.y,100,55)
}

function logicaCAzul(){
	if(cAzul.x < -100){
		cAzul.x = ancho +625;
		nivel.marcador++;
		
	}else{
		cAzul.x -= nivel.velocidad;
	}
}

//-------------AVION-----------------------------
function dibujaAvion(){
	ctx.drawImage(imgAvion,0,0,512,512,avion.x,avion.y,60,60)
}

function logicaAvion(){
	if(avion.x < -100){
		avion.x = ancho +100;
	}else{
		avion.x -= avion.velocidad;
	}
}

//----------------SUELO-------------------------

function dibujaSuelo(){
	ctx.drawImage(imgSuelo,suelog.x,0,700,30,0,suelog.y,700,35)
}

function logicaSuelo(){
	if(suelog.x > 700){
		suelog.x = 0;
	}else{
		suelog.x += nivel.velocidad;
	}
}



//------------------SALTAR Y GRAVEDAD---------------------------------

function saltar(){
	if(trex.y > 70){

	trex.saltando = true;
	trex.vy = trex.salto;

	}else{
		trex.vy -= trex.gravedad;
		trex.y -=trex.vy;
	}
}

function gravedad(){
	if(trex.saltando == true){

		if(trex.y - trex.vy - trex.gravedad > suelo){
			trex.saltando = false;
			trex.vy = 0;
			trex.y = suelo;
		}

		else{
		trex.vy -= trex.gravedad;
		trex.y -=trex.vy;
		}
	}
}

//------------COLISION--------------------------------------

function colision(){

	if(cAmarillo.x >= 45 && cAmarillo.x <= 160 || cAzul.x >= 45 && cAzul.x <= 160 || coche.x >= 45 && coche.x <= 160 ){
		if(trex.y >= suelo-20){
			nivel.muerto = true;
			nivel.velocidad = 0;
			avion.velocidad = 0;
			dron.velocidad = 0;
		}
	}else if(dron.x >= 100 && dron.x <= 170){
		if(trex.y >=100 && trex.y <=138){
			nivel.muerto = true;
			nivel.velocidad = 0;
			avion.velocidad = 0;
			dron.velocidad = 0;
			
		}
	}
}

function puntuacion (){
	ctx.font = "30px impact";
	ctx.fillStyle = 'darkblue';
	ctx.fillText(`High Score: ${nivel.high} Score: ${nivel.marcador}`,410,50);

	if(nivel.muerto == true){
		ctx.fillStyle = 'red';
		ctx.font = "60px impact";
		ctx.fillText(`GAME OVER`, 240,150);
		ctx.font ="25px impact";
		ctx.fillText(`TAP TO RESTART`, 300,180);
	}
}

//bucle ----------------------------------------------

var FPS = 50;
setInterval(function(){
	principal();
},1000/FPS);

function principal(){
	borraCanvas();
	gravedad();
	colision();
	logicacAmarillo();
	logicaCAzul();
	logicaCRojo();
	logicaSuelo();
	logicaAvion();
	logicaDron();
	dibujaSuelo();
	dibujaAvion();
	dibujaCAmarillo();
	dibujaCRojo();
	dibujaCAzul();
	dibujaDron();
	dibujaRex();
	puntuacion();
	

}
