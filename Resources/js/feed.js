//
// Show Feed
//

// Set properties
var win = Ti.UI.currentWindow;
win.backgroundColor = '#fff';

// Set variables
var data, newRow, query, siteUrl, flagIcon;


// Create Tableview
var tableView = Ti.UI.createTableView({
	 
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


//YQL Feed
function setTableData() {

	// YQL query to get feed. 
	query = "select title,link,pubDate from rss where url in (\'http://www.ashp.org/rss/shortages/\',\'http://www.ashp.org/rss/resolved/\',\'http://www.ashp.org/rss/notavailable/\') | sort(field=\"pubDate\", descending=\"true\") | truncate(count=99)";

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
				//for (var i = 0; i < data.item.length; i++)
				for (var i = 0, j = data.item.length; i < j; i++) {
					newRow = Ti.UI.createTableViewRow({
						url: data.item[i].link,
						pubDate: data.item[i].pubDate,
						hasChild: true,
						className: 'drug_row',
						height: 'auto',
						backgroundGradient: {
							type: 'linear',
							colors: [
							{
								color: '#f8f9fa',
								position: 0.0
							},
							// {color:'#e6e9eb',position:0.50},
							{
								color: '#e6e9eb',
								position: 1.0
							}
							]
						}
					});
					// Need label in order to change the font size. (sucks)
					if (data.item[i].link.indexOf('ResolvedShortages') != -1) {
						flagIcon = 'green';
					} else if (data.item[i].link.indexOf('NotAvailable') != -1) {
						flagIcon = 'red';
					} else if (data.item[i].link.indexOf('Current') != -1) {
						flagIcon = 'yellow';

					}


					var flag = Titanium.UI.createImageView({
						image: '../images/' + flagIcon + '.png',
						width: 32,
						height: 32,
						left: 10,
						top: 15,
						bottom: 10
					});

					var date = Ti.UI.createLabel({
						text: data.item[i].pubDate,
						color: '#444',
						top: 3,
						left: 60,
						height: 20,
						width: 255,
						font: {
							fontWeight: 'normal',
							fontSize: 12
						}
					});
					var title = Ti.UI.createLabel({
						text: data.item[i].title,
						color: '#444',
						top: 20,
						left: 60,
						bottom: 7,
						height: 'auto',
						background: '#000000',
						width: 225,
						font: {
							fontWeight: 'bold',
							fontSize: 15
						}
					});
					newRow.add(flag);

					newRow.add(date);
					newRow.add(title);
					tableData.push(newRow);
				}
				// end YQL
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
