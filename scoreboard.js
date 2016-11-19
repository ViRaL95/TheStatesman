var table=document.getElementById("id_of_table");
function addCellHandlers(){
	//getElementByClassName , get ElementById, and getElementsByTagName could have always been used here 
	var rows=table.getElementsByTagName("thead");
	
		 row=table.rows[0];
		for(j=0; j<3; j++){
			cell=row.cells[j];
			if(cell.innerHTML=="Basketball"){
				cell.onclick=function(){
					var sport="Basketball";
					hideColumns(sport);
				};

			}
			if(cell.innerHTML=="Baseball"){
				cell.onclick=function(){
				var sport="Baseball";
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
	if(sport=="Baseball"){
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
<<<<<<< HEAD
	table.setAttribute("id","hide-1");
=======

>>>>>>> 3ab4c2736ed2692ce50e6b62ac9de9ed4fba8f24
addCellHandlers();	
hideColumns("Basketball");
hideColumns("Football");
};

