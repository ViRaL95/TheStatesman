function changeOptions() {
	var gender = document.getElementById("gender").value;
	var sport = document.getElementById("sport");

	var men_sport = ['Baseball', 'Basketball', 'Football', 'Lacrosse', 'Soccer'];
	var women_sport = ['Basketball', 'Lacrosse', 'Soccer', 'Softball', 'Volleyball'];

	var length = sport.options.length;
	for (i = 0; i < length; i++) {
  		sport.options[i] = null;
	}



	if (gender == "Women") {

	}
}
