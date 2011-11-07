/*!
 * RxShortages
 * http://mickschroeder.com/rxshortages
 *
 * Copyright 2011, Michael Schroeder
 * License: GPL Version 3 or later
 * http://www.gnu.org/licenses/gpl.html
 */

var win = Ti.UI.currentWindow;


var webview = Ti.UI.createWebView({
	scalePageToFit : true,
	html : '<html><head><style type="text/css">* { max-width: 270px; } body { margin-bottom: 50px; padding: 10px; font-family: helvetica neue, helvetica, arial; width: 270px; overflow: hidden; color : #3f3f3f; } h1,h2,h3,h4,h5 { color: black; } img { max-width: 270px; } pre { white-space: pre-wrap; }</style><body><h3>' + win.theTitle + '</h3>' + win.desc  + '</body></html>'
});


if (Titanium.Platform.name == 'android') {

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
    menuItem.addEventListener("click", function(e) {
		Titanium.Platform.openURL(win.theUrl);
    });
};
}


// Add the webview
win.add(webview);

