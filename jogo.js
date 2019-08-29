var xb = [], yb = []
var img;
var ini=[]
let inf=3
var maxH=7
var parametro = 1
var play = false
function preload() {
  img = loadImage('espada.png')
  img2 = loadImage('bruxa.png')
  img3 = loadImage('castelo.png')
  img4 = loadImage('hero.png')
  img5 = loadImage('inimigo.png')
  img6 = loadImage('background.jpg')
  img7 = loadImage('background1.png')
  img8 = loadImage('FINALDOGAME.jpg')
  nome = loadImage('titulo.png')

}


function setup(){
	canvas=createCanvas(1200, 600)
	canvas.position(70,20)
	
	dif = 1 
	posX = 150
	posY = 500
	disparo=false
	xd=posX
	yd=posY
	v=4
	fase=1
	espada=image(img, 0, 0)
	posx2 = 1250
	posy2 = 497
	posx3 = 1250
	posy3 = 290
	C=false
	C2 = false
	dano=false
	dano2=false
	pontos = 0
	vivo=true
	vivo2=true
	pulo=0
	velo = 0
	bola=false
	grav=1
	maisvida=false
	bonusVelo = []
	bonusX = []
	bonusY = []
	for (var i = 1; i <= 400; i++) {
		bonusVelo[i] = random(3, 8)
		bonusX[i] = 1200
		bonusY[i] = random(300, 400)

	}
	j = 0
	parametro = 0
	bonusGain =false
}

