var ctrlKeydown = false;
var shiftKeydown = false;

window.addEventListener('keydown', function(e) {

	if(e.ctrlKey) ctrlKeydown = true;
	if(e.shiftKey) shiftKeydown = true;
	
	var direction = 0;
	var popup = false;
	var justpop = false;
	if(ctrlKeydown && shiftKeydown) {
		if(e.key === 'PageUp') direction = -1;
		else if(e.key === 'PageDown') direction = 1;
		else if(e.key === '{') popup = true;
		else if(e.key === '}') justpop = true;

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

		// popup window to temp.
		if(popup) {
			chrome.runtime.sendMessage({
					action: "popup"
				}, function(response) {
					//console.log(response);
				}
			);
		}

		// just to popup a window.
		if(justpop) {
			chrome.runtime.sendMessage({
					action: "justpop"
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
