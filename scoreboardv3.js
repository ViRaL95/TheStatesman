var selector=document.getElementById("gender");
var sport_select=document.getElementById("sport");
var table=document.getElementsByClassName("table");

table=table[0];
window.onload=function(){
	populateTable("Baseball","Men");
selector.onchange= function(){
	gender=selector.value;
	sport=sport_select.value;
	deleteAllElements();
	populateTable(sport, gender);
}	
sport.onchange=function(){
	gender=selector.value;
	sport=sport_select.value;
	deleteAllElements();
	populateTable(sport, gender);
}
};

//Deletes All Elements From the Table 
function deleteAllElements(){
$(".table").find("tr:gt(0)").remove();

}

//Populate the table with a given sport and a given gender
function populateTable(sport, gender){
var feed="http://stonybrookathletics.com/calendar.ashx/calendar.rss?sports_id=1";
//AJAX

	$.get(feed, function(data){
			var i=0;
		$(data).find("item").each(function(){
		//receives text wherever the item tag occurs.
			var el=$(this);
			var text=el.text();
			console.log(text);
		//creates row #1 if there are 0 rows. 

		//if the text includes your sport name and gender 
		if(gender=="Women"){
			if(text.includes(sport) && text.includes(gender)){
				//split the text by new line. 
				text=text.split("\n");
				date=setDateAndTime(text);
				console.log(date);
				//see what the team has played against
				player=playedWho(text);
				console.log(player);
				//gets whether the team has won or lost
				WL=getWinOrLoss(text);
				console.log(WL);
				if(date!="NA"){
					i++;
					//populate the table
					row=table.insertRow(-1);
					
					row.className="teams";
					cell0=row.insertCell(0);
					cell0.innerHTML=date;
					cell0.className="date";
					cell0.colspan="1";

					cell1=row.insertCell(1);
					cell1.innerHTML=player;
					cell1.className="game";
					cell1.colspan="2";

					cell2=row.insertCell(2);
					cell2.innerHTML=WL;
					cell2.className="score";
					cell2.colspan="2";
				}
			}
		}
		else{
				if(text.includes(sport)&& !text.includes("Women")){
					//split the text by new line. 
					text=text.split("\n");
					console.log(text);
					date=setDateAndTime(text);

					console.log("date is "+date);
					//see what the team has played against
					player=playedWho(text);
					console.log("player is "+player);
					//gets whether the team has won or lost
					WL=getWinOrLoss(text);
					console.log("WL is "+WL);


					if(date!="NA"){
						i++;
						//populate the table
						row=table.insertRow(-1);
						row.className="teams";

						cell0=row.insertCell(0);
						cell0.innerHTML=date;
						cell0.className="date";
						cell0.colspan="1";

						cell1=row.insertCell(1);
						cell1.innerHTML=player;
						cell1.className="game";
						cell1.colspan="2";

						cell2=row.insertCell(2);
						cell2.innerHTML=WL;
						cell2.className="score";
						cell2.colspan="2";

					}
			}


		}
		});
	});
}

function setDateAndTime(text){
date=text[4];
//SPLIT THE DATE ALONG DASHES
date=date.split("-");
//THE MONTH IS THE SECOND ELEMENT 
month=date[1];
if(date[2].length>2){
	date[2]=date[2].substring(0,2);	
}
//GET THE DAY 
day=date[2];
//GET THE YEAR
year=date[0];
//CREATE A NEW DATE OBJECT 
compare=new Date(year, month, day);
date=month+("/")+day+("/")+year;
var time= new Date();
//no future games and 6 weeks
//Time.getTime()-compare.getTime() will return a positive value if the game has already happened
var timediff=time.getTime()-compare.getTime();
var diffdays=Math.ceil(timediff/(1000*3600*24));
//if the game has occurred past the previous 42 days dont record the event 
if(diffdays>30){
	return "NA";
}

else{
return date;
}
}
//FIND OUT WHO IS PLAYING THE CURRENT TEAM IN THE RSS FEED
function playedWho(text){
text=text[2]
if(text.includes("[L]")|| text.includes("[W]")){
	player=text.substring(text.search("[L]")+3, text.indexOf('\\'));
	return player;
}
else{
player=text.substring(0,text.indexOf('\\'));
return player;
}
}

//FIND OUT IF THEY WON, LOST OR DID NOT PLAY YET. IF THEY DID NOT PLAY YET THEN 
//THE GAME HAS NOT LIKELY HAPPENED YET AND WILL NOT BE STORED INTO THE TABLE ANYWAYS
//AFTER FURTHER HANDLING OF THE DATA THIS INFO WILL NOT BE STORED IN THE TABLE.
function getWinOrLoss(text){
WL=text[2]

if(WL.includes("[L]")){
indices=[];
	for (i=0; i<WL.length; i++){
		if(WL[i]=="-"){
			indices.push(i+1);
		}
	}	
WL="Loss"+","+WL.substring(indices[0]-3, indices[0]+2);
}

else if(text.includes("[W]")){
indices=[];
	for (i=0; i<WL.length; i++){
		if(WL[i]=="-"){
			indices.push(i+1);
		}
	}		
WL="Win"+","+WL.substring(indices[0]-3, indices[0]+2);
}

else{
WL="NP";
}

return WL;
}












