var table=document.getElementById("id_of_table");
function addCellHandlers(){
	//getElementByClassName , get ElementById, and getElementsByTagName could have always been used here 
	var rowheader=table.getElementsByTagName("thead");
	
		 rowheader=table.rows[0];
		for(j=0; j<3; j++){
			cell=rowheader.cells[j];
			if(cell.innerHTML=="Tennis"){
				cell.onclick=function(){
					var sport="Tennis";
					hideColumns(sport);
				};

			}
			if(cell.innerHTML=="Basketball"){
				cell.onclick=function(){
				var sport="Basketball";
				hideColumns(sport);
				};
			}
			if(cell.innerHTML=="Football"){
				cell.onclick=function(){
				var sport="Football";
				hideColumns(sport);
				};
			}
		}

	

};

function hideColumns(sport){
	if(sport=="Tennis"){
		table.setAttribute("id","hide-1");
	}
	if(sport=="Basketball"){
		table.setAttribute("id","hide-2");
	}
	if(sport=="Football"){
		table.setAttribute("id","hide-3");
	}
};

	function retrieve_data(){
	var rows=table.getElementsByTagName("tr");
	var feed="http://stonybrookathletics.com/calendar.ashx/calendar.rss?sports_id=2";
	$.get(feed, function(data){
		var i=0;
		$(data).find("item").each(function(){
			var el=$(this);
			var text=el.text();
			if(text.includes("Tennis")){
				i++;
				var res=text.split(" ");
				var row=table.insertRow(i);
				var cell=row.insertCell(0);
				console.log(text);
				text=text.split("\n");
				date=text[4];
				date=date.split("-");
				if(date[2].length>2){
					date[2]=date[2].substring(0,1);
				}
				cell.innerHTML=date[1]+("/")+date[2]+("/")+date[0];
			}

		});


	});
}


window.onload=function(){
table.setAttribute("id","hide-1");

addCellHandlers();	
retrieve_data();
};

