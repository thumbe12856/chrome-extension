chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
  if (request && request.action === 'scrolling') {
		chrome.windows.getLastFocused(
			{ populate: true }, function (window) {
			var foundSelected = false;
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

		console.log('update info:');
		chrome.windows.getLastFocused(
			{ populate: true }, function (window) {
			var foundSelected = false;
			for (var i = 0; i < window.tabs.length; i++)
			{
				console.log(window.tabs[i]);
			}
		});
		sendResponse('I am back.');
	}
});

chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
	if (changeInfo.status == 'complete') {
		chrome.tabs.executeScript(null, {file: "detectScroll.js"});
	}
});