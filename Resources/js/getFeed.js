// Displays a list of the recent articles 
var win = Ti.UI.currentWindow,
	data, newRow, query, siteUrl;
win.backgroundColor = '#fff';




// Create search bar
var search = Titanium.UI.createSearchBar({
	showCancel: true
});

// Create Tableview
var tableView = Ti.UI.createTableView({
	search: search,
	filterAttribute: 'theTitle'
});

var indWin = null;
var actInd = null;
function showIndicator() {
  indWin = Titanium.UI.createWindow({ height:150, width:150 });
  var indView = Titanium.UI.createView({ height:150, width:150, backgroundColor:'#000', borderRadius:10, opacity:0.9 });
  actInd = Titanium.UI.createActivityIndicator({ style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG, height:30, width:30 });
  indWin.add(indView);
  indWin.add(actInd);
  indWin.open();
  actInd.show();
};

function hideIndicator() {
  actInd.hide();
  indWin.close({opacity:0,duration:200});
};

showIndicator();

if (Ti.Network.online) {

	// Choose the correct feed
	if (Ti.App.Properties.getString('websiteName') == 'Current Shortages') {
		siteUrl = "http://www.ashp.org/rss/shortages/";
	} else if (Ti.App.Properties.getString('websiteName') == 'Resolved Shortages') {
		siteUrl = "http://www.ashp.org/rss/resolved/";
	} else if (Ti.App.Properties.getString('websiteName') == 'Unavailable Drugs') {
		siteUrl = "http://www.ashp.org/rss/notavailable/";
	}

	// YQL query to get feed. 
	query = "Select link, title from rss where url='" + siteUrl + "'";

	//YQL Feed


	function setTableData() {
		Ti.Yahoo.yql(query, function (e) {
			data = e.data;
			var tableData = [];

			// For each item from the total number of postings returned from the query...
			//for (var i = 0; i < data.item.length; i++)
			for (var i = 0, j = data.item.length; i < j; i++) {
				newRow = Ti.UI.createTableViewRow({
					theTitle: data.item[i].title,
					path: 'article.js',
					url: data.item[i].link,
					hasChild: true,
					className: 'drug_row'
				});
				// Need label in order to change the font size.
				var articleTitleLabel = Ti.UI.createLabel({
					text: data.item[i].title,
					left: 10,
					right: 30,
					font: {
						fontSize: 15,
						fontWeight: 'bold'
					},

				});
				newRow.add(articleTitleLabel);
				tableData.push(newRow);
			} // end YQL
			tableView.setData(tableData);
		});
	}
	setTableData();
	// Populate a tableview with the titles
	Ti.UI.currentWindow.add(tableView);

	// Data has been loaded/added, so remove the loading icon.
	hideIndicator();

	// When a title is clicked, open a new window and pass the details of the selected posting.
	tableView.addEventListener('click', function (e) {
		if (e.rowData.path) {
			var newWin = Ti.UI.createWindow({
				url: e.rowData.path,
				//title : e.rowData.theTitle,
				barColor: Ti.UI.currentWindow.barColor
			});

			// Add variables for the description and the url.
			newWin.desc = e.rowData.desc;
			newWin.theUrl = e.rowData.url;
		}

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
		showIndicator();
		tableView.setData(null);
		setTableData();
		hideIndicator();
	});

} else {
	var alertDialog = Titanium.UI.createAlertDialog({
		title: 'CONNECTION REQUIRED!',
		message: 'Your device is not online.',
		buttonNames: ['OK']
	});
	alertDialog.show();
}