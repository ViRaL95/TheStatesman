var table=document.getElementById("id_of_table");

function retrieve_data(){
	var feed="http://stonybrookathletics.com/calendar.ashx/calendar.rss?sports_id=1";

	$.get(feed, function(data){

		var i=0;
		var j=0;
		var k=0;
		$(data).find("item").each(function(){
		//receives text wherever the item tagh occurs 
			var el=$(this);
			var text=el.text();
		//if the text contains the word Tennis in it 
		
		if(i==0 && j==0 && k==0){
			table.insertRow(-1);

		}

			if(text.includes("Tennis")){
				text=text.split("\n");
				occurence=setOccurence(text);
				console.log(text);
				date=setDateAndTime(text);


				if(date!="DONT-RECORD"){
				i++;
			     tennis = occurence+" "+date;
					if(i>j && i>k){
					 	table.insertRow(-1);
					}
					rows=table.rows[i];
					if(rows.cells[0]!=null){
						cell0=rows.cells[0]
						cell0.className="";
					}
					else{
					cell0=rows.insertCell(0);
					}
					cell0.innerHTML=tennis;
				}
			}
			
			if(text.includes("Basketball")){
				text=text.split("\n");
				occurence=setOccurence(text);
				date=setDateAndTime(text);

				if(date!="DONT-RECORD"){
				j++;
			     basketball= occurence+" "+date;
					if(j>i && j>k){
					 	table.insertRow(-1);
					}
					rows=table.rows[j];
					
					if(rows.cells[0]==null){
						cell0=rows.insertCell(0);
						cell0.className="empty"
					}
					if(rows.cells[1]!=null){
					cell1=rows.cells[1];
					cell1.className="";
					}
					else{
						cell1=rows.insertCell(1);
					}

					cell1.innerHTML=basketball;
				}

			}
			
			if(text.includes("Football")){
				text=text.split("\n");
				occurence=setOccurence(text);
				date=setDateAndTime(text);

				if(date!="DONT-RECORD"){
				k++;
			     football= occurence+" "+date;
					if(k>i &&  k>j){
					 	table.insertRow(-1);
					}
					rows=table.rows[k];
					if(rows.cells[0]==null){
						cell0=rows.insertCell(0);
						cell0.className="empty";
					}
					if(rows.cells[1]==null){
						cell1=rows.insertCell(1);
						cell1.className="empty";
					}
				
					cell2=rows.insertCell(2);

					cell2.innerHTML=football;
				}
		};


	});
});
}

function setDateAndTime(text){
date=text[4];
console.log("text"+text);
date=date.split("-");
console.log(date);

month=date[1];
if(date[2].length>2){
	date[2]=date[2].substring(0,2);	
}
day=date[2];
year=date[0];

compare=new Date(year, month, day);
date=month+("/")+day+("/")+year;

var time= new Date();

var timediff=Math.abs(time.getTime()-compare.getTime());
var diffdays=Math.ceil(timediff/(1000*3600*24));

if(diffdays>120){
	return "DONT-RECORD";
}

else{
return date;
}
}

function setOccurence(text){
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
table.setAttribute("id","hide-1");
retrieve_data();	
addCellHandlers();
};
