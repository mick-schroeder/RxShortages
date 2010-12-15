// Displays a list of the recent articles 
var win = Ti.UI.currentWindow,
	query,
	siteUrl;

if(Ti.Network.online){
// Add loading icons. Note - needs to be removed after data is loaded, with loadingIcon.hide().
Ti.include('loading.js');

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
		search : search,
		filterAttribute : 'theTitle'
			});
	// For each item from the total number of postings returned from the query...
	for ( var i = 0; i < data.item.length; i++ ) {
		newRow = Ti.UI.createTableViewRow({
			path : 'articleFDA.js', 
			url : data.item[i].link,
			desc : data.item[i].description,
		    hasChild : true,
			theTitle : data.item[i].title
		});
	
		// Need label in order to change the font size. (sucks)
		var articleTitleLabel = Ti.UI.createLabel({
			text : data.item[i].title,
			left : 10,
			right : 30,
			font : {fontSize : 15, fontWeight: 'bold'}
		});
		
		newRow.className = 'drug_row';
		newRow.add(articleTitleLabel);
		tableView.appendRow(newRow);
		
	} // end YQL
		
	// Populate a tableview with the titles
	Ti.UI.currentWindow.add(tableView);	
	
	// Data has been loaded/added, so remove the loading icon.
	loadingIcon.hide();
	
	// When a title is clicked, open a new window and pass the details of the selected posting.
	tableView.addEventListener('click', function(e) {
		if ( e.rowData.path ) {
			var newWin = Ti.UI.createWindow({
				url : e.rowData.path,
				title : 'RxShortages',
				barColor : Ti.UI.currentWindow.barColor
			});
						
			// Add variables for the description and the url.
			newWin.desc = e.rowData.desc;
			newWin.theUrl = e.rowData.url;
			newWin.theTitle = e.rowData.theTitle;
		}

		Ti.UI.currentTab.open( newWin, { animated : true } );
		
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