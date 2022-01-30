
	// CONVERTE O TEXTO EM HEXADECIMAL PARA O FORMATO HEXPIC E O PRINTA NO ELEMENTO CANVAS

	function HexPic(hex){

		if (hex != ''){
			var hex_tam = hex.length;
			var cluster = Math.ceil(hex_tam / 6);

			if ((hex_tam / 6) != cluster) {
				switch ((cluster * 6) - hex_tam) {
		  			case 0:
		  				break;
		  			case 1:
		  				hex = hex + '0';
		  				break;
					case 2:
						hex = hex + '00';
						break;
					case 3:
						hex = hex + '000';
						break;
					case 4:
						hex = hex + '0000';
						break;
					case 5:
						hex = hex + '00000';
						break;
				}
			}

			tela = Math.sqrt(cluster);
			tela_ar = Math.ceil(tela);

			canvas.width  = tela_ar;
			canvas.height = tela_ar;

			var x = 0;
			var y = 0;

			for (var i = 0; i < hex_tam; i = i + 6) {
				drawPixel(x, y, '#' + hex.substr(i, 6));
				if (x == tela_ar - 1){
					x = 0;
					y++;
				} else {
					x++;
				}
			}

			//CRIA UM HEXPIC EXTENDIDO

			canvas_b.width  = 1080;
			canvas_b.height = 1080;

			context_b.beginPath();
			context_b.rect(0, 0, 1080, 1080);
			context_b.closePath();
			context_b.fillStyle = "#000";
			context_b.fill();

			context_b.imageSmoothingEnabled = false;

			context_b.drawImage(canvas, 0, 0, 1080, 1080);
		}

	}

	// INVOCA AS FUNÇÕES PARA CONVERTER O TEXTO UTF-8 PARA HEXADECIMAL

	function Hex(textoUTF){
		hex = obterHex(obterUTF8(textoUTF));
		return hex;
	}
	
	// DESENHA PIXEL COM BASE NA COORDENADA X E Y, USANDO A COR HEXA DESIGNADA

	function drawPixel(x, y, color) {
		var roundedX = Math.round(x);
		var roundedY = Math.round(y);
	    context.beginPath();
	    context.fillStyle = color || '#000';
	  	context.fillRect(roundedX, roundedY, 1, 1);
	    context.fill();
	}


	// CONVERSOR UTF-8 PARA HEXADECIMAL

	function obterHex(bytes) {
	  return Array.from(bytes, byte => byte.toString(16).padStart(2, "0")).join("");
	}

	function obterUTF8(string) {
	  return new TextEncoder().encode(string);
	}



	function hexpicGrande(entrada){

		tamanho = entrada ? entrada : calculaMatriz(0,0);

		if (tamanho){

			altura = Math.round(canvas_b.height / tamanho);
			largura = Math.round(canvas_b.width / tamanho);

			canvas.width = largura;
	        canvas.height = altura;

	        context.beginPath();
			context.rect(0, 0, largura, altura);
			context.closePath();
			context.fillStyle = "#000";

			context.imageSmoothingEnabled = false;
			context.drawImage(canvas_b, 0, 0, largura, altura);

			return decodificador();
		}
	}

function decodificador(){
	if (canvas.width > 0) {

		var pixels = canvas.width * canvas.height;

		var x = 0;
		var y = 0;
		var resultado = '';

		var borda_maxima = canvas.width - 1;

		var final = '';

		for (i = 0; i < pixels; i++) {
			resultado = resultado + pegaCor(x,y,true);
			if (x == borda_maxima){
				x = 0;
					y++;
				} else {
					x++;
			}
		}
	}

	return (resultado);
}

	// FUNÇÕES
	// TODAS AS FUNÇÕES SECUNDÁRIAS ESTÃO

	// CONVERTE UMA STRING HEXADECIMAL PARA BYTES (USADO NA FUNÇÃO DECODE)

	function hexToBytes(hex) {
	    const bytes = new Uint8Array(hex.length / 2);
	    for (let i = 0; i !== bytes.length; i++) {
	        bytes[i] = parseInt(hex.substr(i * 2, 2), 16);
	    }
	    return bytes;
	}

	// RETORNA O CODIGO DE COR HEXADECIMAL DE UM PIXEL COM BASE NAS COORDENADAS
	// OBS: DEPENDENDO DO TIPO DA DECODIFICAÇÃO, A FUNÇÃO MUDA O ALVO DO CANVAS (PRINCIPAL OU BACKUP)

	function pegaCor(x,y, puro){
		var cor_data = puro == true ? context.getImageData(x, y, 1, 1).data : context_b.getImageData(x, y, 1, 1).data;
		var cor_hex = paraHex(cor_data[0]) + paraHex(cor_data[1]) + paraHex(cor_data[2]);

		return cor_hex;
	}




	// CONVERTE O COMPONENTE DE COR PARA HEXADECIMAL (EXTENSÃO DA FUNÇÃO PEGACOR)

	function paraHex(entrada) {
	  var hex = entrada.toString(16);
	  return hex.length == 1 ? "0" + hex : hex;
	}




	// CALCULA O TAMANHO DE UM PIXEL HEXPIC BASEADO NA COORDENADAS X E Y

	function calculaMatriz(x,y){
		cor_A = pegaCor(x,y);
		cor_B = '';
		cor_C = '';
		cor_D = '';

		matriz = 0;


		matriz_x = 0;
		for_x = x;
		for (var i = 0; matriz_x == 0; i++) {
			for_x++;
			cor_B = pegaCor(for_x,y);

			if (cor_A != cor_B){ matriz_x = i; }
			if (i > canvas_b.width){ matriz_x = -1; }
		}
		
		matriz_y = 0;
		for_y = y;
		for (var i = 0; matriz_y == 0; i++) {
			for_y++;
			cor_C = pegaCor(x,for_y);

			if (cor_A != cor_C){ matriz_y = i; }
			if (i > canvas_b.height){ matriz_y = -1; }
		}

		matriz_xy = 0;
		for_x = x;
		for_y = y;
		for (var i = 0; matriz_xy == 0; i++) {
			for_x++;
			for_y++;
			cor_D= pegaCor(for_x,for_y);

			if (cor_A != cor_D){ matriz_xy = i; }
			if (i > canvas_b.width && (i > canvas_b.height)){ matriz_xy = -1; }
		}

		if (matriz == 0 && (matriz_y == matriz_x)) { matriz = matriz_y + 1 }
		if (matriz == 0 && (matriz_y == matriz_xy)) { matriz = matriz_xy + 1 }
		if (matriz == 0 && (matriz_x == matriz_xy)) { matriz = matriz_x + 1 }

		if (matriz != 0){
			return matriz;
		} else {
			return 0;
		}
	}