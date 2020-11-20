var altura = 0;
var largura = 0;
var vidas = 1;

//quantidade de moscas mortas
var moscaMorta = 0;

//tempo total de jogo
var tempo = 15;

//tempo em que o mosquito ficará na tela
var mosquitoTempo = 1500;

//recupera o nivel que está sendo selecionado
var nivel = window.location.search;
nivel = nivel.replace('?', '');

if (nivel == 'normal') {
	mosquitoTempo = 1500;
}
else if(nivel == 'dificil'){
	mosquitoTempo = 1000;
}
else if(nivel == 'chucknorris'){
	mosquitoTempo = 750;
};

//ajustar o tamanho da tela e do jogo
function ajustaTamanho() {
	altura = window.innerHeight;
	largura = window.innerWidth;
	console.log(largura, altura);
};

ajustaTamanho();

//contar o tempo do jogo
var cronometro = setInterval(function(){
	tempo--;
	if (tempo < 0) {
		clearInterval(cronometro);
		clearInterval(criaMosca);
		window.location.href = "vitoria.html";
	}
	else{
		document.getElementById('cronometro').innerHTML = tempo;
	}
}, 1000);

// Fazer com que as moscas apareçam em lugares aleatorios da tela
function posicaoRandomica(){

	// remover o mosquito anterior caso exista
	if (document.getElementById('mosquito')) {
		document.getElementById('mosquito').remove();

		//fazer com que ao encerrar as vidas o jogo termine
		if (vidas > 3) {
			window.location.href = "fim-jogo.html";
		}
		else{
			document.getElementById('v' + vidas).src = "imagens/coracao_vazio.png";	
		}
	vidas++;
	}

	var posicaoX = Math.floor(Math.random() * largura) - 90;
	var posicaoY = Math.floor(Math.random() * altura) - 90;

	if (posicaoX < 0) {
		posicaoX = 0;
	}
	if (posicaoY < 0) {
		posicaoY = 0;
	};

	console.log(posicaoX, posicaoY);

	//criar a imagem HTML

	var mosquito = document.createElement('img');
	mosquito.src = 'imagens/mosca.png';
	mosquito.className = tamanhoAleatorio() + ' ' + ladoAleatorio();
	mosquito.style.left = posicaoX + 'px';
	mosquito.style.top = posicaoY + 'px';
	mosquito.style.position = 'absolute';
	mosquito.id = 'mosquito';
	mosquito.onclick = function(){
		this.remove();
		moscaMorta++;
		document.getElementById('eliminadas').innerHTML = moscaMorta;
	}

	document.body.appendChild(mosquito);
	console.log(tamanhoAleatorio());
	console.log(ladoAleatorio());
}

//mudar o tamanho das moscas
function tamanhoAleatorio(){
	var classe = Math.floor(Math.random() * 3);

	switch(classe){
		case 0:
			return 'mosquito1';
		case 1:
			return 'mosquito2';
		case 2:
			return 'mosquito3';
	}
}


//mudar o lado das moscas
function ladoAleatorio(){
	var lado = Math.floor(Math.random() * 2);

	switch(lado){
		case 0:
			return 'lado1';
		case 1:
			return 'lado2';
	}
}