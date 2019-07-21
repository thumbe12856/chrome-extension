var enableControl = false;

function documentEvents () {
	sendMsg("checkStatus");

	const functionScrollTab = document.getElementById("enableControl");

	functionScrollTab.addEventListener("click", function () {
		enableControl = !enableControl;
		sendMsg("updateStatus");
	});

}

function sendMsg (status) {
	chrome.runtime.sendMessage({
		action: "enableFunction",
		status: status,
		enableControl: enableControl
	}, function (response) {
		console.log("msg: ", response);
		enableControl = response.enableControl;
		updateChecked();
	});
}

function updateChecked () {
	const functionScrollTab = document.getElementById("enableControl");
	functionScrollTab.checked = enableControl;
}

document.addEventListener("DOMContentLoaded", documentEvents, false);