function draw(){
	background(img6, 153, 255,255)
	image (nome,398,200,400,100)
	textSize(32);
    
    textAlign(CENTER);
	fill('#ffffff')
    text(' \n \n PRESSIONE ESPAÇO \n PARA \n JOGAR  ', 600, 300); 
    if(keyIsDown(32)){
    	play=true
    }
    if(play){
		setPlay();
	}


function setPlay(){
		if(v>0){
		background(img7, 153, 255,255)
		if(keyIsDown(RIGHT_ARROW)){ //setas direita e esquerda movimentam o personagem
			posX+=8//
		}


	parametro = random(0, 1000)
	if(parametro >= 999){
		j++
	}

	for (var i = 1; i <= j; i++) {
		bonusGain = collideRectCircle(posX, posY, 50, 50, bonusX[i], bonusY[i], 50,50)
		fill(random(0, 255),random( 255, 0), random(255, 0), 255)
		bonusX[i] -= bonusVelo[i]
		ellipse(bonusX[i], bonusY[i], 50,50)
		bonusY[i] -= 4.5*sin(frameCount/3)
	}
	if(bonusGain == true){
		v++
		bonusY[j] = -100
	}

	
		if(keyIsDown(LEFT_ARROW)){
			posX-=8
		}
		if(posX < 125){
			posX = 125
		}
		if (posX > 1200) {
			posX = 125
		}
		if(disparo==false){
			xd=posX + 30
			yd=posY + 10
		}
		if(keyIsDown(65)){ //A para disparar 
			disparo=true
		}
		if(disparo==true){
			xd += 12
		}
		if(disparo==true && xd===300 && yd===300){
			v++
		}
		if(xd>1200 || yd>800 || xd<0 || yd<0){
			xd=posX
			yd=posY
			disparo=false
		}
		if(C==true){
			v--
			posX=posX-100
			vivo = false

		}
		if(C2==true){
			v--
			posX=posX-100
			vivo2 = false

		}
		if(dano==true){
			pontos++
			vivo=false
			posx2=1270
			yd=725
			xd=50
		}
		if(pontos==25){
			fase++
			pontos=0
			vivo2=false
			vivo=false
			posX=150
		}
		if(fase==1){
			dif=1
			 text('FASE 1', 600,300)

		}
		if(fase==2){
			dif=1.25
			text('FASE 2', 600,300)
		}
		if(fase==3){
			dif=1.5
			text('FASE 3', 600,300)
		}
		if(fase==4){
			dif=1.75
			text('FASE 4', 600,300)
		}
		if(fase==5){
			dif=2
			text('FASE 5', 600,300)
		}

		if(dano2==true){
			pontos++
			vivo2=false
			posx3=1270
			yd=725
			xd=50
		}

		if (dano==true) {
			pontos++
			vivo=false
			posx2=1270
			yd=725
			xd=50

		}
		if(posx2<=0){
			C=true
		}
		if(posx3<=0){
			C2=true
			
		}
		if(dano == false){
			vivo = true
		}
		if(dano2 == false){
			vivo2 = true
		}
		if(posY >= 500){
			velo=0 
			posY=500
			pulo=0
		}
		if(keyIsDown(UP_ARROW)){ //seta de cima para pular 
			pulo=1
		}
		if(pulo==1){
			posY-=20
			posY+=velo
		}
		if(posx2 <= 100){
			v--
			C=true
			vivo=false
		}
		if(posx3 <= 100){
			v--
			C2=true
			vivo2=false
		}
		if(random() < 0.01 && bola==false){
			bola = true
		}
		if(xb[0] < 0){
			xb[0] = width
			bola = false
		}
		if(bola){
			xb[0] -= 6
		}
		if(maisvida == true){
			bola == false
		}
	
	C = collideRectRect (posx2,posy2,55,55,posX,posY,50,50)
	C2 = collideRectRect (posx3 , posy3 ,50,50,posX,posY,50,50) // colisão do personagem com o quadrado (inimigo)
	dano = collideRectRect (xd,yd,50,25,posx2,posy2,50,50)
	dano2 = collideRectRect (xd,yd,50,25, posx3 , posy3 ,50,50) //colisão da espada com o quadrado 
	maisvida = collideRectRect (xd,yd,50,25,xb[0],yb[0],30,30)//colisão entre bruxa e espada

	image(img,xd,yd,50,25)// espada


	fill(153, 77, 0, 255)	
	rect(0,550 , 1200, 1200);

	rectMode(CORNER)
	image(img4,posX, posY, 50, 50) 

	if(vivo == true){
		image (img5, posx2, posy2, 55, 55)
		posx2 = posx2 - (5 * dif)
	}

	if(vivo2 == true){
		image (img2, posx3 , posy3 ,50,50)
		posx3 = posx3 - (5 * dif)
	}

	if (vivo == false) {
		posx2 = 1250
		vivo = true
	}
	if (vivo2 == false) {
		posx3 = 1250
		vivo2 = true
	}	

	

	image (img3,-30, 350 , 200, 200);


	image (img2, posx3 , posy3 ,50,50)

	fill(255)
	textSize(20)
	textAlign(RIGHT)
	text("Vidas: "+v,90,30)

	fill(255)
	textSize(20)
	textAlign(RIGHT)
	text("Fase: "+fase,85,50)

	fill(255)
	textSize(20)
	textAlign(RIGHT)
	text("Pontos " + pontos,90,70)
	

	velo+=grav

	if(fase==6){
	background(img8, 153, 255,255)
	
    textSize(50);
    
    textAlign(CENTER);

    text(' PARABÉNS! \n VOCÊ GANHOU! ', 600, 200); 

    textSize(25);
    
    textAlign(CENTER);

    text(' \n \n APERTE ESPAÇO \n PARA JOGAR NOVAMENTE ', 600, 300); 


        if(keyIsDown(32)){

      v = 4
      posX = 150
      posY = 525 
      pontos = 0
      fase = 1  
      vivo = false
      vivo2 = false 
      }	
} 

}
else{
	if(v <= 0){ //PERDE O JOGO

    textSize(32);
    
    textAlign(CENTER);

    text(' \n \n \n \n \n NOVAMENTE ', 600, 300); 

    if(keyIsDown(32)){

      v = 4
      posX = 150
      posY = 525 
      pontos = 0
      fase = 1 
      vivo = false
      vivo2 = false 
      }     
}
}	
}
}