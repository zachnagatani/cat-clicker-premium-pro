var model = {
	currentCat: null,

	cats: [{
		'name': 'El',
		'src': 'images/el.jpg',
		'counterText': 'Number of Clicks for El: ',
		'counter': 0,
	}, {
		'name': 'Widdle Baby',
		'src': 'images/widdle-baby.jpg',
		'counterText': 'Number of Clicks for Widdle Baby: ',
		'counter': 0,
	}, {
		'name': 'Mama',
		'src': 'images/mama.jpg',
		'counterText': 'Number of Clicks for Mama: ',
		'counter': 0,
	}, {
		'name': 'Legion',
		'src': 'images/legion.jpg',
		'counterText': 'Number of Clicks for Legion: ',
		'counter': 0,
	}, {
		'name': 'Boy',
		'src': 'images/boy.jpg',
		'counterText': 'Number of Clicks for Boy: ',
		'counter': 0,
	}]
};

var octopus = {

	init: function() {
		this.CatList = document.getElementById('catList');
		catListView.init();
		catView.init();
		adminView.init();
	},

	getCats: function() {
		return model.cats;
	},

	getCurrentCat: function() {
		return model.currentCat;
	},

	setCurrentCat: function(cat) {
		model.currentCat = cat;
	},

	incrementCounter: function() {
		model.currentCat.counter++;
		catView.render();
	},

	openAdminView: function() {
		adminForm.style = "display:block";
		adminView.render();
	},

	closeAdminView: function() {
		var myAdminForm = document.forms[0];
		var currentCat = octopus.getCurrentCat();
		myAdminForm[0].value = currentCat.name;
		myAdminForm[1].value = currentCat.src;
		myAdminForm[2].value = currentCat.counter;
		adminForm.style = "display:none";
	},

	updateCat: function() {
		var forms = document.forms;
		var myAdminForm = document.forms[0];
		var currentCat = octopus.getCurrentCat();
		currentCat.name = myAdminForm[0].value;
		currentCat.src = myAdminForm[1].value;
		currentCat.counter = myAdminForm[2].value;
		adminForm.style = "display:none";
		catView.render();
	}

};

var catView = {
	init: function() {
		this.catImgElem = document.getElementById('catImg');
		this.catNameElem = document.getElementById('catName');
		this.counterElem = document.getElementById('counter');
		this.catImgElem.addEventListener('click', function() {
			octopus.incrementCounter();
		});
	},
	// Why was it doubling when the img event handler was in render instead of init???
	render: function() {
		var catPicContainer = document.getElementById('catPicContainer');
		var currentCat = octopus.getCurrentCat();
		this.catImgElem.src = currentCat.src;
		this.catNameElem.textContent = currentCat.name;
		this.counterElem.innerHTML = currentCat.counterText + currentCat.counter;
	}
};

var catListView = {
	init: function() {
		catListView.render();
	},

	render: function() {
		var cats = octopus.getCats();
		var catList = document.getElementById('catList');
		// for (var i = 0; i < cats.length; i++) {
		// 	var currentCat = cats[i];
		// 	var elem = document.createElement('li');
		// 	elem.textContent = currentCat.name;
		// 	catList.appendChild(elem);
		// }

		cats.forEach(function(cat) {
			cat.li = document.createElement('li');
			cat.li.textContent = cat.name;
			catList.appendChild(cat.li);
			cat.li.addEventListener('click', function() {
				octopus.setCurrentCat(cat);
				catView.render();
				adminView.render();
			});
		});

		// for (var i = 0; i < cats.length; i++){
		// 	var cat = cats[i];
		// 	cat.li = document.createElement('li');
		// 	cat.li.textContent = cat.name;
		// 	catList.appendChild(cat.li);
		// 	cat.li.addEventListener('click', (function(catCopy){
		// 		return function (){
		// 			octopus.setCurrentCat(catCopy);
		// 			catView.render();
		// 		};
		// 	})(cat));
		// }
	},
};

var adminView = {
	init: function(){
		this.nameInput = document.getElementById('nameInput');
		this.urlInput = document.getElementById('urlInput');
		this.counterInput = document.getElementById('counterInput');

		var adminButton = document.getElementById('adminButton');
		var adminForm = document.getElementById('adminForm');
		var cancelButton = document.getElementById('cancelButton');
		var saveButton = document.getElementById('saveButton');

		adminButton.addEventListener('click', function(){

			octopus.openAdminView();

		});

		cancelButton.addEventListener('click', function(){

			octopus.closeAdminView();


		});

		saveButton.addEventListener('click', function(){

			octopus.updateCat();

		});


	},

	render: function(){
		var currentCat = octopus.getCurrentCat();

		this.nameInput.setAttribute('value', currentCat.name);
		this.urlInput.setAttribute('value', currentCat.src);
		this.counterInput.setAttribute('value', currentCat.counter);

	}
};

octopus.init();