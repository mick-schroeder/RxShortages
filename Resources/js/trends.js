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

//Show ads
if (Titanium.Platform.name === 'android') { Ti.App.fireEvent("show_ads"); }


// Set variables
var data, newRow, siteUrl;

var timeURL = 'day';


// Create Tableview
var tableView = Ti.UI.createTableView({
    top: 44,
	bottom: 48
});

// Populate a tableview with the titles
Ti.UI.currentWindow.add(tableView);

// Refresh buttons
if (Ti.Platform.name === 'iPhone OS') {
	win.rightNavButton = refresh;
	var refresh = Titanium.UI.createButton({
		systemButton: Titanium.UI.iPhone.SystemButton.REFRESH
	});
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
                className: 'trend_row'
            });
            // Need label in order to change the font size.
            var articleTitleLabel = Ti.UI.createLabel({
                text: i + 1 + '. ' + data[i][1],
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
        }
        tableView.setData(tableData);
		Ti.App.fireEvent("hide_indicator");
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
else {
	var spacer = Math.round(Ti.Platform.displayCaps.platformWidth*0.25);
	var width = spacer-4;
	var height = 36;

	// TAB BAR
	var tabBar = Ti.UI.createView({
	    width:Ti.Platform.displayCaps.platformWidth,
	    height:40,
	    left:0,
	    top:0,
	    backgroundColor:'#000'
	});
	win.add(tabBar);
	// TAB 1
	var tab1 = Ti.UI.createView({
	    width:width,
	    height:height,
	    left:2,
	    top:2,
	    backgroundColor:'#333',
	    borderRadius:2
	});
	var tab1Label = Ti.UI.createLabel({
	    text:'Day',
	    color:'#FFF'
	});
	tab1.add(tab1Label);
	win.add(tab1);
	// TAB 2
	var tab2 = Ti.UI.createView({
	    width:width,
	    height:height,
	    left:spacer,
	    top:2,
	    backgroundColor:'#000'
	});
	var tab2Label = Ti.UI.createLabel({
	    text:'Week',
	    color:'#c0c0c0'
	});
	tab2.add(tab2Label);
	win.add(tab2);
	// TAB 3
	var tab3 = Ti.UI.createView({
	    width:width,
	    height:height,
	    left:(spacer*2),
	    top:2,
	    backgroundColor:'#000'
	});
	var tab3Label = Ti.UI.createLabel({
	    text:'Month',
	    color:'#c0c0c0'
	});
	tab3.add(tab3Label);
	win.add(tab3);
	// TAB 4
	var tab4 = Ti.UI.createView({
	    width:width,
	    height:height,
	    left:(spacer*3),
	    top:2,
	    backgroundColor:'#000'
	});
	var tab4Label = Ti.UI.createLabel({
	    text:'Quarter',
	    color:'#c0c0c0'
	});
	tab4.add(tab4Label);
	win.add(tab4);

	var currTab = tab1;

	// ADD EVENT LISTENERS
	tab1.addEventListener('click',function() {
	    currTab.backgroundColor = '#000';
	    currTab.children[0].color = '#c0c0c0';
	    this.backgroundColor = '#333';
	    this.children[0].color = '#FFF';
	    currTab = this;
		timeURL = 'day';
		Ti.App.fireEvent("show_indicator");
		tableView.setData(null);
		setTableData();
			});
	tab2.addEventListener('click',function() {
	    currTab.backgroundColor = '#000';
	    currTab.children[0].color = '#c0c0c0';
	    this.backgroundColor = '#333';
	    this.children[0].color = '#FFF';
	    currTab = this;
		timeURL = 'week';
		Ti.App.fireEvent("show_indicator");
		tableView.setData(null);
		setTableData();
			});
	tab3.addEventListener('click',function() {
	    currTab.backgroundColor = '#000';
	    currTab.children[0].color = '#c0c0c0';
	    this.backgroundColor = '#333';
	    this.children[0].color = '#FFF';
	    currTab = this;
		timeURL = 'month';
		Ti.App.fireEvent("show_indicator");
		tableView.setData(null);
		setTableData();
			});
	tab4.addEventListener('click',function() {
	    currTab.backgroundColor = '#000';
	    currTab.children[0].color = '#c0c0c0';
	    this.backgroundColor = '#333';
	    this.children[0].color = '#FFF';
	    currTab = this;
		timeURL = 'quarter';
		Ti.App.fireEvent("show_indicator");
		tableView.setData(null);
		setTableData();
			});
	
	
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