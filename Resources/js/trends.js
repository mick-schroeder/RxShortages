//
// Show Feed
//

// Set properties
var win = Ti.UI.currentWindow;
win.backgroundColor = '#fff';

// Set variables
var data, newRow, siteUrl;


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

	var getJSON = Ti.Network.createHTTPClient();
			var tableData = [];  
	getJSON.open('GET', 'http://mickschroeder.com/pharmacy/rxshortages/trends/example.filter.php');  
	getJSON.send();  
	getJSON.onload = function(){  
		var data = JSON.parse(this.responseText);  

		// For each item from the total number of postings returned from the query...
			for (var i = 0, j = data.length; i < j; i++) {						
				newRow = Ti.UI.createTableViewRow({
					theTitle: data[i][1],
					path: 'article.js',
					url: data[i][0],
					hasChild: true,
					className: 'drug_row'
				});
				// Need label in order to change the font size.
				var articleTitleLabel = Ti.UI.createLabel({
				text: i+1 +'. '+ data[i][1],
				left: 10,
				right: 30,
				font: {
					fontSize: 15,
					fontWeight: 'bold'
					}

				});
				
				newRow.add(articleTitleLabel);
				tableData.push(newRow);
			}
					tableView.setData(tableData);
				}
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
		
		var flexSpace = Titanium.UI.createButton({
			systemButton:Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
		});
		var bb2 = Titanium.UI.createButtonBar({
			labels:['Day', 'Week', 'Month'],
			//backgroundColor:'maroon'
		});
		
		var toolbar2 = Titanium.UI.createToolbar({
			items:[flexSpace,bb2,flexSpace],
			top:0,
			borderTop:false,
			borderBottom:true,
			//barColor:'#336699'
		});
		
		win.add(toolbar2);
		
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
