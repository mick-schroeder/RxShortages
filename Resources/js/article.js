var win = Ti.UI.currentWindow;

	
	var webview = Ti.UI.createWebView({
		scalePageToFit : true,
		bottom: 0,
		url : 'http://mickschroeder.com/pharmacy/parse/parse.php?Link=' + win.theUrl
	});
	
	// Add the webview (the original webpage article), and animate the page into view.
	win.add(webview);
	
	/*
	if (Titanium.Platform.name == 'iPhone OS')
	{
	// add button which links to the original article.
	var button = Ti.UI.createButton({
		title:'View Full Article'
	});
	win.setToolbar([button]);

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
	*/
//	win.animate( { view : webview, transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT } );
	
iads = Ti.UI.iOS.createAdView({
    width: 'auto',
    height: 'auto',
    bottom: -100
	});
 
    t1 = Titanium.UI.createAnimation({bottom:0, duration:750});
 
    iads.addEventListener('load', function(){
		webview.bottom = 50;       
 		iads.animate(t1);

    });
 
    Titanium.UI.currentWindow.add(iads);
