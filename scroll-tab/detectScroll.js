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
		// 50 ms to prevent scroll mousewheel too fast.
		timeoutId = setTimeout(rightClicking, 50);
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
	// right click up
	if (e.button === 2) {
		stopScrolling();
	}
});

function stopScrolling() {
	clearTimeout(timeoutId);
	chrome.runtime.sendMessage({
			action: "rightClickUp"
		}, function(response) {
			//console.log(response);
		}
	);
}