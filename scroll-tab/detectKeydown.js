var ctrlKeydown = false;
var shiftKeydown = false;

window.addEventListener('keydown', function(e) {
	if(e.ctrlKey) ctrlKeydown = true;
	if(e.shiftKey) shiftKeydown = true;
	
	var direction = 0;
	var popup = false;
	if(ctrlKeydown && shiftKeydown) {
		if(e.key === 'PageUp') direction = -1;
		else if(e.key === 'PageDown') direction = 1;
		else if(e.key === 'K') popup = true;

		// moving window
		if(direction) {
			chrome.runtime.sendMessage({
					action: "moving",
					direction: direction
				}, function(response) {
					//console.log(response);
				}
			);
		}

		// popup window
		if(popup) {
			chrome.runtime.sendMessage({
					action: "popup"
				}, function(response) {
					//console.log(response);
				}
			);
		}
	}
});

window.addEventListener('keyup', function(e) {
	if(!e.ctrlKey) ctrlKeydown = false;
	if(!e.shiftKey) shiftKeydown = false;
});
