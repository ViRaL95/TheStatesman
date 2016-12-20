var selector=document.getElementById("gender");
var sport_select=document.getElementById("sport");
var table=document.getElementsByClassName("table");
table=table[0];
var SeaWolves;
window.onload=function(){
	gender=selector.value;
	sport=sport_select.value;
	populateTable(sport,gender);
}
selector.onchange= function(){
	gender=selector.value;
	sport=sport_select.value;
	changeOptions(gender);
	deleteAllElements();
	populateTable(sport, gender);
	isEmpty();
}	
sport_select.onchange=function(){
	gender=selector.value;
	sport=sport_select.value;
	changeOptions(sport);
	deleteAllElements();
	populateTable(sport, gender);
	isEmpty();
}

function changeOptions(option){

var women_sport = ['Basketball', 'Lacrosse', 'Soccer', 'Softball', 'Volleyball'];
var men_sport = ['Baseball', 'Basketball', 'Football', 'Lacrosse', 'Soccer'];
if(option=="Women"){
	for(i=0; i<=women_sport.length-1; i++){
sport_select.options[i]= new Option(women_sport[i]);
	}	
}

else if(option=="Men"){
	for(i=0; i<=men_sport.length-1; i++){
	sport_select.options[i]=new Option(men_sport[i]);
	}
}

}


function returnSportID() {
gender=selector.value;
sport=sport_select.value;
		if (gender=="Women"){
			switch (sport) {
				case 'Basketball':
					return '12';
					break;
				case 'Lacrosse':
					return '13';
					break;
				case 'Soccer':
					return '14';
					break;
				case 'Softball':
					return '10';
					break;
				case 'Volleyball':
					return '17';
					break;
			}
		}
		if (gender=="Men"){
			switch (sport) {
				case 'Baseball':
					return '1';
					break;
				case 'Basketball':
					return '5';
					break;
				case 'Football':
					return '3';
					break;
				case 'Lacrosse':
					return '6';
					break;
				case 'Soccer':
					return '7';
					break;
			}
		}
	}


//Deletes All Elements From the Table using jquery. Most computationally efficient method
function deleteAllElements(){
$(".table").find("tr:gt(0)").remove();
}

//Populate the table with a given sport and a given gender
function populateTable(sport, gender){
//AJAX
//AJAX
/*
A get request is sent to the given location specified in the feed variable. When the get function retrieves
the information, it is stored in the data variable. The data variable is then split into a variable for each 
item element. The data must then be retrieved from each array element, in order to do this the $(this) function 
retrieves data from each element
*/
url="http://stonybrookathletics.com/calendar.ashx/calendar.rss?sport_id=";
url+=returnSportID();
$.ajax({
type:"GET",
url:url,
success:function(data){
var i=0;
$(data).find("item").each(function(){
	var el=$(this);
	var text=el.text();
if(gender=="Women"){
	if(text.includes(sport) && text.includes(gender)){
		text=text.split("\n");
		date=setDate(text);
		player=playedWho(text);
		home=homeTeam(text);
		WL=getWinOrLoss(text);
		OpponentLogo=getOpponentLogo(text, player);
		SeaWolves=getSeaWolves();
		if(WL=="-"){
		TimeOfGame=getTimeOfGame(text);
		date+="<br>";
		date+=TimeOfGame;
		}
		if(date!="NA" && home!="NA" && TimeOfGame!="NA"){
				i++;
				row=table.getElementsByTagName("tbody")[0].insertRow(-1);			
				row.className="teams";
				cell0=row.insertCell(0);
				cell0.innerHTML=date;
				cell0.className="date";
				cell0.colspan="2";

				cell1=row.insertCell(1);
				cell1.innerHTML=player;
				cell1.className="game";
				cell1.colspan="2";

				cell2=row.insertCell(2);
				cell2.innerHTML=WL;
				cell2.className="score";
				cell2.colspan="2";

			if(home=="home"){
				cell3=row.insertCell(3);
				cell3.appendChild(SeaWolves);
				cell3.className="home";
				cell3.colspan="3";

				cell4=row.insertCell(4);
				cell4.appendChild(OpponentLogo);
				cell4.className="opponent";
				cell4.colspan="3";
			}
			else{
				cell3=row.insertCell(3);
				cell3.appendChild(OpponentLogo);
				cell3.className="opponent";
				cell3.colspan="3";

				cell4=row.insertCell(4);
				cell4.appendChild(SeaWolves);
				cell4.className="home";
				cell4.colspan="3";

			}
		}
	}
}
else{
		if(text.includes(sport)&& !text.includes("Women")){
			text=text.split("\n");
			date=setDate(text);
			player=playedWho(text);
			WL=getWinOrLoss(text);
			OpponentLogo=getOpponentLogo(text, player);
			SeaWolves=getSeaWolves();
			home=homeTeam(text);
			if(WL=="-"){
			TimeOfGame=getTimeOfGame(text);
			date+="<br>";
			date+=TimeOfGame;
			}
			if(date!="NA" && home!="NA"&& TimeOfGame!="NA"){
				i++;
				row=table.getElementsByTagName("tbody")[0].insertRow(-1);
				row.className="teams";

				cell0=row.insertCell(0);
				cell0.innerHTML=date;
				cell0.className="date";
				cell0.colspan="2";

				cell1=row.insertCell(1);
				cell1.innerHTML=player;
				cell1.className="game";
				cell1.colspan="2";

				cell2=row.insertCell(2);
				cell2.innerHTML=WL;
				cell2.className="score";
				cell2.colspan="2";

			if(home=="home"){
				cell3=row.insertCell(3);
				cell3.appendChild(SeaWolves);
				cell3.className="home";
				cell3.colspan="3";

				cell4=row.insertCell(4);
				cell4.appendChild(OpponentLogo);
				cell4.className="opponent";
				cell4.colspan="3";
			}
			else{
				cell3=row.insertCell(3);
				cell3.appendChild(OpponentLogo);
				cell3.className="opponent";
				cell3.colspan="3";

				cell4=row.insertCell(4);
				cell4.appendChild(SeaWolves);
				cell4.className="home";
				cell4.colspan="3";

			}
			}
	}
}
});
},
});
}

