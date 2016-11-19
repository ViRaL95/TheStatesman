	function retrieve_data(){
	var table=document.getElementById("id_of_table");
	var rows=table.getElementsByTagName("tr");
	var feed="http://stonybrookathletics.com/calendar.ashx/calendar.rss?sports_id=2";
	$.get(feed, function(data){
		var i=0;
		$(data).find("description").each(function(){
			var el=$(this);
			var text=el.text();
			console.log(text);
			if(text.includes("Tennis")){
				consle.log(text);
				i++;
				var res=text.split(" ");
				var row=table.insertRow(i);
				var cell=row.insertCell(0);

				for (j=0; j++; j<rows.length){
					console.log(res);

				}
			}

		});


	});
}

