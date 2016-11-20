// mouse wheel
window.addEventListener("mousewheel", function(e) {
    wDelta = e.wheelDelta < 0 ? "down" : "up";

	chrome.runtime.sendMessage({
			action: "scrolling",
			direction: wDelta
		}, function(response) {
			//console.log(response);
		}
	);
});

// mouse down
var timeoutId = 0;
window.addEventListener("mousedown", function(e) {
	
	// right click down
	if (e.button === 2) {
		
		// 1000 ms to prevent scroll mousewheel too fast.
		timeoutId = setTimeout(rightClicking, 1000);

	}
	return false;
});
function rightClicking() {
	chrome.runtime.sendMessage({
			action: "rightClickDown"
		}, function(response) {
			//console.log(response);
		}
	);
}

// mouse up
window.addEventListener("mouseup", function(e) {
	clearTimeout(timeoutId);
	chrome.runtime.sendMessage({
			action: "ClickUp"
		}, function(response) {
			//console.log(response);
		}
	);
});
