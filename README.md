Hey Whatsup This is Varun from The Statesman Team! Just wanted to give whoever may want to understand how this table was built, or use this table to retrieve information for their own site in the future some information on how this project was built. 
Several Cases were considered in this project:
1) Stony Brook University does have a women's football team. Thefore the selector's option value's disabled attribute must be set to true for football when the Women Select is selected, and the Women's disabled attribute should be set to true when the Football select is selected.
2)Everytime a select option is selected all the elements in the table are deleted and the values from the RSS feed are loaded properly into the table depending on the sport selected. 
3)We also had to consider the number of days back that we could allow to show games that have already happened. 30 days seemed like a suitable number of days. This can be seen in the setDateAndTime function. 
4) In order to retrieve the information a GET request was sent to the resepective RSS Feed. The GET request took place in the function PopulateTable(sport, gender), which populated the table depending on the sport and gender selected. 

The RSS Feed used can be found at the below link

http://stonybrookathletics.com/calendar.ashx/calendar.rss?sports_id=1
