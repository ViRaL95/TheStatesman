$(document).ready(function(){
	header("Access-Control-Allow-Origin: *");
	var feed="http://stonybrookathletics.com/calendar.ashx/calendar.rss?sports_id=2";

	$.get(feed, function(data){
		$(data).find("description").each(function(){
			var el=$(this);
			console.log("title : "+el.text());


		});


	});

});