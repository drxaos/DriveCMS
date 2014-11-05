
var public_spreadsheet_url = 'https://docs.google.com/spreadsheets/d/1eGE5GHdK8Lu-9nk8tzmA4wmSB64oulfnAuGSnY7wI4M/pubhtml';
var api_spreadsheet_url = 'https://script.google.com/macros/s/AKfycbwWuHMOLhnJlxC8ZssuDGuAfusIyQwvdS9e-b7eGvg71UD5400l/exec';

var Data = {};
Tabletop.init( { key: public_spreadsheet_url, callback: callback, simpleSheet: true } );
function callback(data) {
	for(d in data) { Data[data[d].key] = data[d].value; }

	var date = new Date().getTime();
	$(".jumbotron .container").text(Data.x1 + "\n\n" + "Last reload: " + (date - Data.lastAccess)/1000 + " seconds ago");
	setData("lastAccess", date)
}

function setData(k ,v) {
	var uid = Math.random().toString(36).substr(2, 9);
	$('<script />', {
	    id: uid,
	    src:  api_spreadsheet_url + 
		"?k="+encodeURIComponent(k) +
		"&v="+encodeURIComponent(v) +
		"&cb=" + encodeURIComponent("setDataCallback('"+uid+"')")
	}).appendTo('body');
}

function setDataCallback(uid){
	setTimeout(function () {$('script#'+uid).remove();}, 50);
}

