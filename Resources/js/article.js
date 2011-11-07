/*!
 * RxShortages
 * http://mickschroeder.com/rxshortages
 *
 * Copyright 2011, Michael Schroeder
 * License: GPL Version 3 or later
 * http://www.gnu.org/licenses/gpl.html
 */

var win = Ti.UI.currentWindow;



win.backgroundColor = '#ffffff';


	var webview = Ti.UI.createWebView({
		scalePageToFit : true,
		url : 'http://mickschroeder.com/pharmacy/parse/parse.php?Link=' + win.theUrl + '&pubDate=' + win.pubDate
	});
	    Ti.API.info('http://mickschroeder.com/pharmacy/parse/parse.php?Link=' + win.theUrl + '&pubDate=' + win.pubDate);

	// Add the webview (the original webpage article), and animate the page into view.
	win.add(webview);

	if (Titanium.Platform.name === 'iPhone OS')
	{
	// add button which links to the original article.
	var button = Ti.UI.createButton({
		title:'View Full Article'
	});
	win.rightNavButton = button;

	button.addEventListener('click', function() {
		Titanium.Platform.openURL(win.theUrl);
	});
	}
	
	if (Titanium.Platform.name === 'android')
	{
	var activity = Ti.Android.currentActivity;
	activity.onCreateOptionsMenu = function(e) {
	    var menu = e.menu;
	    var menuItem = menu.add({ title: "View Full Article" });
	    menuItem.addEventListener("click", function(e) {
			Titanium.Platform.openURL(win.theUrl);
	    });    
	};
	}

