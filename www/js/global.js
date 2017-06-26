
$(document).ready(function() {

	$('#go').on('click', function(e){
		e.preventDefault();
		vendingRandom.init();	
	})

});


var vendingRandom = {

	handler: $('#vending_matrix'),
	todas_casillas : null,
	seleccionada : null,
	listener : 0,

	init : function (){

		$('td', vendingRandom.handler)
		.removeClass("danger")
		.removeClass("success");

		this.todas_casillas = null;
		this.seleccionada = null;
		this.listener = 0;

		this.sorteo();

	},

	sorteo : function(){

		this.todas_casillas = [];

		for(i=0;i<$('td', this.handler).length;i++){

			this.todas_casillas.push(i);

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