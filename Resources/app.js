// this sets the background color of the master UIView (when there are no windows/tab groups on it)
//Ti.UI.setBackgroundColor('white');


// create tab group
var tabGroup = Ti.UI.createTabGroup();

// Home Tab
var homeWindow = Ti.UI.createWindow({  
    title:'Rx Shortages',
	url : 'main_windows/blogs.js',
	barColor:'#336699'
	});

var homeTab = Ti.UI.createTab({  
    title:'Shortages',
	icon : 'images/home_24.png',
    window:homeWindow
});

// Home Tab
var feedWindow = Ti.UI.createWindow({  
    title:'Shortages Feed',
	url : 'js/feed.js',
	barColor:'#336699'
	});

var feedTab = Ti.UI.createTab({  
    title:'Feed',
	icon : 'images/rss_24.png',
    window:feedWindow
});

// Report Tab
var reportWindow = Ti.UI.createWindow({
	title : "Report Drug Shortage",
	url : 'main_windows/report.js',
	barColor:'#336699'
});

var reportTab = Ti.UI.createTab({
	icon : 'images/phone_24.png',
	title : 'Report',
	window: reportWindow
});

// About Tab
var aboutWindow = Ti.UI.createWindow({
	title : "About",
	url : 'main_windows/about.js',
	barColor:'#336699'
});

var aboutTab = Ti.UI.createTab({
	icon : 'images/info_24.png',
	title : 'About',
	window: aboutWindow
});

// add tabs
tabGroup.addTab(homeTab);
tabGroup.addTab(feedTab);
tabGroup.addTab(reportTab);
tabGroup.addTab(aboutTab);


// open tab group
tabGroup.open({
	transition:Ti.UI.iPhone.AnimationStyle.CURL_UP
});

if(Ti.Network.online){
	
	var adwin = Titanium.UI.createWindow({
		    width: 'auto',
		    height: 'auto',
	        bottom:49
	    });

	var iads = Ti.UI.iOS.createAdView({
	        width: 'auto',
	        height: 'auto',
			zIndex: 2,
	        bottom:0
	    }); 

	    iads.addEventListener('load', function(){
	        Ti.API.info("LOADED");
	    });

	    iads.addEventListener('error', function(){
	        Ti.API.info("ERROR LOADING iAd");
	    }); 

	    adwin.add(iads);
	    adwin.open();
}
