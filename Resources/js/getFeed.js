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
var data, newRow, query, siteUrl;

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

// Refresh buttom
var refresh = Titanium.UI.createButton({
	systemButton: Titanium.UI.iPhone.SystemButton.REFRESH
});

if (Ti.Platform.name == 'iPhone OS') {
	win.rightNavButton = refresh;
} 
else {

}

refresh.addEventListener('click', function () {
	Ti.API.log('refreshing');
	Ti.App.fireEvent("show_indicator");
	tableView.setData(null);
	setTableData();
	Ti.App.fireEvent("hide_indicator");
});


// Choose the correct feed
if (Ti.App.Properties.getString('websiteName') == 'Current Shortages') {
	siteUrl = "http://www.ashp.org/rss/shortages/";
} else if (Ti.App.Properties.getString('websiteName') == 'Resolved Shortages') {
	siteUrl = "http://www.ashp.org/rss/resolved/";
} else if (Ti.App.Properties.getString('websiteName') == 'Unavailable Drugs') {
	siteUrl = "http://www.ashp.org/rss/notavailable/";
}


//YQL Feed
function setTableData() {

	// YQL query to get feed. 
	query = "Select link, pubDate, title from rss where url='" + siteUrl + "'";

	Ti.Yahoo.yql(query, function (e) {
		data = e.data;
		if (data == null)
		{
			Ti.App.fireEvent("hide_indicator");
			Titanium.UI.createAlertDialog({
				title: 'Error querying YQL',
				message: 'No data could be retrieved using YQL' }).show();
				return;
			}
			else {
				var tableData = [];

				// For each item from the total number of postings returned from the query...
				for (var i = 0, j = data.item.length; i < j; i++) {
					newRow = Ti.UI.createTableViewRow({
						theTitle: data.item[i].title,
						pubDate: data.item[i].pubDate,
						url: data.item[i].link,
						hasChild: true,
						className: 'drug_row'
					});
					// Label
					var articleTitleLabel = Ti.UI.createLabel({
						text: data.item[i].title,
						left: 10,
						right: 30,
						color: '#000',
						font: {
							fontSize: 15,
							fontWeight: 'bold'
						}
					});
					newRow.add(articleTitleLabel);
					tableData.push(newRow);
					} // end YQL
					tableView.setData(tableData);
				}
			});
		}

		// When a title is clicked, open a new window and pass the details of the selected posting.
		tableView.addEventListener('click', function (e) {
			var newWin = Ti.UI.createWindow({
				url: 'article.js',
				//title : e.rowData.theTitle,
				barColor: Ti.UI.currentWindow.barColor
			});

			// Add variables for the description and the url.
			newWin.theUrl = e.rowData.url;
			newWin.pubDate = escape(e.rowData.pubDate);

			Ti.UI.currentTab.open(newWin, {
				animated: true
			});

		});


		// Make sure device is connection to the internet

		if (Ti.Network.online) {

			// Show loading indicator 
			Ti.App.fireEvent("show_indicator");

			// Load table
			setTableData();

			// Data has been loaded/added, so remove the loading icon.
			Ti.App.fireEvent("hide_indicator");

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
