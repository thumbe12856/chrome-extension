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
		
		// 100 ms to check that user is right clicking.
		timeoutId = setTimeout(rightClicking, 100);

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

			// enable the contextmenu.
			window.removeEventListener("contextmenu", disable, false);
		}
	);
});

// after user scrolls tab, and mouses up, disable the contextmenu.
// when tab on focus, disable the contextmenu.
window.addEventListener('focus', function() {
	window.addEventListener("contextmenu", disable, false);
});

// when tab not on focus, enable the contextmenu.
window.addEventListener('blur', function() {
	window.removeEventListener("contextmenu", disable, false);
});

var disable = function(e) {
	e.preventDefault();
}
