var win = Ti.UI.currentWindow;

// Can't find a way to gain access to variables from within an .html webview. Doing it this way for now - but is sloppy. I'm sure there's a smarter/cleaner way. 

/*
Titanium.Yahoo.yql('select * from html where url=\"' + win.theUrl + '\" and xpath=\'//div[@class=\"Center\"]\'', function(e) {
	
	data = eval(e.data);
	Titanium.API.log('hello!');
	Titanium.API.log(data);
});	
*/
	
	var webview = Ti.UI.createWebView({
		scalePageToFit : true,
		url : 'http://www.mickschroeder.com/pharmacy/parse/parse.php?Link=' + win.theUrl
	});
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
	// Add the webview (the original webpage article), and animate the page into view.
	win.add(webview);
//	win.animate( { view : webview, transition : Ti.UI.iPhone.AnimationStyle.FLIP_FROM_LEFT } );
	

