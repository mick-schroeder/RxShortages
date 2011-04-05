
// Displays a list of the recent articles 
var win = Ti.UI.currentWindow,
	data, newRow, siteUrl;
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



// Create Tableview
var tableView = Ti.UI.createTableView({});

if (Ti.Network.online) {

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
					
			// end YQL
			tableView.setData(tableData);
	}
}
	
	// Query
	setTableData();
	
	// Populate a tableview with the titles
	Ti.UI.currentWindow.add(tableView);

	// Data has been loaded/added, so remove the loading icon.
		if(navActInd){
		navActInd.hide();
	}
	Ti.App.fireEvent("hide_indicator");
	
	
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
		
		tableView.setData(null);
		setTableData();
			if(navActInd){
		navActInd.hide();
	}
	Ti.App.fireEvent("hide_indicator");
	});

} else {
	var alertDialog = Titanium.UI.createAlertDialog({
		title: 'CONNECTION REQUIRED!',
		message: 'Your device is not online.',
		buttonNames: ['OK']
	});
	alertDialog.show();
}