function isEmpty(){
	//1 because thead is considered a row 
	if(table.rows.length==1){
		console.log("There is no info in the table");
		tbody=document.getElementById("tbody");
		div=document.createElement("div");
		div.className="stripes";
		tbody.appendChild(div);
	}
	else{
		div=document.getElementsByClassName("stripes");
		table.removeChild(div);
	}
}
function setDate(text){
date=text[6];
date=date.split("-");
month=date[1];
if(date[2].length>2){
	date[2]=date[2].substring(0,2);	
}
day=date[2];
year=date[0];
compare=new Date(year, month, day);
date=month+("/")+day+("/")+year;
var time= new Date();
var timediff=time.getTime()-compare.getTime();
var diffdays=Math.ceil(timediff/(1000*3600*24));
if(diffdays>30|| isNaN(year)||isNaN(day)||isNaN(month)){
	return "NA";
}
else{
return date;
}
}

function homeTeam(text){
text=text[2];
if(text.includes(" vs ")){
	return "home";

}
else if (text.includes(" at ")){
	return "away";
}
else{
	return "NA";
}
}
function getOpponentLogo(text, player){
logo=text[9];
width=60;
height=60;

image=getImage(logo, width, height, player);
return image;
}
function getSeaWolves(){
SeaWolves=document.createElement("img");
SeaWolves.src="http://stonybrookathletics.com/images/logos/site/site.png";
SeaWolves.width=60;
SeaWolves.height=60;
SeaWolves.alt="Stony Brook SeaWolves";

return SeaWolves;
}

function getImage(logo, width, height, player){
image=document.createElement("img");
image.src=logo;
image.width=width;
image.height=height;
image.alt=player;
return image
}
function playedWho(text){
text=text[2]

if(text.includes("[L]")|| text.includes("[W]")){
	player=text.substring(text.search("[L]")+3, text.indexOf('\\'));
	if(player.includes(gender)){
	player=player.replace(gender+"'s", "SBU");
	player=player.replace(sport," ");
	}
	else{
	player=player.replace(sport,"SBU");
	}

	if(player.includes("vs")){
		opponent=player.substring(player.indexOf("vs")+4,player.length);
		player=opponent+" at SBU";

	}

	return player;

}
else{
player=text.substring(0,text.indexOf('\\'));
	if(player.includes(gender)){
	player=player.replace(gender+"'s", "SBU");
	player=player.replace(sport," ");
	}
	else{
	player=player.replace(sport,"SBU");
	}

	if(player.includes("vs")){
		opponent=player.substring(player.indexOf("vs")+3,player.length);
		player=opponent+" at SBU";

	}


	return player;
	}
}


function getWinOrLoss(text){
WL=text[2];


if(WL.includes("[L]")){
indices=[];
	for (i=0; i<WL.length; i++){
		if(WL.charAt(i)=="-"){
			indices.push(i+1);
		}
	}	
WL="L"+","+WL.substring(indices[0]-3, indices[0]+2);
}
else if(WL.includes("[W]")){
indices=[];
	for (i=0; i<WL.length; i++){
		if(WL.charAt(i)=="-"){
			indices.push(i+1);
		}
	}		
WL="W"+","+WL.substring(indices[0]-3, indices[0]+2);
}

else{
WL="-";
}

return WL;
}

function getTimeOfGame(text){
	text=text[6];
	time=text.substring(text.indexOf("T")+1,text.indexOf("T")+6);
	time=time.split(":");
	hours=time[0];
	min=time[1];
	if(hours>12){
		hours=hours%12;
		time=hours+":"+min+" PM";
	}
	else if(hours==12){
	time=hours+":"+min+" PM";
	}
	else{
		time=hours+":"+min+" AM";
	}
	if(isNaN(hours)||isNaN(min)){

		return "NA";
	}
	return time;
}









