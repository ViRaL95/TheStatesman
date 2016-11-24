var table=document.getElementById("id_of_table");
function retrieve_data(){
	var feed="http://stonybrookathletics.com/calendar.ashx/calendar.rss?sports_id=2";

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
				console.log(text);
				i++;

				//if the row index is greater than the number of rows for j, k and l then you can 
				//append a new row to the bottom of the table 
				if(i>j && i>k && i>l){
					table.insertRow(-1);
					console.log("tableinsertrow occurred");
				}
				rows=table.rows[i];
				cell0=rows.insertCell(0);

				text=text.split("\n");
				occurence=setOccurence(text);
				date=setDateAndTime(text);
				var tennis=occurence +" "+date;
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
				occurence=setOccurence(text);
				date=setDateAndTime(text);
			     basketball= occurence+" "+date;
				cell1.innerHTML=basketball;
				

			}
			if(text.includes("Football")){
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
				occurence=setOccurence(text);
				date=setDateAndTime(text);
				var football= occurence+" "+date;
				cell2.innerHTML=football;
		};


	});
});
}
function setDateAndTime(text){
date=text[4];
date=date.split("-");
if(date[2].length>2){
	date[2]=date[2].substring(0,1);
}
date=date[1]+("/")+date[2]+("/")+date[0];
return date;

}

function setOccurence(text){
occurence=text[2];
occurence=occurence.substring(0, occurence.indexOf('http'));
occurence=occurence.substring(0, occurence.length-3);
return occurence;

}
window.onload=function(){

retrieve_data();
};