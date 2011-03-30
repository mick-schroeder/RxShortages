// Reusable Activity/Loading screen for Titanium by bartlewis@gmail.com
var activityScreen = (function() {
	//
	// Private methods and vars
	//

	var isControlsCreated = false;
	var view1, view2, indicator;

	function createControls(){
		if (isControlsCreated) {return;}

		view1 = Ti.UI.createView({
			height:'100%',
			width:'100%',
			backgroundColor:'#000',
			opacity:0.8,
			zIndex:8
		});
		view1.hide();
		Ti.UI.currentWindow.add(view1);

		view2 = Ti.UI.createView({
			height:'100%',
			width:'100%',
			zIndex:9
		});
		view2.hide();
		Ti.UI.currentWindow.add(view2);

		indicator = Titanium.UI.createActivityIndicator({
			style:Titanium.UI.iPhone.ActivityIndicatorStyle.BIG,
			font:{fontFamily:'Arial', fontSize:18, fontWeight:'bold'},
			color:'#fff',
			message:'Loading...',
			height:'100%',
			width:'auto'
		});
		view2.add(indicator);

		isControlsCreated = true;
	}

	//
	// Public methods stored in api
	//

	var api = {};

	api.show = function(message){
		createControls();

		if (message) {indicator.message = message;}
		else {indicator.message = 'Loading...';}

		view1.show();
		view2.show();
		indicator.show();
	};

	api.hide = function(){
		createControls();

		view1.hide();
		view2.hide();
		indicator.hide();
	};

	return api;
}());