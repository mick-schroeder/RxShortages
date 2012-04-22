/*!
 * RxShortages
 * http://mickschroeder.com/rxshortages
 *
 * Copyright 2011, Michael Schroeder
 * License: GPL Version 3 or later
 * http://www.gnu.org/licenses/gpl.html
 */

//
// Trends view
//

// Set properties
var win = Ti.UI.currentWindow;
win.backgroundColor = '#fff';



// Set variables
var data, newRow, siteUrl;

var timeURL = 'day';


// Create Tableview
var tableView = Ti.UI.createTableView({
    top: 44,
});

// Populate a tableview with the titles
Ti.UI.currentWindow.add(tableView);

// Refresh buttons
var refresh = Titanium.UI.createButton({
	systemButton: Titanium.UI.iPhone.SystemButton.REFRESH
});

	win.rightNavButton = refresh;
	
	
	
	refresh.addEventListener('click', function () {
		Ti.App.fireEvent("show_indicator");
		tableView.setData(null);
		setTableData();
		//Ti.App.fireEvent("hide_indicator");
	});


//YQL Feed


function setTableData() {

    var getJSON = Ti.Network.createHTTPClient();
    var tableData = [];
    getJSON.open('GET', 'http://mickschroeder.com/pharmacy/parse/trends/example.filter.php?t=' + timeURL);
    getJSON.send();
    getJSON.onload = function () {
        var data = JSON.parse(this.responseText);

        // For each item from the total number of postings returned from the query...
        for (var i = 0, j = data.length; i < j; i++) {
            newRow = Ti.UI.createTableViewRow({
                theTitle: data[i][1],
                path: 'article.js',
                url: data[i][0],
                hasChild: true,
                height: Ti.UI.FILL,
                className: 'trend_row'
            });
            // Need label in order to change the font size.
            var articleTitleLabel = Ti.UI.createLabel({
                text: i + 1 + '. ' + data[i][1],
                left: 10,
                right: 30,
				color: '#000',
				height: Ti.UI.FILL,
                font: {
                    fontSize: '15dp',
                    fontWeight: 'bold'
                }

            });

            newRow.add(articleTitleLabel);
            tableData.push(newRow);
        }
        tableView.setData(tableData);
		Ti.App.fireEvent("hide_indicator");
    }
}

// When a title is clicked, open a fire event and pass the details of the selected posting.
tableView.addEventListener('click', function (e) {

	Ti.App.fireEvent('detailLoad', {theUrl:e.rowData.url,pubDate:escape(e.rowData.pubDate)});

});

//iPhone Tab Bar
if (Ti.Platform.name == 'iPhone OS') {
	
	var flexSpace = Titanium.UI.createButton({
	    systemButton: Titanium.UI.iPhone.SystemButton.FLEXIBLE_SPACE
	});
	var bb2 = Titanium.UI.createTabbedBar({
	    labels: ['Day', 'Week', 'Month', 'Quarter'],
	    //backgroundColor:'maroon'
	    index: 1
	});

	var toolbar2 = Titanium.UI.createToolbar({
	    items: [flexSpace, bb2, flexSpace],
	    top: 0,
	    borderTop: false,
	    borderBottom: true,
	    //barColor:'#336699'
	});

	bb2.addEventListener('click', function (e) {
	    if (e.index === 0) {
	        timeURL = 'day';
	    } else if (e.index === 1) {
	        timeURL = 'week';
	    } else if (e.index === 2) {
	        timeURL = 'month';
	    } else if (e.index === 3) {
	        timeURL = 'quarter';
	    }
	    
	    Ti.App.fireEvent("show_indicator");
	    tableView.setData(null);
	    setTableData();
	});
	
	win.add(toolbar2);
}



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