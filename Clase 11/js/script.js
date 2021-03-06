function Noticia(id, titulo, descripcion, imagen) {

    this.id = id;
    this.titulo = titulo;
    this.descripcion = descripcion;
    this.imagen = imagen;

}

var Diario = (function () {

    // Atributos privados
    var noticias = [];
	var claveLocalStorage = 'noticias';

    /*
        Permite precargar las noticias por localstorage
    */
    var precargarNoticias = function () {
		
        var datos = localStorage.getItem(claveLocalStorage);

        if (datos !== null && datos !== '') {

            noticias = JSON.parse(datos);
			
			for (i = 0; i < noticias.length; i++) {
				
				dibujarNoticia(noticias[i]);
				
			}

		}

	}

	/*
		Guarda el array de noticias en localstorage
	*/
	var guardarNoticias = function () {

		var datos = JSON.stringify(noticias);
		localStorage.setItem(claveLocalStorage, datos);

	}
	
	/*
		Agrega el texto al elemento utilizando un nodoTexto
		Retorna el elemento con el nodoTexto agregado
	 */
    var agregarTexto = function (elemento, texto) {

        var nodoTexto = document.createTextNode(texto);
        elemento.appendChild(nodoTexto);

        return elemento;

    }

    var modificarNoticia = function (noticia) {

    	var POSICION_TITULO = 2;
    	var POSICION_DESCRIPCION = 3;
    	var POSICION_IMAGEN = 4;

    	var posicion = obtenerPosicionNoticia(noticia.id);
    	var noticiaDOM = document.getElementById(noticia.id);
    	// var noticiaDOM = $('#' + noticia.id);

    	noticias[posicion].titulo = noticia.titulo;
    	noticias[posicion].descripcion = noticia.descripcion;
    	noticias[posicion].imagen = noticia.imagen;

    	noticiaDOM.childNodes[POSICION_TITULO].innerHTML = noticia.titulo;
    	noticiaDOM.childNodes[POSICION_DESCRIPCION].innerHTML = noticia.descripcion;
    	noticiaDOM.childNodes[POSICION_IMAGEN].setAttribute('src', noticia.imagen);

  //   	$('#titulo').val(noticia.titulo);
  //   	$('#descripcion').val(noticia.descripcion);
		// $('#imagen').attr('src', noticia.imagen);

		

    	guardarNoticias();
    	limpiarFormulario();
    	
    }

    var limpiarFormulario = function () {

		var boton = $('#boton').html('Agregar');

		boton.off('click');

		boton.on('click', crearNoticia);

    	// // boton.innerHTML = 'Agregar';
    	// boton.onclick = crearNoticia;

    	$('#titulo').empty();
    	$('#descripcion').empty();
    	$('#imagen').empty();

		// document.getElementById('titulo').value = '';
		// document.getElementById('descripcion').value = '';
		// document.getElementById('imagen').value = '';

    }

    var cargarNoticia = function (noticia) {

    	$('#titulo').val(noticia.titulo);
    	$('#descripcion').val(noticia.descripcion);
    	$('#imagen').val(noticia.imagem);

   
	   	// document.getElementById('titulo').value = noticia.titulo;
	   	// document.getElementById('descripcion').value = noticia.descripcion;
	   	// document.getElementById('imagen').value = noticia.imagen;
	   	
		var boton = $('#boton').html('Modificar');

	   	// boton.htlm('Modificar');

	   	boton.off('click');

	   	boton.on('click', function () {

			noticia.titulo = $('#titulo').val();
	   		noticia.descripcion = $('#descripcion').val();
	   		noticia.imagen = $('#imagen').val();

	   		modificarNoticia(noticia);

		} )
	   	
		// boton.onclick = function () {

		// 	noticia.titulo = $('#titulo').val();
	 //   		noticia.descripcion = $('#descripcion').val();
	 //   		noticia.imagen = $('#imagen').val();

	 //   		modificarNoticia(noticia);

		// }
	}

	/*
		Dibuja en el DOM la noticia pasada como parametro
	 */
	var dibujarNoticia = function (noticia) {
	
		$('<li/>')
			.attr('id', noticia.id)
			.addClass('list-group-item')
			.appendTo('#noticias');

		var botonEliminar = $('<button/>')
									.addClass('btn btn-default btn-xs')
									.on('click', function () { eliminarNoticia(noticia.id); });
		var botonModificar = $('<button/>')
									.addClass('btn btn-default btn-xs')
									.on('click', function() { cargarNoticia(noticia); });

		$('<span/>')
			.addClass('glyphicon glyphicon-remove')
			.html('Borrar')
			.appendTo(botonEliminar);

		$('<span/>')
			.addClass('glyphicon glyphicon-pencil')
			.html('Modificar')
			.appendTo(botonModificar);

		botonEliminar.appendTo('#' + noticia.id);
		botonModificar.appendTo('#' + noticia.id);

		 $('<h3/>').html(noticia.titulo).appendTo('#' + noticia.id);
		 $('<p/>').html(noticia.descripcion).appendTo('#' + noticia.id);
		 $('<img/>').attr('src', noticia.imagen).appendTo('#' + noticia.id);

		// Se obtiene el elemento padre que nos servira para agregar los elementos hijos
		// var div = document.getElementById("noticias");


		// // Se crean todos los elementos que necesitaremos para dibujar la noticia (li, h3, img, p)

		// var li = document.createElement("li");
		// var h3 = document.createElement('h3');
		// var img = document.createElement('img');
		// var p = document.createElement('p');
		// var botonEliminar = document.createElement("button");
		// var botonModificar = document.createElement("button");
		// var icono = document.createElement("span");
		// var iconoModificar = document.createElement("span");
		
		// botonEliminar.setAttribute('class', 'btn btn-default btn-xs');
		// botonEliminar.innerHTML = 'Borrar';

		// botonModificar.setAttribute('class', 'btn btn-default btn-xs');
		// botonModificar.innerHTML = 'Modificar';

		// botonEliminar.onclick = function () { 
			
		// 	eliminarNoticia(noticia.id);

		// } 

		// botonModificar.onclick = function () {

		// 	cargarNoticia(noticia);

		// }

		// icono.className ="glyphicon glyphicon-remove";
		// botonEliminar.appendChild(icono);

		// iconoModificar.className ="glyphicon glyphicon-pencil";
		// botonModificar.appendChild(iconoModificar);

		// // Se asignan los atributos id y class al elemento li creado anteriormente
		// // El id del li es el id de la noticia. Nos servira para luego, de ser necesario, borrarla
		// li.setAttribute('id', noticia.id);
		// li.setAttribute('class', 'list-group-item'); // Bootstrap

		// // Se agrega el texto al h3 y p a partir del titulo y la descripcion respectivamente
		// h3 = agregarTexto(h3, noticia.titulo);
		// p = agregarTexto(p, noticia.descripcion);

		// // Se asigna el source de la imagen (src) a partir del atributo imagen de la noticia
		// img.setAttribute('src',  noticia.imagen);

		// // Appends de los elementos h1, p, img en li
		// li.appendChild(botonEliminar);
		// li.appendChild(botonModificar);
		// li.appendChild(h3);
		// li.appendChild(p);
		// li.appendChild(img);
		
		// // Por ultimo se hace append del li en ul
		// div.appendChild(li);

	}

    /*
		Borra del DOM la noticia pasada como parametro
	 */
    var borrarNoticiaDOM = function (id) {

    	// $('#' + noticia.id).remove();

        var ul = document.getElementById("noticias");
        var li = document.getElementById(id);

        ul.removeChild(li);

    }

    // Si la noticia existe en el array de noticias devuelve la posicion donde se encuentra (0, 1, 2, etc.)
    // En caso contrario devuelve -1;
    var obtenerPosicionNoticia = function (id) {

        var posicion = -1; 
        
        // La condicion del for lee: 'Mientras haya elementos en el array de noticias por recorrer y la posicion sea -1
        for(i = 0; i < noticias.length && posicion === -1; i++) { 

            if (noticias[i].id === id) { 
                
                // Si los ids coinciden me guardo el contenido de la variable i en la variable posicion
                posicion = i; 

            }

        }

        return posicion;

    }

    var agregarNoticia = function (noticia) {

		noticias.push(noticia);

		guardarNoticias();

		dibujarNoticia(noticia);

		limpiarFormulario();
		
    }
	
    var eliminarNoticia = function (id) {

        var posicion = obtenerPosicionNoticia(id);

		// Borra 1 elemento desde la posicion
		noticias.splice(posicion, 1);

		guardarNoticias();

		borrarNoticiaDOM(id);

    }

    var limpiarNoticiasDOM = function () {

		var noticiasDOM = document.getElementById('noticias');
		
		while (noticiasDOM.firstChild) {

			noticiasDOM.removeChild(noticiasDOM.firstChild);

		}

    }

	var limpiarDiario = function () {

		noticias = []
		localStorage.removeItem(claveLocalStorage);
		
		limpiarNoticiasDOM();

	}

	var construirComparador = function (atributo, ordenamientoAscendente) {

		return function (elementoA, elementoB) {

			var resultado;

			if (elementoA[atributo] > elementoB[atributo]) {

				resultado = 1;

			}

			if (elementoA[atributo] === elementoB[atributo]) {

				resultado = 0;

			}

			if (elementoA[atributo] < elementoB[atributo]) {

				resultado = -1;

			}

			if (ordenamientoAscendente === false) {

				resultado = -resultado;

			}

			return resultado;

		}

	}

	var ordenarNoticias = function (atributo, ordenamientoAscendente) {

		var comparador = construirComparador(atributo, ordenamientoAscendente);

		noticias.sort(comparador);

		guardarNoticias();
		limpiarNoticiasDOM();
		precargarNoticias();

	}

	/*

		Busca en el array de noticias la noticia con el id mas grande y devuelve ese id incrementado en una unidad.

	*/
	var generarNuevoId = function () {

		var id = 0;

		if (noticias.length !== 0) {
			
			var atributo = 'id';
			var ordenamientoAscendente = false;
			var comparador = construirComparador(atributo, ordenamientoAscendente);
			var copiaNoticias = noticias;

			copiaNoticias.sort(comparador);

			id = copiaNoticias[0].id + 1;

		}

		return id;
		
	}
	
	var mostrarOcultarListado = function () {
	
		var listado = document.getElementById('noticias');
		var ordenadores = document.getElementById('ordenadores');
		
		if (listado.className == '') {

			listado.className = 'hidden';
			ordenadores.className = 'hidden';
			this.textContent = 'Mostrar Noticias';

		} else {

			listado.className = '';
			ordenadores.className = 'btn-group';
			this.textContent = 'Ocultar Noticias';

		}
		
	}

	var crearNoticia = function () {

		var id = generarNuevoId();
		var titulo = document.getElementById('titulo').value;
		var descripcion = document.getElementById('descripcion').value;
		var imagen = document.getElementById('imagen').value;

		var noticia = new Noticia(id, titulo, descripcion, imagen);

		agregarNoticia(noticia);

	}

	var vincularFormulario = function () {

		var boton = document.getElementById('boton');
		boton.onclick = crearNoticia;

	}
	
	var vincularOrdenamientos = function () {

		var ordenarPorId = document.getElementById('id');
		var ordenarPorAZ = document.getElementById('az');
		var ordenarPorZA = document.getElementById('za');

		ordenarPorId.onclick = function () {
			
			var atributo = 'id';
			var ordenamientoAscendente = true;

			ordenarNoticias(atributo, ordenamientoAscendente);

		}

		ordenarPorAZ.onclick = function () {
			
			var atributo = 'titulo';
			var ordenamientoAscendente = true;

			ordenarNoticias(atributo, ordenamientoAscendente);

		}

		ordenarPorZA.onclick = function () {
			
			var atributo = 'titulo';
			var ordenamientoAscendente = false;

			ordenarNoticias(atributo, ordenamientoAscendente);

		}

		
	}

	var vincularBotonListado = function () {

		var boton = document.getElementById('mostrarOcultarListado');
		boton.onclick = mostrarOcultarListado;

	}
	
	var iniciar = function () {

		vincularFormulario();
		vincularOrdenamientos();
		vincularBotonListado();
		precargarNoticias();

	}

    // El 'agregarNoticia' de la izquierda es el nombre del atributo de nuestro objeto literal.
    // El 'agregarNoticia' de la derecha es el valor que tendra el atributo. Es la funcion que tenemos declarada

    // El 'eliminarNoticia' de la izquierda es el nombre del atributo de nuestro objeto literal.
    // El 'eliminarNoticia' de la derecha es el valor que tendra el atributo. Es la funcion que tenemos declarada
    return {

        /* Esto se hace ahora a traves de los eventos del formulario.
		agregarNoticia: agregarNoticia,
        eliminarNoticia: eliminarNoticia,*/
		limpiarDiario: limpiarDiario,
		iniciar: iniciar

    };

})()

// Para limpiar el diario pueden hacer lo siguiente:
// Esto borra el array de noticias, limpia localstorage y quita todas las noticias del DOM.
// Diario.limpiarDiario()

$(document).ready(function () {

		Diario.iniciar();

	}
);




