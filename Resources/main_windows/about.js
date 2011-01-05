var win = Titanium.UI.currentWindow;
win.backgroundColor = '#dedede';
//win.barColor = '#000';
win.layout = 'vertical';


var l1 = Titanium.UI.createLabel({
	text:'Rx Shortages is designed to help health care providers access information about drug shortages quickly and easily.\n\nCreated By Mick Schroeder\nPharmD Candidate 2011',
	top:30,
	left:10,
	right:10,
	width:280,
	color:'#000',
	textAlign:'center',
	height:'auto',
    width:'auto',
});

win.add(l1);

var b1 = Titanium.UI.createButton({
	title:'Email: mschroeder@gmail.com',
	height:40,
	width:280,
	top:10
});

win.add(b1);

var b2 = Titanium.UI.createButton({
	title:'http://mickschroeder.com/rxshortages',
	height:40,
	width:280,
	top:10,

});

win.add(b2);

b1.addEventListener('click', function()
{
	var emailDialog = Titanium.UI.createEmailDialog();
	emailDialog.subject = "RxShortages Application";
	emailDialog.toRecipients = ['mschroeder@gmail.com'];
	emailDialog.open();

});

b2.addEventListener('click', function()
{
	Titanium.Platform.openURL('http://mickschroeder.com/rxshortages');
});



