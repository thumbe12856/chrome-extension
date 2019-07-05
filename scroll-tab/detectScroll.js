// mouse wheel
var mouseUpTimeOutId = 0;
window.addEventListener("mousewheel", function(e) {
	wDelta = 0;
	if(e.wheelDelta < 0) {
		wDelta = 1;
	} else if (e.wheelDelta > 0) {
		wDelta = -1;
	}

    if(wDelta) {
		chrome.runtime.sendMessage({
				action: "scrolling",
				direction: wDelta
			}, function(response) {
			}
		);
		//clearTimeout(mouseUpTimeOutId);
		//mouseUpTimeOutId = setTimeout(mouseUp, 500);
	}
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

// mouse up
window.addEventListener("mouseup", function(e) {
	clearTimeout(timeoutId);
	clearTimeout(mouseUpTimeOutId);
	mouseUp();
});

// after user scrolls tab, and mouses up, disable the contextmenu.
// when tab on focus, disable the contextmenu.
window.addEventListener("focus", function() {
	window.addEventListener("contextmenu", disable, false);
	setTimeout(removeDisableEventContextmenu, 1000);
});

// when tab not on focus, enable the contextmenu.
window.addEventListener("blur", function() {
	window.removeEventListener("contextmenu", disable, false);
});

function rightClicking() {
	chrome.runtime.sendMessage({
			action: "rightClickDown"
		}, function(response) {
		}
	);
}

function mouseUp() {
	chrome.runtime.sendMessage({
			action: "ClickUp"
		}, function(response) {

			// enable the contextmenu.
			removeDisableEventContextmenu();
		}
	);
}

function removeDisableEventContextmenu() {
	window.removeEventListener("contextmenu", disable, false);
}

var disable = function(e) {
	e.preventDefault();
}
