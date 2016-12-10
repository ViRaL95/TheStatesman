<?php header('Access-Control-Allow-Origin: *'); ?>
<!DOCTYPE HTML>
<html>
<head>
	<link rel="stylesheet" type="text/css" href="scoreboardv3.css">
</head>	
<body>
<h2 id = "scoreboard_heading">STONY BROOK SEAWOLVES SCOREBOARD</h2>
<p id="NP">NP=Not Played</p>
<div class = "table_wrapper">

		<div id="header">		
				<form id="left">
				<select id="gender">
	                <option value="Men">Men</option>
	                <option value="Women" id="Women">Women</option>
	            </select>
	            </form>

	        	<form id="right">
	            <select id="sport">
					<option value="Baseball">Baseball</option>
					<option value="Basketball">Basketball</option>
					<option value="Lacrosse">Lacrosse</option>
					<option value="Soccer">Soccer</option>
					<option value="Football" id="Football">Football</option>
				</select>
				</form>
  		</div>
		
		<div id="tbody">			
			<table class="table">

			</table>
		</div>
</div>

<script src="jquery-3.1.1.min.js"></script>
<script src="scoreboardv3.js"> </script>
</body>
</html>