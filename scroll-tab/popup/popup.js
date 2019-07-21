var enableFunctionScrollTab = true;
var enableFunctionPageUp = true;
var enableFunctionPopupTab = true;

function documentEvents () {
	sendMsg("checkStatus");

	const functionScrollTab = document.getElementById("enableFunctionScrollTab");
	const functionPageUp = document.getElementById("enableFunctionPageUp");
	const functionPopupTab = document.getElementById("enableFunctionPopupTab");

	functionScrollTab.addEventListener("click", function () {
		enableFunctionScrollTab = !enableFunctionScrollTab;
		sendMsg("updateStatus");
	});

	functionPageUp.addEventListener("click", function () {
		enableFunctionPageUp = !enableFunctionPageUp;
		sendMsg("updateStatus");
	});

	functionPopupTab.addEventListener("click", function () {
		enableFunctionPopupTab = !enableFunctionPopupTab;
		sendMsg("updateStatus");
	});
}

function sendMsg (status) {
	chrome.runtime.sendMessage({
		action: "enableFunction",
		status: status,
		enableFunctionScrollTab: enableFunctionScrollTab,
		enableFunctionPageUp: enableFunctionPageUp,
		enableFunctionPopupTab: enableFunctionPopupTab
	}, function (response) {
		console.log("msg: ", response);
		enableFunctionScrollTab = response.enableFunctionScrollTab;
		enableFunctionPageUp = response.enableFunctionPageUp;
		enableFunctionPopupTab = response.enableFunctionPopupTab;
		updateChecked();
	});
}

function updateChecked () {
	const functionScrollTab = document.getElementById("enableFunctionScrollTab");
	const functionPageUp = document.getElementById("enableFunctionPageUp");
	const functionPopupTab = document.getElementById("enableFunctionPopupTab");

	functionScrollTab.checked = enableFunctionScrollTab;
	functionPageUp.checked = enableFunctionPageUp;
	functionPopupTab.checked = enableFunctionPopupTab;
}

document.addEventListener("DOMContentLoaded", documentEvents, false);

const browserText = document.getElementById("browser")
if (browserText) {
	browserText.innerHTML = (isFirefox ? "Mozilla Firefox" : "Google Chrome")
}
