// execute detectScroll.js to detect mouse event.
chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
	if (changeInfo.status == "complete") {
		chrome.tabs.executeScript(tabId, {file: "detectScroll.js"});
		chrome.tabs.executeScript(tabId, {file: "detectKeydown.js"});
	}
});

// message from detectScroll.js and detectKeydown.js
var isRightClick = false;
var popupWindowId = null;
chrome.runtime.onMessage.addListener( function(request, sender, sendResponse) {
	if(request) {
		switch(request.action) {
			//------- scrolling tab
			case 'scrolling':
				if(isRightClick) {
					var responseMessage = scrollingEvent(request);
					sendResponse(responseMessage);
				}
			break;

			case 'rightClickDown':
				isRightClick = true;
				sendResponse("rightClickDown back.");
			break;

			case 'ClickUp':
				isRightClick = false;
				sendResponse("ClickUp back.");
			break;

			//------- moving tab
			case 'moving':
				var responseMessage = movingEvent(request);
				sendResponse(responseMessage);
			break;

			//------- popup tab
			case 'popup':
				var responseMessage = popupEvent(false);
				sendResponse(responseMessage);
			break;

			case 'justpop':
				var responseMessage = popupEvent(true);
				sendResponse(responseMessage);
			break;
		}
	}
});

function findTheSelectedTab(fn) {
  	chrome.windows.getLastFocused ({ 
		populate: true 
	}, function(window) {
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

function scrollingEvent(request) {
	findTheSelectedTab(function(tab) {
		if(request.direction === 1 && tab.next)
			chrome.tabs.update(tab.next.id, {active: true});
		else if(request.direction === -1 && tab.previous)
			chrome.tabs.update(tab.previous.id, {active: true});
	});

	return "scroll back.";
}

function movingEvent(request) {
	findTheSelectedTab(function(tab) {
		// moving the tab.
		var i = tab.now.order;
		if(request.direction === -1 && i === 0) return;

		chrome.tabs.move(tab.now.id, {index: i + request.direction});
	});

	return "moving back.";
}

function popupEvent(justpop) {
	findTheSelectedTab(function(tab) {
		// popup the tab.
		// create a popup window to temp.
		if(!popupWindowId || justpop) {
			chrome.windows.create({'tabId': tab.now.id, 'type': 'normal', 'focused': true}, function(window) {
				if(!justpop) {
					popupWindowId = window.id;
				}
			});
		} else if(popupWindowId && !justpop) {
			chrome.tabs.move(tab.now.id, {windowId: popupWindowId, index: -1});
			chrome.windows.update(popupWindowId, {'focused': true});
		}
		
		if(!justpop) {
			// if the popUp window is been removed, then set popupWindowId to null.
			chrome.windows.onRemoved.addListener(function() {
				popupWindowId = null;
			});
		}
	});

	return "popup back.";
}