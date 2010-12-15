// ADD LOADING ICON
// Is there a better way to add loading icons? Like as an event listener or something?
var loadingIcon = Titanium.UI.createActivityIndicator({
    top : 'auto', 
    height : 50,
    width : 210,
	color : 'black',
	font : {fontFamily:'Helvetica Neue', fontSize:15,fontWeight:'bold'},
	message : 'Loading',
    style : Titanium.UI.iPhone.ActivityIndicatorStyle.DARK
});
loadingIcon.show();
win.add(loadingIcon);