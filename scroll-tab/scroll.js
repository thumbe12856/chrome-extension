// execute detectScroll.js to detect mouse event.
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
	if (changeInfo.status == "complete") {
		chrome.tabs.executeScript(null, {file: "detectScroll.js"});
	}
});

// send message from detectScroll.js to scroll.js
var isRightClick = false;
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	console.log(request.action === "rightClickUp");
  	if(request && request.action === "scrolling" && isRightClick) {
		chrome.windows.getLastFocused (
			{ populate: true }, function(window) {
			for (var i = 0; i < window.tabs.length; i++)
			{
				// Finding the selected tab.
				if (window.tabs[i].active)
				{
					if(request.direction == "down")
						chrome.tabs.update(window.tabs[i+1].id, {active: true});
					else if(request.direction == "up") 
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
	else if(request && request.action === "rightClickUp") {
		isRightClick = false;
		sendResponse("rightClickUp back.");
	}
});
