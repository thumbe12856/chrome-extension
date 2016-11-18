// execute detectScroll.js to detect mouse event.
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
	if (changeInfo.status == "complete") {
		chrome.tabs.executeScript(tabId, {file: "detectScroll.js"});
	}
});

// message from detectScroll.js
var isRightClick = false;
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
  	
  	if(request && request.action === "scrolling" && isRightClick) {
		chrome.windows.getLastFocused (
			{ populate: true }, function(window) {
			for (var i = 0; i < window.tabs.length; i++)
			{
				// Finding the selected tab.
				if (window.tabs[i].active)
				{
					if(request.direction == "down" && i+1 < window.tabs.length)
						chrome.tabs.update(window.tabs[i+1].id, {active: true});
					else if(request.direction == "up" && i-1 >= 0) 
						chrome.tabs.update(window.tabs[i-1].id, {active: true});
					return;
				}
			}
		});

		/*
		//console.log("update info:");
		chrome.windows.getLastFocused (
			{ populate: true }, function (window) {
			for (var i = 0; i < window.tabs.length; i++)
				console.log(window.tabs[i]);
		});
		*/
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
});
