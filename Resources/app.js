/*!
 * RxShortages
 * http://mickschroeder.com/rxshortages
 *
 * Copyright 2011, Michael Schroeder
 * License: GPL Version 3 or later
 * http://www.gnu.org/licenses/gpl.html
 */

if (Ti.Platform.osname === 'ipad') {
Ti.include('ipad/app.js');
}

else {


// sets the background color
Ti.UI.setBackgroundColor('#fff');
var win = Ti.UI.currentWindow;

// create tab group
var tabGroup = Ti.UI.createTabGroup(

);

// Home Tab
var homeWindow = Ti.UI.createWindow({
    title: 'RxShortages',
    url: 'main_windows/main_menu.js',
    barColor: '#336699'
});

var homeTab = Ti.UI.createTab({
    title: 'Shortages',
    icon: 'images/home_24.png',
    window: homeWindow
});

// Trend Tab
var trendWindow = Ti.UI.createWindow({
    title: 'Trends',
    url: 'js/trends.js',
    barColor: '#336699'
});

var trendTab = Ti.UI.createTab({
    title: 'Trends',
    icon: 'images/arrow_24.png',
    window: trendWindow
});

// Shortage Feed Tab
var feedWindow = Ti.UI.createWindow({
    title: 'Shortages Feed',
    url: 'js/feed.js',
    barColor: '#336699'
});

var feedTab = Ti.UI.createTab({
    title: 'Feed',
    icon: 'images/rss_24.png',
    window: feedWindow
});

// Report Tab
var reportWindow = Ti.UI.createWindow({
    title: "Report Drug Shortage",
    url: 'main_windows/report.js',
    barColor: '#336699'
});

var reportTab = Ti.UI.createTab({
    icon: 'images/phone_24.png',
    title: 'Report',
    window: reportWindow
});

// About Tab
var aboutWindow = Ti.UI.createWindow({
    title: "About",
    url: 'main_windows/about.js',
    barColor: '#336699'
});

var aboutTab = Ti.UI.createTab({
    icon: 'images/info_24.png',
    title: 'About',
    window: aboutWindow
});

// add tabs
tabGroup.addTab(homeTab);
tabGroup.addTab(feedTab);
tabGroup.addTab(trendTab);
tabGroup.addTab(reportTab);
tabGroup.addTab(aboutTab);


// open tab group
tabGroup.open({
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

}
