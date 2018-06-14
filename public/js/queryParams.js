function getQueryVariable(variable){
	var query = window.location.search.substring(1);
	var vars = query.split('&');
	for(var i=0; i< vars.length; i++){
		var pair = vars[i].split('=');
		if(decodeURIComponent(pair[0]) == variable){
			//replace :> (pair[1]).replace(/\+/g,' ');  can replace any + within the given text
			return decodeURIComponent(pair[1].replace(/\+/g, ' '));//regular expressions g is a modifier
		}

	}
	return undefined;
}