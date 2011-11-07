/*!
 * RxShortages
 * http://mickschroeder.com/rxshortages
 *
 * Copyright 2011, Michael Schroeder
 * License: GPL Version 3 or later
 * http://www.gnu.org/licenses/gpl.html
 */

//Ti.UI.currentWindow.barColor = '#000000';
//Ti.UI.currentWindow.backgroundColor  = '#dedede';

var win = Ti.UI.currentWindow;

if (Titanium.Platform.name === 'android') { Ti.App.fireEvent("show_ads"); }


var data = [
    { title : 'Current Shortages', head: 'ASHP - Current', hasChild:true, path : '../js/getFeed.js', header:'ASHP Reported Drug Shortages'},
	{ title : 'Resolved Shortages', head: 'ASHP - Resolved', hasChild:true, path : '../js/getFeed.js'},
	{ title : 'Unavailable Drugs', head: 'ASHP - Unavailable', hasChild:true, path : '../js/getFeed.js'},
	{ title : 'Current Drug Shortages', head: 'FDA - Current', hasChild:true, path : '../js/getFDA.js', header:'FDA Reported Drug Shortages'},
	{ title : 'Resolved Drug Shortages', head: 'FDA - Resolved', hasChild:true, path : '../js/getFDA.js'},
	{ title : 'Drugs to be Discontinued', head: 'FDA - Discontinued', hasChild:true, path : '../js/getFDA.js'},
];

// Create table and fill it with list
var tableView = Titanium.UI.createTableView({ 
	data:data, 
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
	font : {fontSize : 15, fontWeight: 'bold'},
}); 
Titanium.UI.currentWindow.add(tableView);

// When item is clicked on, create new window.
tableView.addEventListener('click', function(e) {

	// If a path exists...	
	if ( e.rowData.path ) {
		var newWindow = Titanium.UI.createWindow({
			url : e.rowData.path,
			title : e.rowData.title,
			barColor:'#336699',
			backButtonTitle : 'Back',
	});
	
		Ti.App.Properties.setString('websiteName', e.rowData.title); 

		Titanium.UI.currentTab.open( newWindow, { animated: true } );
	}
	
});


