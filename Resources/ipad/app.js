SplitViewNav = {};

// WINDOWS
SplitViewNav.masterWindow = Ti.UI.createWindow({title:'Navigation',backgroundColor:'#e1e4e9'});
/* SplitViewNav.masterWindow.add(navGroup); */
SplitViewNav.detailWindow = Ti.UI.createWindow({title:'RxShortages'});


// MASTER NAV GROUP
SplitViewNav.masterNav = Ti.UI.iPhone.createNavigationGroup({
	window:SplitViewNav.masterWindow
});

// DETAIL NAV GROUP
SplitViewNav.detailNav = Ti.UI.iPhone.createNavigationGroup({
	window:SplitViewNav.detailWindow
});

// SPLIT VIEW
SplitViewNav.splitView = Titanium.UI.iPad.createSplitWindow({
	masterView:SplitViewNav.masterNav,
	detailView:SplitViewNav.detailNav,
	showMasterInPortrait:true
});

// DETAIL VIEW WEBVIEW
SplitViewNav.webView = Ti.UI.createWebView({
	url: 'ipad/index.html',
	scalePageToFit : false,
	
	});

SplitViewNav.detailWindow.add(SplitViewNav.webView);

Ti.App.addEventListener('detailLoad', function(data) 
{ 
    SplitViewNav.webView.url = 'http://mickschroeder.com/pharmacy/parse/parse.php?Link=' + data.theUrl + '&pubDate=' + data.pubDate;
	SplitViewNav.theUrl = data.theUrl;
});

Ti.App.addEventListener('detailLoadFDA', function(data) 
{
    SplitViewNav.theUrl = data.theUrl; 
	SplitViewNav.webView.html = '<html><head><style type="text/css">* body { padding: 10px; font-family: helvetica neue, helvetica, arial; overflow: hidden; color : #3f3f3f; } h1,h2,h3,h4,h5 { color: black; } img { max-width: 270px; } pre { white-space: pre-wrap; }</style><body><h3>' + data.theTitle + '</h3>' + data.desc  + '</body></html>';
});
 
var buttonBar = Titanium.UI.createButtonBar({
    labels:['Refresh', 'Full View'],
	backgroundColor:'#7f848a'
});
 
SplitViewNav.detailWindow.setRightNavButton(buttonBar);
 
buttonBar.addEventListener('click', function(e){
 
    //refresh button
    if(e.index == 0){
        SplitViewNav.webView.reload();

    //load in safari
    }else if(e.index == 1){
		Titanium.Platform.openURL(SplitViewNav.theUrl);
    }
 
});

var data = [
    { title : 'Current Shortages', hasChild:true, path : './ipad/js/getFeed.js', header:'ASHP Reported Drug Shortages'},
	{ title : 'Resolved Shortages', hasChild:true, path : './ipad/js/getFeed.js'},
	{ title : 'Unavailable Drugs', hasChild:true, path : './ipad/js/getFeed.js'},
	
	{ title : 'Current Drug Shortages', head: 'FDA: Current', hasChild:true, path : './ipad/js/getFDA.js', header:'FDA Reported Drug Shortages'},
	{ title : 'Resolved Drug Shortages', head: 'FDA: Resolved', hasChild:true, path : './ipad/js/getFDA.js'},
	{ title : 'Drugs to be Discontinued', head: 'FDA: Discontinued', hasChild:true, path : './ipad/js/getFDA.js'},
	
	{ title : 'Shortages Feed', hasChild:true, path : './ipad/js/feed.js', header:'Other'},
	{ title : 'Trends', hasChild:true, path : './ipad/js/trends.js'},
	{ title : 'Report Shortages', hasChild:true, path : './ipad/main_windows/report.js', header:'Other Views'},
	{ title : 'About', hasChild:true, path : './ipad/main_windows/about.js'},
];

// Create table and fill it with list
SplitViewNav.tableView = Titanium.UI.createTableView({ 
	data:data, 
	style:Titanium.UI.iPhone.TableViewStyle.GROUPED,
	font : {fontSize : 15, fontWeight: 'bold'},
});

SplitViewNav.masterWindow.add(SplitViewNav.tableView);

// When item is clicked on, create new window.
SplitViewNav.tableView.addEventListener('click', function(e) {
	
		Ti.App.Properties.setString('websiteName', e.rowData.title); 		
		var w = Ti.UI.createWindow({
			url:e.rowData.path,
			title:e.rowData.title,
			_parent: Titanium.UI.currentWindow,
			_navGroup : SplitViewNav.masterNav,
			_rootWindow : SplitViewNav.masterWindow
			});
		SplitViewNav.masterNav.open(w,{animated:true});
});


//
//  CREATE CUSTOM LOADING INDICATOR
//
var win = null;
var actInd = null;

function showIndicator() {
    if (Ti.Platform.osname != 'android') {
        // window container
        win = Titanium.UI.createWindow({
            height: 150,
            width: 150
        });

        // black view
        var indView = Titanium.UI.createView({
            height: 150,
            width: 150,
            backgroundColor: '#000',
            borderRadius: 10,
            opacity: 0.8
        });
        indView.addEventListener('click', function (e) {
   		Ti.API.info("IN HIDE INDICATOR");
    	hideIndicator();
		});
        win.add(indView);
    }

    // loading indicator
    actInd = Titanium.UI.createActivityIndicator({
        style: Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
        height: 30,
        width: 30,
    });

    if (Ti.Platform.osname != 'android') {
        win.add(actInd);

        // message
        var message = Titanium.UI.createLabel({
            text: 'Loading',
            color: '#fff',
            width: 'auto',
            height: 'auto',
            font: {
                fontSize: 20,
                fontWeight: 'bold'
            },
            bottom: 20
        });
        win.add(message);
        win.open();
    } else {
        actInd.message = "Loading";
    }
    actInd.show();
 
};

function hideIndicator() {
    actInd.hide();
    if (Ti.Platform.osname != 'android') {
        win.close({
            opacity: 0,
            duration: 500
        });
    }
};

//
// Add global event handlers to hide/show custom indicator
//
Titanium.App.addEventListener('show_indicator', function (e) {
    Ti.API.info("IN SHOW INDICATOR");
    showIndicator();

});

Titanium.App.addEventListener('hide_indicator', function (e) {
    Ti.API.info("IN HIDE INDICATOR");
    hideIndicator();
});

// ORIENTATION NAVIGATION BUTTON
SplitViewNav.open = function()
{
	Ti.API.info('in open for split view nav')
	SplitViewNav.splitView.open();	
};

SplitViewNav.splitView.addEventListener('visible', function(e) {
	Ti.API.log('View: '+e.view);
	if (e.view == 'detail') {
		e.button.title = "Navigation";
		SplitViewNav.detailWindow.leftNavButton = e.button;
		Ti.API.log('Set button');
		SplitViewNav.splitView.setMasterPopupVisible(true);
	}
	else if (e.view == 'master') {
		SplitViewNav.detailWindow.leftNavButton = null;
		Ti.API.log('Removed button');
	}
});


SplitViewNav.splitView.open();