var table=document.getElementById("id_of_table");

function retrieve_data(){
	var feed="http://stonybrookathletics.com/calendar.ashx/calendar.rss?sports_id=1";

	$.get(feed, function(data){

		var i=0;
		var j=0;
		var k=0;
		var l=0;
		$(data).find("item").each(function(){
		//receives text wherever the item tagh occurs 
			var el=$(this);
			var text=el.text();
		//if the text contains the word Tennis in it 
			if(text.includes("Tennis")){
		//each sport has its own row index. Increment row index to find next row 
		//that needs to be tend to
				i++;

				//if the row index is greater than the number of rows for j, k and l then you can 
				//append a new row to the bottom of the table 
				if(i>j && i>k && i>l){
					table.insertRow(-1);
				}
				rows=table.rows[i];
				cell0=rows.insertCell(0);

				text=text.split("\n");
				occurence=setTennisOccurence(text);
				date=setDateAndTimeTennis(text);
				 tennis=occurence +" "+date;
				cell0.innerHTML=tennis; 
			}
			
			if(text.includes("Basketball")){
				j++;
				/*
				if the value of j is greater than the values of k, l and i then you must create a new row. 
				If the value of j is not greater than the value of k l and i then this row has already been created
				and we must simply insert teh cell into the respective row. 
				*/
				if(j>i&& j>k && j>l){
				  table.insertRow(-1);
				}
				rows=table.rows[j];

				if(rows.cells[0]==null){
					rows.insertCell(0);
				}
				cell1=rows.insertCell(1);
				if(rows.cells[2]==null){
					rows.insertCell(2);
				}
				text=text.split("\n");

				occurence=setBasketballOccurence(text);
				date=setDateAndTimeBasketball(text);
				if(date!="DONT-RECORD"){
			     basketball= occurence+" "+date;
				cell1.innerHTML=basketball;
				}

			}
			if(text.includes("Football")){

				console.log("entered football ");

				k++;
				if(k>i && k>j && k>l){
					table.insertRow(-1);
				}
				rows=table.rows[k];
				if(rows.cells[0]==null){
					rows.insertCell(0);
				}
				if(rows.cells[1]==null){
					rows.insertCell(1);
				}
				cell2=rows.insertCell(2);
				text=text.split("\n");
				console.log("after split"+text);
				occurence=setFootballOccurence(text);
				date=setDateAndTimeFootball(text);
				football= occurence+" "+date;
				cell2.innerHTML=football;
		};


	});
});
}

function setDateAndTimeTennis(text){
date=text[4];
date=date.split("-");
if(date[2].length>2){

	date[2]=date[2].substring(0,1);
}
date=date[1]+("/")+date[2]+("/")+date[0];
return date;
}

function setTennisOccurence(text){
occurence=text[2];
if(occurence.includes("[L]")){
occurence=occurence.substring(occurence.search("[L]")+3, occurence.indexOf('\\'));
occurence="Loss "+occurence
return occurence;
}
else if(occurence.includes("[W]")){
occurence=occurence.substring(occurence.search("[W]")+3,occurence.indexOf('\\'));
occurence="Win "+occurence;
return occurence;
}
else{
occurence=occurence.substring(0,occurence.indexOf('\\'));
occurence="Not Played Yet "+occurence;
return occurence;
}

}
function setFootballOccurence(text){
occurence=text[2];
if(occurence.includes("[L]")){
occurence=occurence.substring(occurence.search("[L]")+3, occurence.indexOf('\\'));
occurence="Loss "+occurence
return occurence;
}
else if(occurence.includes("[W]")){
occurence=occurence.substring(occurence.search("[W]")+3,occurence.indexOf('\\'));
occurence="Win "+occurence;
return occurence;
}
else{
occurence=occurence.substring(0,occurence.indexOf('\\'));
occurence="Not Played  "+occurence;
return occurence;
}

}

function setDateAndTimeFootball(text){
date=text[4];
date=date.split("-");
if(date[2].length>2){
	date[2]=date[2].substring(0,1);
}
date=date[1]+("/")+date[2]+("/")+date[0];
return date;

}

function setDateAndTimeBasketball(text){
var date= new Date();
date=text[4];
date=date.split("-");
if(date[2].length>2){
	date[2]=date[2].substring(0,1);
}
date=date[1]+("/")+date[2]+("/")+date[0];
if (date[1]>date.getMonth()+2|| date[1]<date.getMonth()-2){
	return "DONT-RECORD";
}
else{
return date;
}
}

function setBasketballOccurence(text){
occurence=text[2];
if(occurence.includes("[L]")){
occurence=occurence.substring(occurence.search("[L]")+3, occurence.indexOf('\\'));
occurence="Loss "+occurence
return occurence;
}
else if(occurence.includes("[W]")){
occurence=occurence.substring(occurence.search("[W]")+3,occurence.indexOf('\\'));
occurence="Win "+occurence;
return occurence;
}
else{
occurence=occurence.substring(0,occurence.indexOf('\\'));
occurence="Not Played "+occurence;
return occurence;
}

}


function addCellHandlers(){
	//getElementByClassName , get ElementById, and getElementsByTagName could have always been used here 
	
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




window.onload=function(){
retrieve_data();	
table.setAttribute("id","hide-1");
addCellHandlers();
};
