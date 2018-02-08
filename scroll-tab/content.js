document.addEventListener('DOMContentLoaded', documentEvents  , false);

var enableFunctionScrollTab = true;
var enableFunctionPageUp = true;
var enableFunctionPopupTab = true;

function documentEvents() {
	sendMsg("checkStatus");

	var functionScrollTab = document.getElementById('enableFunctionScrollTab');
	var functionPageUp = document.getElementById('enableFunctionPageUp');
	var functionPopupTab = document.getElementById('enableFunctionPopupTab');

	functionScrollTab.addEventListener('click', function() {
		enableFunctionScrollTab = !enableFunctionScrollTab;
		sendMsg("updateStatus");
	});

	functionPageUp.addEventListener('click', function() {
		enableFunctionPageUp = !enableFunctionPageUp;
		sendMsg("updateStatus");
	});

	functionPopupTab.addEventListener('click', function() {
		enableFunctionPopupTab = !enableFunctionPopupTab;
		sendMsg("updateStatus");
	});
}

function sendMsg(status) {
	chrome.runtime.sendMessage({
			action: "enableFunction",
			status: status,
			enableFunctionScrollTab: enableFunctionScrollTab,
			enableFunctionPageUp: enableFunctionPageUp,
			enableFunctionPopupTab: enableFunctionPopupTab
		}, function(response) {
			console.log("msg: ", response);
			enableFunctionScrollTab = response.enableFunctionScrollTab;
			enableFunctionPageUp = response.enableFunctionPageUp;
			enableFunctionPopupTab = response.enableFunctionPopupTab;
			updateChecked();
		}
	);
}

function updateChecked() {
	var functionScrollTab = document.getElementById('enableFunctionScrollTab');
	var functionPageUp = document.getElementById('enableFunctionPageUp');
	var functionPopupTab = document.getElementById('enableFunctionPopupTab');

	functionScrollTab.checked = enableFunctionScrollTab;
	functionPageUp.checked = enableFunctionPageUp;
	functionPopupTab.checked = enableFunctionPopupTab;
}
