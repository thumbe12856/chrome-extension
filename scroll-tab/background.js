// execute detectScroll.js to detect mouse event.
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
	if (changeInfo.status == "complete") {
		chrome.tabs.executeScript(tabId, {file: "detectScroll.js"});
		chrome.tabs.executeScript(tabId, {file: "detectKeydown.js"});
	}
});

// message from detectScroll.js and detectKeydown.js
var isRightClick = false;
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  	
  	// scrolling tab
  	if(request && request.action === "scrolling" && isRightClick) {
		chrome.windows.getLastFocused (
			{ populate: true }, function(window) {
			for (var i = 0; i < window.tabs.length; i++) {

				// find the selected tab and switch tab.
				if (window.tabs[i].active && window.tabs[i + request.direction]) {
					chrome.tabs.update(window.tabs[i + request.direction].id, {active: true});
					return;
				}
			}
		});

		sendResponse("scroll back.");
	}

	else if(request && request.action === "rightClickDown") {
		isRightClick = true;
		sendResponse("rightClickDown back.");
	}

	else if(request && request.action === "ClickUp") {
		isRightClick = false;
		sendResponse("ClickUp back.");
	}

	// moving tab
	if(request && request.action === "moving") {
		chrome.windows.getLastFocused (
			{ populate: true }, function(window) {
			for (var i = 0; i < window.tabs.length; i++) {

				// find the selected tab and move tab.
				if (window.tabs[i].active && window.tabs[i + request.direction]) {
					chrome.tabs.move(window.tabs[i].id, {index: i + request.direction});
					return;
				}
			}
		});

		sendResponse("moving back.");
	}
});
