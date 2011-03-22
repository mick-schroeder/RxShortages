// Displays a list of the recent articles 
var win = Ti.UI.currentWindow,
	data, flagIcon, newRow, query, siteUrl;
win.backgroundColor = '#fff';

var actInd = Titanium.UI.createActivityIndicator({
	zIndex: 1,
	top: 'auto',
	height: 100,
	width: 210,
	color: 'black',
	font: {
		fontFamily: 'Helvetica Neue',
		fontSize: 15,
		fontWeight: 'bold'
	},
	message: 'Loading...',
	style: Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
});

win.add(actInd);

actInd.show();

// Create Tableview
var tableView = Ti.UI.createTableView({});

if (Ti.Network.online) {



	// YQL query to get feed. 
	query = "select title,link,pubDate from rss where url in (\'http://www.ashp.org/rss/shortages/\',\'http://www.ashp.org/rss/resolved/\',\'http://www.ashp.org/rss/notavailable/\') | sort(field=\"pubDate\", descending=\"true\") | truncate(count=25)";

	//YQL Feed


	function setData() {
		Ti.Yahoo.yql(query, function (e) {
			data = e.data;
			var tableData = [];

			// For each item from the total number of postings returned from the query...
			//for (var i = 0; i < data.item.length; i++)
			for (var i = 0, j = data.item.length; i < j; i++) {
				newRow = Ti.UI.createTableViewRow({
					path: 'article.js',
					url: data.item[i].link,
					hasChild: true,
					theTitle: data.item[i].title,
					className: 'drug_row',
					height: 65,
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
				} else if (data.item[i].link.indexOf('DrugsNoLongerAvailable') != -1) {
					flagIcon = 'red';
				} else if (data.item[i].link.indexOf('CurrentShortages') != -1) {
					flagIcon = 'yellow';

				}


				var flag = Titanium.UI.createImageView({
					image: '../images/' + flagIcon + '.png',
					width: 32,
					height: 32,
					left: 10,
					top: 15
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
					height: 'auto',
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
			} // end YQL
			tableView.setData(tableData);
		});
	}
	
	// Query
	setData();
	
	// Populate a tableview with the titles
	Ti.UI.currentWindow.add(tableView);

	// Data has been loaded/added, so remove the loading icon.
	actInd.hide();
	
	
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
		actInd.show();
		tableView.setData(null);
		setData();
		actInd.hide();
	});

} else {
	var alertDialog = Titanium.UI.createAlertDialog({
		title: 'CONNECTION REQUIRED!',
		message: 'Your device is not online.',
		buttonNames: ['OK']
	});
	alertDialog.show();
}