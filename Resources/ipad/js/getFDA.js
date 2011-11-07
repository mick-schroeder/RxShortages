/*!
 * RxShortages
 * http://mickschroeder.com/rxshortages
 *
 * Copyright 2011, Michael Schroeder
 * License: GPL Version 3 or later
 * http://www.gnu.org/licenses/gpl.html
 */

//
// Show Feed
//

// Set properties
var win = Ti.UI.currentWindow;
win.backgroundColor = '#fff';

// Set variables
var data, newRow, query, siteUrl, yqlMatches;


// Create search bar
var search = Titanium.UI.createSearchBar({
	showCancel:true,
	height:43,
	top:0,
});

// Create Tableview
var tableView = Ti.UI.createTableView({
	search: search,
	filterAttribute: 'theTitle'
});

// Populate a tableview with the titles
Ti.UI.currentWindow.add(tableView);

// Refresh buttons
if (Ti.Platform.name === 'iPhone OS') {
	var refresh = Titanium.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.REFRESH
	});
		win.rightNavButton = refresh;

	refresh.addEventListener('click', function () {
		Ti.App.fireEvent("show_indicator");
		tableView.setData(null);
		setTableData();
	});
} 
else if (Titanium.Platform.name === 'android')
{
var activity = Ti.Android.currentActivity;
activity.onCreateOptionsMenu = function(e) {
    var menu = e.menu;
    var menuItem = menu.add({ title: "Refresh" });
    menuItem.addEventListener("click", function(e) {
		Ti.App.fireEvent("show_indicator");
		tableView.setData(null);
		setTableData();
		});    
};
}


function setTableData() {

	// YQL query to get feed.
	YQLMatches = Ti.App.Properties.getString('websiteName');

	siteUrl = "www.fda.gov/downloads/Drugs/DrugSafety/DrugShortages/UCM163172.xml";
		
	query = "Select title, description, link from rss where url='" + siteUrl + "' and title MATCHES '.*"+ YQLMatches +".*'  | unique(field='link') | sort(field='title')";

	Ti.Yahoo.yql(query, function (e) {
		data = e.data;
		
		//Ti.API.info(data);
		//Ti.API.info(data.item.length);

		// if (data === null)
		// {
			// Ti.App.fireEvent("hide_indicator");
			// Titanium.UI.createAlertDialog({
				// title: 'ERROR',
				// message: 'No data could be retrieved. Please Check your internet connection.' }).show();
				// return;
			// }
		if (data === null) {
					Ti.API.info('data.item.length == null');

					newRow = Ti.UI.createTableViewRow({
						hasChild: false,
					});
					
					// Label
					var articleTitleLabel = Ti.UI.createLabel({
						text: 'Nothing to report',
						left: 10,
						right: 30,
						color: '#000',
						font: {
							fontSize: '15dp',
							fontWeight: 'bold'
						}
					});
					newRow.add(articleTitleLabel);
					tableView.appendRow(newRow);
					Ti.App.fireEvent("hide_indicator");					

		}
		
		else if (data.item.length == null) {
		//Remove titles
					data.item.title = data.item.title.replace("Current Drug Shortages: ", "");
					data.item.title = data.item.title.replace("Resolved Drug Shortages: ", "");
					data.item.title = data.item.title.replace("Drugs to be Discontinued: ", "");
					data.item.title = data.item.title.replace("(updated)", "");

					newRow = Ti.UI.createTableViewRow({
						theTitle: data.item.title,
						pubDate: data.item.pubDate,
						desc : data.item.description,
						url: data.item.link,
						hasChild: true,
						className: 'FDA_row'
					});
					// Label
					var articleTitleLabel = Ti.UI.createLabel({
						text: data.item.title,
						left: 10,
						right: 30,
						color: '#000',
						font: {
							fontSize: '15dp',
							fontWeight: 'bold'
						}
					});
					newRow.add(articleTitleLabel);
					tableView.appendRow(newRow);
					Ti.App.fireEvent("hide_indicator");	
		}
			
	 		else {
				var tableData = [];
				// For each item from the total number of postings returned from the query...
				for (var i = 0, j = data.item.length; i < j; i++) {
					
					//Remove titles
					data.item[i].title = data.item[i].title.replace("Current Drug Shortages: ", "");
					data.item[i].title = data.item[i].title.replace("Resolved Drug Shortages: ", "");
					data.item[i].title = data.item[i].title.replace("Drugs to be Discontinued: ", "");
					data.item[i].title = data.item[i].title.replace("(updated)", "");

					newRow = Ti.UI.createTableViewRow({
						theTitle: data.item[i].title,
						pubDate: data.item[i].pubDate,
						desc : data.item[i].description,
						url: data.item[i].link,
						hasChild: true,
						className: 'FDA_row'
					});
					// Label
					var articleTitleLabel = Ti.UI.createLabel({
						text: data.item[i].title,
						left: 10,
						right: 30,
						color: '#000',
						font: {
							fontSize: '15dp',
							fontWeight: 'bold'
						}
					});
					newRow.add(articleTitleLabel);
					tableData.push(newRow);
					} // end YQL
					tableView.setData(tableData);
					

					// Data has been loaded/added, so remove the loading icon.
					Ti.App.fireEvent("hide_indicator");					
				}
			});
		}
		// When a title is clicked, open a new window and pass the details of the selected posting.
	tableView.addEventListener('click', function (e) {

		Ti.App.fireEvent('detailLoadFDA', {theUrl:e.rowData.url,desc:e.rowData.desc,theTitle:e.rowData.theTitle});
	
	});


		// Make sure device is connection to the internet

		if (Ti.Network.online) {

			// Show loading indicator 
			Ti.App.fireEvent("show_indicator");

			// Load table
			setTableData();

		} 

		// If not connected, alert the user
		else {
			var alertDialog = Titanium.UI.createAlertDialog({
				title: 'Internet Connection Required',
				message: 'Your device is not online',
				buttonNames: ['OK']
			});
			alertDialog.show();
		}
