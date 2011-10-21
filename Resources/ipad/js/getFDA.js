/*!
 * RxShortages
 * http://mickschroeder.com/rxshortages
 *
 * Copyright 2011, Michael Schroeder
 * License: GPL Version 3 or later
 * http://www.gnu.org/licenses/gpl.html
 */

// Displays a list of the recent articles 
var win = Ti.UI.currentWindow,
	query,
	siteUrl;

if(Ti.Network.online){

 // YQL query to get feed. 
siteUrl = "www.fda.gov/downloads/Drugs/DrugSafety/DrugShortages/UCM163172.xml";
query = "Select title, description, link from rss where url='" + siteUrl + "'";

Ti.Yahoo.yql(query, function(e) {		
	var search = Titanium.UI.createSearchBar({
		showCancel:true
	});
	var data = e.data,
		newRow;
	
	var tableView = Ti.UI.createTableView({
		search: search,
		filterAttribute: 'theTitle'
			});
Ti.UI.currentWindow.add(tableView);
	var tableData = [];
	
	// For each item from the total number of postings returned from the query...
	for (var i = 0, j = data.item.length; i < j; i++) {
		
		newRow = Ti.UI.createTableViewRow({
			path : 'articleFDA.js', 
			url : data.item[i].link,
			desc : data.item[i].description,
		    hasChild : true,
			theTitle : data.item[i].title,
			//className : 'fda_row'
		});
	
		// Need label in order to change the font size.
		var articleTitleLabel = Ti.UI.createLabel({
			text : data.item[i].title,
			left : 10,
			right : 30,
			color: '#000',
			font : {fontSize : 15, fontWeight: 'bold'}
		});
		
		newRow.add(articleTitleLabel);
		tableData.push(newRow);
		
	} // end YQL
	
	tableView.setData(tableData);
	
	// Populate a tableview with the titles

	
	// When a title is clicked, open a fire event and pass the details of the selected posting.
	tableView.addEventListener('click', function (e) {

		Ti.App.fireEvent('detailLoadFDA', {theUrl:e.rowData.url,desc:e.rowData.desc,theTitle:e.rowData.theTitle});
	
	});
	
});

}
else {
	var alertDialog = Titanium.UI.createAlertDialog({
      title: 'CONNECTION REQUIRED!',
      message: 'Your device is not online.',
      buttonNames: ['OK']
    });
    alertDialog.show();
}