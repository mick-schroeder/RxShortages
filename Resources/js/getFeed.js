// Displays a list of the recent articles 
var win = Ti.UI.currentWindow,
	query,
	siteUrl;
	win.backgroundColor = '#fff';
	var actInd = Titanium.UI.createActivityIndicator({
	    top : 'auto', 
	    height : 50,
	    width : 210,
		color : 'black',
		font : {fontFamily:'Helvetica Neue', fontSize:15,fontWeight:'bold'},
		message : 'Loading...',
	    style : Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
	});
	win.add(actInd);
	actInd.show();
// Add loading icons. Note - needs to be removed after data is loaded, with loadingIcon.hide().
if(Ti.Network.online){


	
 // YQL query to get feed. 

if (Ti.App.Properties.getString('websiteName') == 'Current Shortages') {
	siteUrl = "http://www.ashp.org/rss/shortages/";
}
else if (Ti.App.Properties.getString('websiteName') == 'Resolved Shortages') {
	siteUrl = "http://www.ashp.org/rss/resolved/";
}
else if (Ti.App.Properties.getString('websiteName') == 'Unavailable Drugs') {
	siteUrl = "http://www.ashp.org/rss/notavailable/";
} 
query = "Select link, title from rss where url='" + siteUrl + "'";

Ti.Yahoo.yql(query, function(e) {		
	var search = Titanium.UI.createSearchBar({
		showCancel:true
	});
	var data = e.data,
		tableView = Ti.UI.createTableView({
		search : search,
		filterAttribute : 'theTitle'		
		}),
		newRow;

	// For each item from the total number of postings returned from the query...
	for ( var i = 0; i < data.item.length; i++ ) {
		newRow = Ti.UI.createTableViewRow({
			path : 'article.js', 
			url : data.item[i].link,
		    hasChild : true,
			theTitle : data.item[i].title,
			className : 'drug_row'
		});		
		// Need label in order to change the font size. (sucks)
		var articleTitleLabel = Ti.UI.createLabel({
			text : data.item[i].title,
			left : 10,
			right : 30,
			font : {fontSize : 15, fontWeight: 'bold'},

		});
		
		newRow.add(articleTitleLabel);
		tableView.appendRow(newRow);		
	} // end YQL
		
	// Populate a tableview with the titles
	Ti.UI.currentWindow.add(tableView);	
	
	// Data has been loaded/added, so remove the loading icon.
	actInd.hide();	
	// When a title is clicked, open a new window and pass the details of the selected posting.
	tableView.addEventListener('click', function(e) {
		if ( e.rowData.path ) {
			var newWin = Ti.UI.createWindow({
				url : e.rowData.path,
				title : e.rowData.theTitle,
				barColor : Ti.UI.currentWindow.barColor
			});
						
			// Add variables for the description and the url.
			newWin.desc = e.rowData.desc;
			newWin.theUrl = e.rowData.url;
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