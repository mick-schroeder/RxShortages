/*!
 * RxShortages
 * http://mickschroeder.com/rxshortages
 *
 * Copyright 2011, Michael Schroeder
 * License: GPL Version 3 or later
 * http://www.gnu.org/licenses/gpl.html
 */

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
    transition: Ti.UI.iPhone.AnimationStyle.CURL_UP
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

// iAds
    if (Titanium.Platform.name == 'iPhone OS') {
    	if (parseFloat(Titanium.Platform.version) >= 3.2){
	
        function display_Ad_iPhone() {
            if (adwin) {
				Ti.API.info("Closed");
                
                adwin.remove(iads);
                adwin.close();
            }
            var adwin = Titanium.UI.createWindow({
                width: '320',
                height: '48',
                bottom: 49
            });

            var iads = Ti.UI.iOS.createAdView({
               	 width: '320',
	                height: '48',
                zIndex: 1,
                bottom: 0
            });

            iads.addEventListener('load', function () {
                Ti.API.info("LOADED");
            });

            iads.addEventListener('error', function () {
                Ti.API.info("ERROR LOADING iAd");
            });

            adwin.add(iads);
            adwin.open();

        }
		display_Ad_iPhone();
    } 
}

	
	if (Titanium.Platform.name == 'android') {
        function display_Ad_Android() {
            Ti.API.info("ADMOB" + numLoads);
            var numLoads = 0;
            if (adWebView) {
                adwin.remove(adWebView);
                adwin.close();
            }
            var adwin = Titanium.UI.createWindow({
                width: 'auto',
                height: 48,
                backgroundColor: '#000',
                bottom: 0,
            });

            //var adUrl = "http://mickschroeder.com/pharmacy/parse/admob";
            var adUrl = "admob.html";

            var adWebView = Ti.UI.createWebView({
                url: adUrl,
                height: 48,
                zIndex: 1,
                bottom: 0,
                left: 0,
                right: 0
            });

            adwin.add(adWebView);
            adwin.open();
       
			adWebView.addEventListener('load', function (evt) {
                numLoads++;
                if (numLoads > 1) {
                    var url = evt.url.split('market://').join('http://');
                    Ti.API.info("clicked ad " + url);
                    //launch ad url in new browser window.
                    display_Ad_Android();
                    Ti.Platform.openURL(url);
                    //load a new ad.
                }
            });
        }
        Titanium.App.addEventListener('show_ads', function (e) {
			if (Ti.Network.online) {
				Ti.API.info("IN SHOW ADMOB");
				display_Ad_Android();
			}
        });

	}


  
    //if (Titanium.Platform.name === 'android') { Ti.App.fireEvent("show_ads"); }
