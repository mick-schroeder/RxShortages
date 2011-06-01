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
	if (Titanium.Platform.name === 'android') { Ti.App.fireEvent("show_ads"); }


if(Ti.Network.online){
// Add loading icons. Note - needs to be removed after data is loaded, with loadingIcon.hide().

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
		bottom: 48,
		filterAttribute : 'theTitle'
			});
	// For each item from the total number of postings returned from the query...
	for ( var i = 0; i < data.item.length; i++ ) {
		newRow = Ti.UI.createTableViewRow({
			path : 'articleFDA.js', 
			url : data.item[i].link,
			desc : data.item[i].description,
		    hasChild : true,
			theTitle : data.item[i].title,
			className : 'fda_row'
			
		});
	
		// Need label in order to change the font size. (sucks)
		var articleTitleLabel = Ti.UI.createLabel({
			text : data.item[i].title,
			left : 10,
			right : 30,
			color: '#000',
			font : {fontSize : 15, fontWeight: 'bold'}
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