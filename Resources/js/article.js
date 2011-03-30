var win = Ti.UI.currentWindow;
win.backgroundColor = '#ffffff';
	
	var webview = Ti.UI.createWebView({
		scalePageToFit : true,
		bottom: 0,
		url : 'http://mickschroeder.com/pharmacy/parse/parse.php?Link=' + win.theUrl
	});
	
	// Add the webview (the original webpage article), and animate the page into view.
	win.add(webview);
	
	
	if (Titanium.Platform.name == 'iPhone OS')
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
	
	if (Titanium.Platform.name == 'android')
	{
	var activity = Ti.Android.currentActivity;
	activity.onCreateOptionsMenu = function(e) {
	    var menu = e.menu;
	    var menuItem = menu.add({ title: "View Full Article" });
	    //menuItem.setIcon("item1.png");
	    menuItem.addEventListener("click", function(e) {
			Titanium.Platform.openURL(win.theUrl);
	    });
	};
	}
	

