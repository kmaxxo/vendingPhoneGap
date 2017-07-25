
$(document).ready(function() {

	$('#go').on('click', function(e){
		e.preventDefault();
		vendingRandom.init();	
	});

	$('#reset').on('click', function(e){
		e.preventDefault();
		if ( confirm("¡Si resetea, se borrará el histórico de su APP!") ){
			vendingRandom.resetStorage();
		}
	});

	vendingRandom.desactivateSquare();

});


var vendingRandom = {

	handler: $('#vending_matrix'),
	todas_casillas : null,
	seleccionada : null,
	listener : 0,
	storage_key_name : "consumed-" + $('#vending_matrix').data("matrix-version"),
	storage_stored : null,

	init : function (){

		$('td', vendingRandom.handler)
		.removeClass("danger")
		.removeClass("success");

		this.todas_casillas = null;
		this.seleccionada = null;
		this.listener = 0;
		this.desactivateStored();


		this.sorteo();

	},

	desactivateSquare : function () {

		$('td', vendingRandom.handler).on('click', function(){

			$(this).toggleClass("warning");

		});

		// set values as IDs
		for(i=0;i<=$('td', vendingRandom.handler).length;i++) {
			obj = $('td', vendingRandom.handler)[i];
			$(obj).attr("id", $(obj).text());
		}

		// get storage and set consumed
		this.desactivateStored();

	},

	desactivateStored : function(){

		var consumedItem = window.localStorage.getItem(vendingRandom.storage_key_name);

		if ( consumedItem ) {

			vendingRandom.storage_stored = JSON.parse(consumedItem);

			for(i=0; i<vendingRandom.storage_stored.length ; i++){
				$('#'+vendingRandom.storage_stored[i]).addClass("warning");
			}

		}

	},

	resetStorage : function(){

		window.localStorage.clear();
		// location.reload();

	},

	sorteo : function(){

		this.todas_casillas = [];

		for(i=0;i<$('td', this.handler).length;i++){

			casilla = $('td', vendingRandom.handler)[i];

			if ( ! $(casilla).hasClass("warning") ){
				this.todas_casillas.push(i);
			}

		}

		this.todas_casillas = this.shuffle(this.todas_casillas);
		this.seleccionada = this.todas_casillas[ parseInt(this.todas_casillas.length/2) ];

		for(i=0;i<this.todas_casillas.length;i++){

			vendingRandom.ilumina( $('td', vendingRandom.handler)[this.todas_casillas[i]] );

		}

	},

	selecciona : function(){

		casilla = $('td', vendingRandom.handler)[this.seleccionada];
		$(casilla).addClass("success");

		// save storage
		id2save = $(casilla).attr("id");

		if (vendingRandom.storage_stored == null || (vendingRandom.storage_stored != null && vendingRandom.storage_stored.indexOf(id2save) === -1) ) {

			if ( vendingRandom.storage_stored == null ) {
				vendingRandom.storage_stored = [];
			}

			vendingRandom.storage_stored.push( id2save );
			window.localStorage.setItem(vendingRandom.storage_key_name, JSON.stringify(vendingRandom.storage_stored));

		}

	},

	ilumina : function(casilla){

		timer = Math.floor((Math.random() * 1000) + 1);

		$(casilla)
		.delay(timer)
		.queue(function(){
		    $(this)
		    .addClass("danger")
		    .dequeue();
		})
		.delay(timer)
		.queue(function(){
		    $(this)
		    .removeClass("danger")
		    .dequeue();

			vendingRandom.listener++;
			if ( vendingRandom.listener >= vendingRandom.todas_casillas.length ) {
				vendingRandom.selecciona();
			}

		});

	},

	shuffle : function(array) {

		var currentIndex = array.length, temporaryValue, randomIndex;

		// While there remain elements to shuffle...
		while (0 !== currentIndex) {

			// Pick a remaining element...
			randomIndex = Math.floor(Math.random() * currentIndex);
			currentIndex -= 1;

			// And swap it with the current element.
			temporaryValue = array[currentIndex];
			array[currentIndex] = array[randomIndex];
			array[randomIndex] = temporaryValue;
		}

		return array;

	}

};


var storageVending = {

	init : function(){

	}

};