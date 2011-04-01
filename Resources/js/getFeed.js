// Displays a list of the recent articles 
var win = Ti.UI.currentWindow;

win.backgroundColor = '#fff';

Ti.include('../js/util.js');

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


if (Ti.Network.online) {

	activityScreen.show();

	// Choose the correct feed
	if (Ti.App.Properties.getString('websiteName') == 'Current Shortages') {
		siteUrl = "http://www.ashp.org/rss/shortages/";
	} else if (Ti.App.Properties.getString('websiteName') == 'Resolved Shortages') {
		siteUrl = "http://www.ashp.org/rss/resolved/";
	} else if (Ti.App.Properties.getString('websiteName') == 'Unavailable Drugs') {
		siteUrl = "http://www.ashp.org/rss/notavailable/";
	}

	// YQL query to get feed. 
	query = "Select link, pubDate, title from rss where url='" + siteUrl + "'";

	//YQL Feed


	function setTableData() {
		Ti.Yahoo.yql(query, function (e) {
			data = e.data;
				if (data == null)
					{
						activityScreen.hide();
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
					theTitle: data.item[i].title,
					pubDate: data.item[i].pubDate,
					url: data.item[i].link,
					hasChild: true,
					className: 'drug_row'
				});
				// Need label in order to change the font size.
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
	setTableData();
	// Populate a tableview with the titles
	Ti.UI.currentWindow.add(tableView);

	// Data has been loaded/added, so remove the loading icon.
	activityScreen.hide();

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

	var refresh = Titanium.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.REFRESH
	});

	if (Ti.Platform.name == 'iPhone OS') {
		win.rightNavButton = refresh;
	} else {

	}

	refresh.addEventListener('click', function () {
		Ti.API.log('refreshing');
		activityScreen.show('Refreshing...');
		tableView.setData(null);
		setTableData();
		activityScreen.hide();
	});

} else {
	var alertDialog = Titanium.UI.createAlertDialog({
		title: 'CONNECTION REQUIRED!',
		message: 'Your device is not online.',
		buttonNames: ['OK']
	});
	alertDialog.show();
}