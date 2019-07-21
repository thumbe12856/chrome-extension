chrome.tabs.onUpdated.addListener( function (tabId, changeInfo, tab) {
	if (changeInfo.status === "complete" && changeInfo.url === undefined) {
		chrome.tabs.executeScript(tabId, {file: "control_bar.js"});
	}
})

chrome.runtime.onMessage.addListener(function (request, sender, sendResponse) {
	if (request) {
		receiveMsg(request, sender, sendResponse);
	}
});

var enableControl = false;
function receiveMsg (request, sender = null, sendResponse = null) {
	switch (request.action) {
		case "enableFunction":
			if (request.status === "updateStatus") {
				enableControl = request.enableControl;
			}
			console.log("enableControl: ", enableControl);
			control();
		break;
	}
}

function control() {
	if(control) {
		//chrome.tabs.executeScript(tabId, {file: "control_bar.js"});
		//chrome.tabs.executeScript(null, {file: "control_bar.js"});
	}
}
