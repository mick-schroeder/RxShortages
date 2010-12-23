// this sets the background color of the master UIView (when there are no windows/tab groups on it)
Ti.UI.setBackgroundColor('white');


// create tab group
var tabGroup = Ti.UI.createTabGroup();

// Home Tab
var homeWindow = Ti.UI.createWindow({  
    title:'Rx Shortages',
	//tabBarHidden: true, 
	url : 'main_windows/blogs.js',
	barColor:'#336699'
	});

var homeTab = Ti.UI.createTab({  
    title:'Shortages',
	icon : 'images/light_home.png',
    window:homeWindow
});

// Report Tab
var reportWindow = Ti.UI.createWindow({
	title : "Report Drug Shortage",
	url : 'main_windows/report.js',
	barColor:'#336699'
});

var reportTab = Ti.UI.createTab({
	icon : 'images/light_phone.png',
	title : 'Report Shortage',
	window: reportWindow
});

// About Tab
var aboutWindow = Ti.UI.createWindow({
	title : "About",
	url : 'main_windows/about.js',
	barColor:'#336699'
});

var aboutTab = Ti.UI.createTab({
	icon : 'images/light_info.png',
	title : 'About',
	window: aboutWindow
});

// add tabs
tabGroup.addTab(homeTab);
tabGroup.addTab(reportTab);
tabGroup.addTab(aboutTab);

// open tab group
tabGroup.open({
	transition:Ti.UI.iPhone.AnimationStyle.CURL_UP
});
