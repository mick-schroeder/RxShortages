/*
 * This page lists all the Tuts sites. 
*/
//Ti.UI.currentWindow.barColor = '#000000';
Ti.UI.currentWindow.barColor  = '#dedede';

// Rows for each of the Tuts sites. Also includes "col" property, which references that site's main color (for barcolor).
var data = [
    { title : 'Current Shortages', hasChild:true, path : '../js/getFeed.js', col : '#333', header:'ASHP Reported Drug Shortages'},
	{ title : 'Resolved Shortages', hasChild:true, path : '../js/getFeed.js', col : '#333'},
	{ title : 'Unavailable Drugs', hasChild:true, path : '../js/getFeed.js', col : '#333'},
	{ title : 'Reported Shortages', hasChild:true, path : '../js/getFDA.js', col : '#333', header:'FDA Reported Drug Shortages'}
];

// Create table and fill it with list of Tuts sites
var tableView = Titanium.UI.createTableView({ 
	data:data, 
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED	
}); 
Titanium.UI.currentWindow.add(tableView);

// When item is clicked on, create new window.
tableView.addEventListener('click', function(e) {

	// If a path exists...
	if ( e.rowData.path ) {
		var newWindow = Titanium.UI.createWindow({
			url : e.rowData.path,
			title : e.rowData.title,
			barColor:'#336699'
			
	});
	
		Ti.App.Properties.setString('websiteName', e.rowData.title); 

		Titanium.UI.currentTab.open( newWindow, { animated: true } );
	}
	
});

