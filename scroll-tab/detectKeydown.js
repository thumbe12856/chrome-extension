var ctrlKeydown = false;
var shiftKeydown = false;

window.addEventListener('keydown', function(e) {
	if(e.ctrlKey) ctrlKeydown = true;
	if(e.shiftKey) shiftKeydown = true;
	
	var direction = 0;
	if(ctrlKeydown && shiftKeydown) {
		if(e.key === 'PageUp') direction = -1;
		else if(e.key === 'PageDown') direction = 1;

		if(direction) {
			chrome.runtime.sendMessage({
					action: "moving",
					direction: direction
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
