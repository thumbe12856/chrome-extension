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
  	
  	//------- scrolling tab
  	if(request && request.action === "scrolling" && isRightClick) {
		findTheSelectedTab(function(tab) {
			if(request.direction === 1 && tab.next)
				chrome.tabs.update(tab.next.id, {active: true});
			else if(request.direction === -1 && tab.previous)
				chrome.tabs.update(tab.previous.id, {active: true});
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

	//------- moving tab
	if(request && request.action === "moving") {
		findTheSelectedTab(function(tab) {
			// moving the tab.
			var i = tab.now.order;
			if(request.direction === -1 && i === 0) return;

			chrome.tabs.move(tab.now.id, {index: i + request.direction});
		});

		sendResponse("moving back.");
	}

	//------- popup tab
	if(request && request.action === "popup") {
		findTheSelectedTab(function(tab) {
			// popup the tab.
			chrome.windows.create({
				tabId: tab.now.id,
				type: "normal"
			});
		});

		sendResponse("popup back.");
	}
});

function findTheSelectedTab(fn) {
  	chrome.windows.getLastFocused (
		{ populate: true }, function(window) {
		for (var i = 0; i < window.tabs.length; i++) {

			// find the selected tab.
			if (window.tabs[i].active) {
				window.tabs[i].order = i;
				var retrunTab = {
					'previous': window.tabs[i-1],
					'now': window.tabs[i],
					'next': window.tabs[i+1]
				}
				fn(retrunTab);
			}
		}
	});
}
