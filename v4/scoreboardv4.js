function changeOptions() {
	var gender = document.getElementById("gender").value;
	var sport = document.getElementById("sport");

	var men_sport = ['Baseball', 'Basketball', 'Football', 'Lacrosse', 'Soccer'];
	var women_sport = ['Basketball', 'Lacrosse', 'Soccer', 'Softball', 'Volleyball'];


	if(gender=="Women"){
		for(i=0;i<women_sport.length;i++){
			sport.options[i] = new Option(women_sport[i]);
		}
	}

	if(gender == "Men"){
		for(i=0;i<men_sport.length;i++){
			sport.options[i] = new Option(men_sport[i]);
		}			
	}
}
